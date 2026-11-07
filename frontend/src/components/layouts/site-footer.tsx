import { Link } from '@/components/ui/link';
import { Logo } from '@/components/ui/logo';
import { Text } from '@/components/ui/typography';
import { paths } from '@/config/paths';
import { siteConfig } from '@/config/site';

import { Container } from './container';
import { NavAnchor } from './nav-anchor';

const linkClassName =
  'text-sm text-inverse-muted-foreground transition-colors hover:text-inverse-foreground';

const labelClassName =
  'font-mono text-xs font-semibold tracking-[0.08em] text-inverse-foreground uppercase';

export const SiteFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-night text-inverse-muted-foreground">
      {/* Red tape at the slope of the logo X. */}
      <div
        aria-hidden="true"
        className="h-1.5 bg-[repeating-linear-gradient(104deg,var(--color-primary)_0_18px,transparent_18px_26px)]"
      />
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:py-16">
        <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
          <Link
            to={paths.home.getHref()}
            variant="unstyled"
            className="self-start"
          >
            <Logo
              variant="inverse"
              alt="MecaFix, ir al inicio"
              className="h-12"
            />
          </Link>
          <Text variant="small" className="max-w-[38ch]">
            {siteConfig.description}
          </Text>
        </div>

        {siteConfig.footerNav.map((column) => (
          <nav
            key={column.title}
            aria-label={column.title}
            className="flex flex-col gap-4"
          >
            <span className={labelClassName}>{column.title}</span>
            <ul className="flex flex-col gap-2.5">
              {column.links.map((link) => (
                <li key={link.label}>
                  <NavAnchor item={link} className={linkClassName} />
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="flex flex-col gap-4">
          <span className={labelClassName}>Contacto</span>
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="font-mono text-sm text-inverse-foreground underline-offset-4 hover:text-primary-bright hover:underline"
          >
            {siteConfig.contactEmail}
          </a>
          <Text variant="small">Atención humana 24/7</Text>
        </div>
      </Container>

      <Container className="flex flex-col gap-3 border-t border-inverse-border py-6 font-mono text-xs tracking-[0.04em] sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {year} {siteConfig.name} · {siteConfig.location}
        </span>
        <ul className="flex flex-wrap gap-x-6 gap-y-1">
          {siteConfig.credits.map((credit) => (
            <li key={credit.href}>
              <a
                href={credit.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4 hover:text-inverse-foreground hover:underline"
              >
                {credit.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
};
