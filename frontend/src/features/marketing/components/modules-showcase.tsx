import { Container } from '@/components/layouts';
import { CtaButton } from '@/components/ui/cta-button';
import { Facet } from '@/components/ui/facet';
import { Link } from '@/components/ui/link';
import { Logo } from '@/components/ui/logo';
import { Nut } from '@/components/ui/nut';
import { Reveal } from '@/components/ui/reveal';
import { Heading, Text } from '@/components/ui/typography';
import { paths } from '@/config/paths';
import { landingSections } from '@/config/site';
import { cn } from '@/utils/cn';

import {
  type ModuleSlug,
  type PlatformModule,
  moduleAnchor,
  platformModules,
} from '../utils/modules';

import { ModuleScene } from './module-scenes';
import { AppWindow } from './preview-primitives';
import { PlayOnView } from './scene-kit';
import { SectionHeading } from './section-heading';

// Screen of a module with its animated scene, on a carbon or blueprint
// backdrop. Shared by the landing showcase and the module pages.
export const ModuleScreen = ({
  module,
  backdrop = 'inverse',
}: {
  module: PlatformModule;
  backdrop?: 'inverse' | 'blueprint';
}) => {
  return (
    <div className="relative min-w-0">
      <div
        aria-hidden="true"
        className={cn(
          'absolute -inset-2 overflow-hidden sm:-inset-5',
          backdrop === 'inverse'
            ? 'bg-inverse bg-hex-mesh'
            : 'bg-card bg-blueprint shadow-[inset_0_0_0_1px_var(--color-border)]',
        )}
      >
        <Facet
          size="md"
          tone={backdrop === 'inverse' ? 'primary' : 'steel'}
          className="sm:size-40"
        />
      </div>
      <PlayOnView className="relative" loop={9500}>
        <AppWindow title={module.window} className="max-sm:[zoom:0.82]">
          <ModuleScene slug={module.slug} />
        </AppWindow>
      </PlayOnView>
    </div>
  );
};

type Edge = 'none' | 'slant' | 'nut' | 'teeth' | 'facet' | 'saw';

type RowTheme = {
  // Background of the row (and of its top edge).
  surface: string;
  // Paint of the top edge shape: same color as the surface.
  edgePaint: string;
  edge: Edge;
  dark: boolean;
  backdrop: 'inverse' | 'blueprint';
};

// Each module has its own near-white tone and its own edge shape, so the
// six rows read as six pieces of the same machine without getting loud.
const rowThemes: Record<ModuleSlug, RowTheme> = {
  ordenes: {
    surface: 'bg-card',
    edgePaint: 'bg-card',
    edge: 'none',
    dark: false,
    backdrop: 'inverse',
  },
  inventario: {
    surface: 'bg-mist',
    edgePaint: 'bg-mist',
    edge: 'nut',
    dark: false,
    backdrop: 'blueprint',
  },
  facturacion: {
    surface: 'bg-card',
    edgePaint: 'fill-card',
    edge: 'slant',
    dark: false,
    backdrop: 'inverse',
  },
  nomina: {
    surface: 'bg-band',
    edgePaint: 'bg-band',
    edge: 'teeth',
    dark: false,
    backdrop: 'blueprint',
  },
  'asistente-ia': {
    surface: 'bg-background',
    edgePaint: 'fill-background',
    edge: 'facet',
    dark: false,
    backdrop: 'inverse',
  },
  reportes: {
    surface: 'bg-mist',
    edgePaint: 'bg-mist',
    edge: 'saw',
    dark: false,
    backdrop: 'blueprint',
  },
};

// Shape where a row starts, sticking out into the previous one.
const RowEdge = ({ edge, paint }: { edge: Edge; paint: string }) => {
  if (edge === 'none') return null;

  if (edge === 'slant' || edge === 'facet') {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 1000 60"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-full h-10 w-full sm:h-14"
      >
        {edge === 'slant' ? (
          <polygon points="0,60 1000,0 1000,60" className={paint} />
        ) : (
          <>
            <polygon points="0,60 380,10 1000,60" className={paint} />
            <polygon points="380,10 720,0 1000,60" className={paint} />
            <polygon
              points="380,10 720,0 600,40"
              className="fill-steel-pale opacity-70"
            />
            <polygon
              points="720,0 1000,20 1000,60"
              className="fill-steel-pale opacity-50"
            />
          </>
        )}
      </svg>
    );
  }

  const maskClass = {
    nut: 'nut-edge-top',
    teeth: 'teeth-edge-top',
    saw: 'saw-edge-top',
  }[edge];

  return (
    <span
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-x-0 bottom-full',
        paint,
        maskClass,
      )}
    />
  );
};

// On a phone a module reads top to bottom in one screen: its name and
// benefit, the screen playing, a short description and "Ver más". From lg
// up the text sits beside the screen, centered on it.
const ModuleRow = ({
  module,
  index,
}: {
  module: PlatformModule;
  index: number;
}) => {
  const Icon = module.icon;
  const theme = rowThemes[module.slug];
  const flipped = index % 2 === 1;
  const textSide = flipped ? 'right' : 'left';
  const screenSide = flipped ? 'left' : 'right';

  return (
    <article
      id={moduleAnchor(module.slug)}
      aria-labelledby={`${moduleAnchor(module.slug)}-title`}
      className={cn('relative', theme.surface)}
    >
      <RowEdge edge={theme.edge} paint={theme.edgePaint} />
      <Container className="grid grid-cols-1 items-center gap-x-16 gap-y-5 overflow-x-clip py-10 sm:gap-y-10 sm:py-16 lg:grid-cols-2 lg:grid-rows-[1fr_auto_auto_1fr] lg:gap-y-5 lg:py-24">
        <Reveal
          from={textSide}
          className={cn(
            'flex min-w-0 flex-col gap-3 sm:gap-5 lg:row-start-2',
            flipped ? 'lg:col-start-2' : 'lg:col-start-1',
          )}
        >
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-10 place-items-center bg-primary text-primary-foreground clip-hex sm:h-11 sm:w-12">
              <Icon aria-hidden="true" className="size-4 sm:size-5" />
            </span>
            <span
              className={cn(
                'font-mono text-[0.8125rem] font-semibold tracking-[0.06em] uppercase sm:text-sm',
                theme.dark ? 'text-primary-bright' : 'text-primary',
              )}
            >
              {String(index + 1).padStart(2, '0')} · {module.name}
            </span>
          </div>
          <Text
            className={cn(
              'border-l-2 pl-3 italic max-sm:hidden',
              theme.dark
                ? 'border-inverse-border text-inverse-muted-foreground'
                : 'border-steel-light text-muted-foreground',
            )}
          >
            {module.problem}
          </Text>
          <Heading
            id={`${moduleAnchor(module.slug)}-title`}
            level="h2"
            as="h3"
            className={cn(
              'text-2xl sm:text-4xl lg:text-[2.5rem]',
              theme.dark && 'text-inverse-foreground',
            )}
          >
            {module.benefit}
          </Heading>
        </Reveal>

        <Reveal
          from={screenSide}
          delay={150}
          className={cn(
            'min-w-0 max-sm:mx-2 lg:row-span-4 lg:row-start-1',
            flipped ? 'lg:col-start-1' : 'lg:col-start-2',
          )}
        >
          <ModuleScreen module={module} backdrop={theme.backdrop} />
        </Reveal>

        <Reveal
          from={textSide}
          delay={100}
          className={cn(
            'flex min-w-0 flex-col gap-3 sm:gap-5 lg:row-start-3',
            flipped ? 'lg:col-start-2' : 'lg:col-start-1',
          )}
        >
          <Text
            className={cn(
              'text-[0.9375rem] leading-relaxed sm:text-lg',
              theme.dark
                ? 'text-inverse-muted-foreground'
                : 'text-muted-foreground',
            )}
          >
            {module.description}
          </Text>
          <ul
            className={cn(
              'flex flex-col gap-2.5 max-sm:hidden',
              theme.dark && 'text-inverse-foreground',
            )}
          >
            {module.points.map((point) => (
              <li key={point} className="flex items-start gap-2.5">
                <Nut
                  filled
                  className={cn(
                    'mt-1 size-3.5',
                    theme.dark ? 'text-primary-bright' : 'text-primary',
                  )}
                />
                {point}
              </li>
            ))}
          </ul>
          <CtaButton
            asChild
            tone={theme.dark ? 'light' : 'dark'}
            className="self-start sm:mt-2"
          >
            <Link
              variant="unstyled"
              to={paths.platformModule.getHref(module.slug)}
              aria-label={`Ver más de ${module.name}`}
            >
              Ver más
            </Link>
          </CtaButton>
        </Reveal>
      </Container>
    </article>
  );
};

// The six modules, one by one: the benefit on one side and the product
// playing as a short video on the other.
export const ModulesShowcase = () => (
  <section
    id={landingSections.modules}
    aria-labelledby="modules-title"
    className="bg-card pt-20 sm:pt-24 lg:pt-28"
  >
    <Container>
      <SectionHeading
        id="modules-title"
        eyebrow="Módulos"
        title={
          <>
            Conoce cómo{' '}
            <Logo
              alt="MecaFix"
              className="inline-block h-[1.1em] align-[-0.2em]"
            />{' '}
            optimiza tus flujos de trabajo
          </>
        }
        description="La orden que abre el asesor alimenta el inventario, la factura, la nómina y los reportes. Mira qué resuelve cada módulo."
      />
    </Container>
    {platformModules.map((module, index) => (
      <ModuleRow key={module.slug} module={module} index={index} />
    ))}
  </section>
);
