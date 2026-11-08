import type * as React from 'react';

import { Container } from '@/components/layouts';
import { CtaButton } from '@/components/ui/cta-button';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Nut } from '@/components/ui/nut';
import { Reveal } from '@/components/ui/reveal';
import { Heading, Text } from '@/components/ui/typography';
import { landingSections, siteConfig } from '@/config/site';

const assurances = [
  'Atención humana 24/7',
  'Migración de datos incluida',
  'Capacitación para tu equipo',
];

type ClosingCtaProps = {
  // The demo request form, composed by the route (it belongs to another feature).
  form: React.ReactNode;
};

// Final call to action: recap of the promise, the demo form and the risk
// reducers repeated, on a red tread plate with the facets of the logo.
export const ClosingCta = ({ form }: ClosingCtaProps) => (
  <section
    id={landingSections.demo}
    aria-labelledby="demo-title"
    className="relative isolate overflow-hidden bg-primary bg-tread text-primary-foreground"
  >
    <svg
      aria-hidden="true"
      viewBox="0 0 400 300"
      preserveAspectRatio="none"
      className="absolute inset-y-0 right-0 -z-10 hidden h-full w-[42%] lg:block"
    >
      <polygon
        points="120,0 400,0 400,300 250,300"
        className="fill-primary-hover"
      />
      <polygon
        points="260,0 400,0 400,140"
        className="fill-primary-soft opacity-60"
      />
      <polygon
        points="120,0 260,0 330,180"
        className="fill-primary-soft opacity-40"
      />
      <polygon points="330,180 400,140 400,300" className="fill-inverse" />
      <polygon
        points="250,300 330,180 400,300"
        className="fill-inverse-muted"
      />
    </svg>

    <Container className="grid grid-cols-1 gap-8 py-16 sm:gap-12 sm:py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-center lg:gap-16 lg:py-28">
      <Reveal className="flex min-w-0 flex-col gap-4 sm:gap-6">
        <Eyebrow tone="onPrimary">Prueba una demo gratis</Eyebrow>
        <Heading
          id="demo-title"
          level="h2"
          className="text-[1.75rem] text-primary-foreground sm:text-4xl lg:text-5xl"
        >
          Mira MecaFix funcionando con carros como los de tu taller
        </Heading>
        <Text
          variant="lead"
          className="max-w-[48ch] text-primary-foreground/85 max-sm:text-base"
        >
          Déjanos tus datos y te escribimos por WhatsApp para agendar la demo en
          el horario que te sirva.
        </Text>
        <ul className="flex flex-col gap-2.5 max-sm:hidden">
          {assurances.map((item) => (
            <li key={item} className="flex items-center gap-2.5 font-medium">
              <Nut filled className="size-4" />
              {item}
            </li>
          ))}
        </ul>
        <CtaButton
          asChild
          tone="outline-inverse"
          className="mt-2 self-start [--cta-fill:var(--color-primary)] hover:[--cta-fg:var(--color-primary)] max-sm:hidden"
        >
          <a href={siteConfig.secondaryCta.href}>
            {siteConfig.secondaryCta.label}
          </a>
        </CtaButton>
      </Reveal>

      <Reveal delay={150} className="min-w-0">
        {form}
      </Reveal>
    </Container>
  </section>
);
