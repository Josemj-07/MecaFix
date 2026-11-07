import { ArrowDown, ArrowUp } from 'lucide-react';
import * as React from 'react';

import { Eyebrow } from '@/components/ui/eyebrow';
import { Facet } from '@/components/ui/facet';
import { Reveal } from '@/components/ui/reveal';
import { Heading, Text } from '@/components/ui/typography';
import { landingSections } from '@/config/site';
import { cn } from '@/utils/cn';

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  workshop: string;
  city: string;
  result: string;
  // Placeholder content is labelled on screen until it is replaced.
  isExample: boolean;
};

// TODO: reemplazar por testimonios reales (foto, nombre completo, taller,
// ciudad y un resultado verificable, con permiso escrito) antes de publicar.
// Mientras isExample sea true, la tarjeta se marca como "Ejemplo".
const testimonials: Testimonial[] = [
  {
    quote:
      'Antes perdíamos órdenes en el tablero de corcho. Ahora el cliente recibe la cotización por WhatsApp y la aprueba desde su celular.',
    name: 'Luis M.',
    role: 'Jefe de taller',
    workshop: 'Taller de mecánica general',
    city: 'Medellín',
    result: 'Cotizaciones aprobadas el mismo día',
    isExample: true,
  },
  {
    quote:
      'La quincena me tomaba una tarde entera con el Excel. Con las comisiones saliendo de las órdenes, la reviso y la apruebo.',
    name: 'Diana R.',
    role: 'Administradora',
    workshop: 'Serviteca',
    city: 'Cali',
    result: 'Nómina liquidada desde las órdenes',
    isExample: true,
  },
  {
    quote:
      'Por fin sé qué repuestos tengo sin ir a la bodega. El sistema me avisa antes de que se acaben los filtros.',
    name: 'Andrés P.',
    role: 'Dueño',
    workshop: 'Taller de frenos y suspensión',
    city: 'Bogotá',
    result: 'Alertas de stock antes de quedarse sin repuestos',
    isExample: true,
  },
];

const initials = (name: string) =>
  name
    .split(' ')
    .map((word) => word[0])
    .join('');

const SlantIconButton = ({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    aria-label={label}
    onClick={onClick}
    className="group/arrow relative isolate grid size-12 place-items-center text-primary-foreground outline-none before:absolute before:inset-0 before:-z-10 before:bg-primary before:transition-colors before:[--slant:9px] before:clip-slant hover:before:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
  >
    {children}
  </button>
);

export const TestimonialsSection = () => {
  const [index, setIndex] = React.useState(0);
  const total = testimonials.length;
  const current = testimonials[index];

  const go = (step: number) =>
    setIndex((value) => (value + step + total) % total);

  return (
    <section
      id={landingSections.testimonials}
      aria-labelledby="testimonials-title"
      className="grid bg-secondary lg:grid-cols-2"
    >
      <div className="relative isolate overflow-hidden bg-inverse bg-hex-mesh text-inverse-foreground">
        <Facet size="lg" />
        {/* Faceted wedge rising at the bottom, echo of the hero cuts. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 600 120"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-0 -z-10 h-24 w-full"
        >
          <polygon points="0,120 600,20 600,120" className="fill-primary" />
          <polygon
            points="260,120 600,20 600,120"
            className="fill-primary-hover"
          />
        </svg>
        <div className="mx-auto flex h-full max-w-xl flex-col justify-center gap-5 px-6 pt-20 pb-36 sm:px-10 lg:ml-auto lg:pr-16">
          <Reveal className="flex flex-col gap-5">
            <Eyebrow tone="inverse">Testimonios</Eyebrow>
            <Heading
              id="testimonials-title"
              level="h2"
              className="text-inverse-foreground"
            >
              Talleres que ya dejaron el cuaderno
            </Heading>
            <Text variant="lead" className="text-inverse-muted-foreground">
              Lo que cuentan los equipos que pasaron sus órdenes, su bodega y su
              nómina a MecaFix.
            </Text>
          </Reveal>
        </div>
      </div>

      <div className="flex items-center px-6 py-16 sm:px-10 lg:px-16">
        <div className="flex w-full max-w-xl items-center gap-6 sm:gap-8">
          <div className="flex shrink-0 flex-col gap-3">
            <SlantIconButton label="Testimonio anterior" onClick={() => go(-1)}>
              <ArrowUp aria-hidden="true" className="size-5" />
            </SlantIconButton>
            <SlantIconButton label="Testimonio siguiente" onClick={() => go(1)}>
              <ArrowDown aria-hidden="true" className="size-5" />
            </SlantIconButton>
          </div>

          <figure
            key={index}
            aria-live="polite"
            className="relative flex flex-1 flex-col gap-5 bg-card p-6 shadow-[inset_0_0_0_1px_var(--color-border)] motion-safe:animate-rise sm:p-8"
          >
            {/* Ruler along the top edge of the card. */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-3.5 border-t-2 border-foreground bg-ruler"
            />
            <div className="flex items-center justify-between pt-3">
              <span
                aria-hidden="true"
                className="font-heading text-6xl leading-[0.6] font-extrabold text-primary"
              >
                “
              </span>
              {current.isExample && (
                <span className="bg-steel-pale px-2 py-0.5 font-mono text-[0.625rem] tracking-[0.08em] text-muted-foreground uppercase">
                  Ejemplo
                </span>
              )}
            </div>
            <blockquote className="text-lg leading-relaxed text-card-foreground">
              “{current.quote}”
            </blockquote>
            <span className="self-start bg-primary-tint px-2.5 py-1 text-xs font-semibold text-primary">
              {current.result}
            </span>
            <figcaption className="flex items-center gap-3 border-t border-dashed pt-4">
              <span
                aria-hidden="true"
                className="grid h-11 w-12 place-items-center bg-inverse text-sm font-bold text-inverse-foreground clip-hex"
              >
                {initials(current.name)}
              </span>
              <span className="flex flex-col">
                <span className="font-semibold">
                  {current.name} · {current.role}
                </span>
                <span className="text-sm text-muted-foreground">
                  {current.workshop} · {current.city}
                </span>
              </span>
            </figcaption>
            <span aria-hidden="true" className="flex gap-1.5 self-end">
              {testimonials.map((item, dot) => (
                <span
                  key={item.name}
                  className={cn(
                    'h-1.5 w-4 -skew-x-[14deg] transition-colors',
                    dot === index ? 'bg-primary' : 'bg-steel-light',
                  )}
                />
              ))}
            </span>
          </figure>
        </div>
      </div>
    </section>
  );
};
