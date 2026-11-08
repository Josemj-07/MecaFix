import { ArrowRight } from 'lucide-react';

import { Container } from '@/components/layouts';
import { CtaButton } from '@/components/ui/cta-button';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Facet } from '@/components/ui/facet';
import { Link } from '@/components/ui/link';
import { Nut } from '@/components/ui/nut';
import { Reveal } from '@/components/ui/reveal';
import { Heading, Text } from '@/components/ui/typography';
import { paths } from '@/config/paths';
import { siteConfig } from '@/config/site';

import { type PlatformModule, platformModules } from '../utils/modules';

import { ModuleScreen } from './landing/modules-showcase';

// Base template of /plataforma/:moduleSlug. Every module page shares it
// until each one gets its own in-depth content.
export const ModulePage = ({ module }: { module: PlatformModule }) => {
  const Icon = module.icon;
  const others = platformModules.filter((item) => item.slug !== module.slug);

  return (
    <>
      <section
        aria-labelledby="module-title"
        className="relative isolate overflow-hidden bg-night bg-hex-mesh text-night-foreground"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 1000 400"
          preserveAspectRatio="none"
          className="pointer-events-none absolute top-0 left-0 -z-10 h-1/2 w-full motion-safe:animate-wedge-top"
        >
          <polygon points="0,0 360,0 0,240" className="fill-primary" />
          <polygon points="0,0 220,0 0,140" className="fill-primary-hover" />
        </svg>
        <Container className="grid grid-cols-1 items-center gap-12 pt-32 pb-20 sm:pt-40 lg:grid-cols-2 lg:gap-16 lg:pb-24">
          <div className="flex min-w-0 flex-col gap-6">
            <div className="flex items-center gap-3 motion-safe:animate-rise">
              <span className="grid h-11 w-12 place-items-center bg-primary text-primary-foreground clip-hex">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <Eyebrow tone="inverse">{module.name}</Eyebrow>
            </div>
            <Heading
              id="module-title"
              level="display"
              className="text-night-foreground motion-safe:animate-rise"
              style={{ animationDelay: '110ms' }}
            >
              {module.benefit}
            </Heading>
            <Text
              variant="lead"
              className="text-inverse-muted-foreground motion-safe:animate-rise"
              style={{ animationDelay: '220ms' }}
            >
              {module.description}
            </Text>
            <div
              className="flex flex-wrap gap-4 pt-2 motion-safe:animate-rise"
              style={{ animationDelay: '330ms' }}
            >
              <CtaButton asChild size="lg">
                <a href={siteConfig.primaryCta.href}>
                  {siteConfig.primaryCta.label}
                </a>
              </CtaButton>
              <CtaButton asChild size="lg" tone="outline-inverse">
                <a href={siteConfig.secondaryCta.href}>
                  {siteConfig.secondaryCta.label}
                </a>
              </CtaButton>
            </div>
          </div>
          <div
            className="min-w-0 motion-safe:animate-rise"
            style={{ animationDelay: '250ms' }}
          >
            <ModuleScreen module={module} backdrop="blueprint" />
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="module-includes-title"
        className="py-20 sm:py-24"
      >
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <Reveal className="flex flex-col gap-4">
            <Eyebrow>Lo que resuelve</Eyebrow>
            <Heading id="module-includes-title" level="h2">
              Qué incluye {module.name.toLowerCase()}
            </Heading>
            <Text className="border-l-2 border-steel-light pl-3 text-muted-foreground italic">
              {module.problem}
            </Text>
          </Reveal>
          <ul className="grid gap-4 sm:grid-cols-2">
            {module.points.map((point, index) => (
              <li key={point}>
                <Reveal
                  delay={index * 90}
                  className="flex h-full items-start gap-3 bg-card p-6 shadow-[inset_0_0_0_1px_var(--color-border)]"
                >
                  <Nut filled className="mt-1 size-4 text-primary" />
                  <span className="font-medium">{point}</span>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section
        aria-labelledby="other-modules-title"
        className="bg-secondary py-20 sm:py-24"
      >
        <Container className="flex flex-col gap-10">
          <Reveal className="flex flex-col gap-4">
            <Eyebrow>Plataforma</Eyebrow>
            <Heading id="other-modules-title" level="h2">
              Conecta con los demás módulos
            </Heading>
          </Reveal>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {others.map((item, index) => {
              const ItemIcon = item.icon;
              return (
                <li key={item.slug}>
                  <Reveal delay={index * 80} className="h-full">
                    <Link
                      variant="unstyled"
                      to={paths.platformModule.getHref(item.slug)}
                      className="group relative flex h-full flex-col gap-4 overflow-hidden bg-card p-5 shadow-[inset_0_0_0_1px_var(--color-border)] outline-none hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-brand"
                    >
                      <Facet size="sm" tone="steel" interactive />
                      <span className="grid h-10 w-11 place-items-center bg-primary text-primary-foreground clip-hex">
                        <ItemIcon aria-hidden="true" className="size-4" />
                      </span>
                      <span className="font-heading text-lg leading-tight font-extrabold">
                        {item.name}
                      </span>
                      <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary">
                        Ver módulo
                        <ArrowRight
                          aria-hidden="true"
                          className="size-4 group-hover:translate-x-1 motion-safe:transition-transform"
                        />
                      </span>
                    </Link>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>
    </>
  );
};
