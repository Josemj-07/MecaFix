import { ChevronDown, Menu, X } from 'lucide-react';
import * as React from 'react';
import { useLocation } from 'react-router';

import { CtaButton } from '@/components/ui/cta-button';
import { Link } from '@/components/ui/link';
import { Logo } from '@/components/ui/logo';
import { paths } from '@/config/paths';
import { type NavItem, type NavMenuItem, siteConfig } from '@/config/site';
import { useDisclosure } from '@/hooks/use-disclosure';
import { cn } from '@/utils/cn';

import { Container } from './container';
import { NavAnchor } from './nav-anchor';

const linkClassName =
  'relative flex h-full items-center gap-1.5 px-3.5 text-[0.9375rem] font-medium text-foreground transition-colors hover:text-primary xl:px-4';

// Red bar at the slope of the logo X under the hovered/open item.
const underlineClassName =
  'after:absolute after:inset-x-3.5 after:bottom-5 after:h-[3px] after:origin-left after:-skew-x-[14deg] after:scale-x-0 after:bg-primary motion-safe:after:transition-transform motion-safe:after:duration-300 hover:after:scale-x-100';

const hasMenu = (item: NavItem): item is NavItem & { menu: NavMenuItem[] } =>
  'menu' in item;

const MenuEntry = ({
  item,
  onSelect,
}: {
  item: NavMenuItem;
  onSelect?: () => void;
}) => {
  const Icon = item.icon;
  return (
    <NavAnchor
      item={item}
      onClick={onSelect}
      className="group/entry grid grid-cols-[2.75rem_1fr] items-start gap-3 p-3 transition-colors hover:bg-secondary focus-visible:bg-secondary focus-visible:outline-none"
    >
      <span className="grid h-10 w-11 place-items-center bg-secondary text-primary transition-colors clip-hex group-hover/entry:bg-primary group-hover/entry:text-primary-foreground">
        <Icon aria-hidden="true" className="size-[1.125rem]" />
      </span>
      <span className="flex flex-col gap-1">
        <span className="text-sm font-semibold text-foreground">
          {item.label}
        </span>
        <span className="font-mono text-[0.6875rem] tracking-[0.06em] text-muted-foreground uppercase">
          {item.description}
        </span>
      </span>
    </NavAnchor>
  );
};

// Desktop dropdown. Hover opens it with CSS (pointer users); the button
// toggles it for keyboard and touch. Escape, a click outside or moving the
// focus away closes it.
const NavDropdown = ({ item }: { item: NavItem & { menu: NavMenuItem[] } }) => {
  const { isOpen, close, toggle } = useDisclosure();
  const panelId = React.useId();
  const itemRef = React.useRef<HTMLLIElement>(null);

  React.useEffect(() => {
    if (!isOpen) return;
    const isOutside = (target: EventTarget | null) =>
      !(target instanceof Node && itemRef.current?.contains(target));
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (isOutside(event.target)) close();
    };
    const onFocusIn = (event: FocusEvent) => {
      if (isOutside(event.target)) close();
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('focusin', onFocusIn);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('focusin', onFocusIn);
    };
  }, [isOpen, close]);

  return (
    <li ref={itemRef} className="group/menu relative flex h-full">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={toggle}
        className={cn(
          linkClassName,
          underlineClassName,
          'group-hover/menu:text-primary group-hover/menu:after:scale-x-100',
          isOpen && 'text-primary after:scale-x-100',
        )}
      >
        {item.label}
        <ChevronDown
          aria-hidden="true"
          className={cn(
            'size-4 group-hover/menu:rotate-180 motion-safe:transition-transform',
            isOpen && 'rotate-180',
          )}
        />
      </button>
      <div
        id={panelId}
        className={cn(
          'absolute top-full -left-6 w-[36rem] pt-2 motion-safe:transition-[opacity,translate,visibility] motion-safe:duration-200',
          isOpen
            ? 'visible translate-y-0 opacity-100'
            : 'invisible translate-y-1 opacity-0 group-hover/menu:visible group-hover/menu:translate-y-0 group-hover/menu:opacity-100',
        )}
      >
        <div className="overflow-hidden border-t-[3px] border-primary bg-popover shadow-lg">
          <ul className="grid grid-cols-2 gap-0.5 p-3">
            {item.menu.map((entry) => (
              <li key={entry.label}>
                <MenuEntry item={entry} onSelect={close} />
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between gap-4 bg-inverse px-6 py-4 text-sm text-inverse-foreground">
            <span>¿Primera vez aquí? Mira cómo se ve por dentro.</span>
            <a
              href={siteConfig.secondaryCta.href}
              onClick={close}
              className="font-semibold text-primary-bright underline-offset-4 hover:underline"
            >
              {siteConfig.secondaryCta.label}
            </a>
          </div>
        </div>
      </div>
    </li>
  );
};

type SiteHeaderProps = {
  // Slot for extra controls on the right (e.g. a user menu composed in app/routes/root.tsx).
  actions?: React.ReactNode;
};

// Floating white bar over the page (Siesa structure): logo, centered menu
// with a module dropdown and the demo call to action.
export const SiteHeader = ({ actions }: SiteHeaderProps) => {
  const mobileMenu = useDisclosure();
  const location = useLocation();
  const closeMobileMenu = mobileMenu.close;
  const [scrolled, setScrolled] = React.useState(false);

  // Close the mobile menu after navigating to another page or section.
  React.useEffect(() => {
    closeMobileMenu();
  }, [location.pathname, location.hash, closeMobileMenu]);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 pt-3 sm:pt-5">
      <Container>
        <div
          className={cn(
            'pointer-events-auto flex h-16 items-stretch bg-card pr-2 pl-4 shadow-lg motion-safe:transition-[height,box-shadow] motion-safe:duration-300 sm:pl-6 lg:h-[4.5rem]',
            scrolled && 'lg:h-16',
          )}
        >
          <Link
            to={paths.home.getHref()}
            variant="unstyled"
            className="flex shrink-0 items-center"
          >
            <Logo
              alt="MecaFix, ir al inicio"
              className="h-9 -translate-y-1 sm:h-10"
            />
          </Link>

          <nav aria-label="Principal" className="mx-auto hidden h-full lg:flex">
            <ul className="flex h-full items-stretch">
              {siteConfig.mainNav.map((item) =>
                hasMenu(item) ? (
                  <NavDropdown key={item.label} item={item} />
                ) : (
                  <li key={item.label} className="flex">
                    <NavAnchor
                      item={item}
                      className={cn(linkClassName, underlineClassName)}
                    />
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            {actions}
            <CtaButton asChild size="sm" className="hidden sm:inline-flex">
              <a href={siteConfig.primaryCta.href}>
                {siteConfig.primaryCta.label}
              </a>
            </CtaButton>
            <button
              type="button"
              className="grid size-11 place-items-center transition-colors hover:bg-secondary lg:hidden"
              aria-expanded={mobileMenu.isOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenu.isOpen ? 'Cerrar menú' : 'Abrir menú'}
              onClick={mobileMenu.toggle}
            >
              {mobileMenu.isOpen ? (
                <X aria-hidden="true" className="size-5" />
              ) : (
                <Menu aria-hidden="true" className="size-5" />
              )}
            </button>
          </div>
        </div>

        {mobileMenu.isOpen && (
          <nav
            id="mobile-menu"
            aria-label="Menú móvil"
            className="pointer-events-auto max-h-[calc(100dvh-6rem)] overflow-y-auto border-t-[3px] border-primary bg-card shadow-lg motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-top-2 lg:hidden"
          >
            <ul className="divide-y">
              {siteConfig.mainNav.map((item) => (
                <li key={item.label}>
                  {hasMenu(item) ? (
                    <div className="flex flex-col gap-1 p-3">
                      <span className="px-2 pt-1 pb-2 font-mono text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase">
                        {item.label}
                      </span>
                      {item.menu.map((entry) => (
                        <MenuEntry
                          key={entry.label}
                          item={entry}
                          onSelect={closeMobileMenu}
                        />
                      ))}
                    </div>
                  ) : (
                    <NavAnchor
                      item={item}
                      onClick={closeMobileMenu}
                      className="flex px-5 py-4 font-medium transition-colors hover:bg-secondary"
                    />
                  )}
                </li>
              ))}
            </ul>
            <div className="border-t p-4 sm:hidden">
              <CtaButton asChild className="w-full justify-between">
                <a href={siteConfig.primaryCta.href} onClick={closeMobileMenu}>
                  {siteConfig.primaryCta.label}
                </a>
              </CtaButton>
            </div>
          </nav>
        )}
      </Container>
    </header>
  );
};
