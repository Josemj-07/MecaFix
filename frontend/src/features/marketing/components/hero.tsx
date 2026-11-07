import { Container } from '@/components/layouts';
import { CtaButton } from '@/components/ui/cta-button';
import { Nut } from '@/components/ui/nut';
import { Heading, Text } from '@/components/ui/typography';
import { siteConfig } from '@/config/site';
import { cn } from '@/utils/cn';

import { HeroVideo } from './hero-video';
import { HeroWedges } from './hero-wedges';

const assurances = ['Atención humana 24/7', 'Migración de datos incluida'];

// Staggered load entrance (rises from below-left, like the claws).
const riseClassName = 'motion-safe:animate-rise';
const riseDelay = (step: number) => ({
  animationDelay: `${80 + step * 110}ms`,
});

export const Hero = () => (
  <section
    aria-labelledby="hero-title"
    className="relative isolate flex min-h-[32rem] items-center overflow-hidden bg-night text-night-foreground sm:min-h-[34rem] lg:min-h-[max(30rem,calc(100svh-12rem))]"
  >
    <HeroVideo />
    {/* Legibility veil: the copy side is darker than the footage side. */}
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10 bg-linear-to-r from-night/90 via-night/70 to-night/25"
    />
    <HeroWedges />

    <Container className="pt-32 pb-20 sm:pt-36 sm:pb-24 lg:pt-36 lg:pb-24">
      <div className="flex max-w-3xl flex-col gap-6">
        <Heading
          id="hero-title"
          level="hero"
          className={cn('text-night-foreground', riseClassName)}
          style={riseDelay(1)}
        >
          Tu taller,{' '}
          <span className="block text-primary-bright">a toda máquina.</span>
        </Heading>
        <Text
          variant="lead"
          className={cn(
            'max-w-[54ch] text-inverse-muted-foreground',
            riseClassName,
          )}
          style={riseDelay(2)}
        >
          Órdenes, repuestos, nómina y factura electrónica DIAN en un solo
          sistema, hecho para talleres en Colombia.
        </Text>
        <div
          className={cn('flex flex-wrap gap-4 pt-2', riseClassName)}
          style={riseDelay(3)}
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
        <ul
          className={cn(
            'flex flex-wrap gap-x-6 gap-y-2 text-sm text-inverse-muted-foreground',
            riseClassName,
          )}
          style={riseDelay(4)}
        >
          {assurances.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <Nut className="size-3.5 text-primary-bright" filled />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Container>
  </section>
);
