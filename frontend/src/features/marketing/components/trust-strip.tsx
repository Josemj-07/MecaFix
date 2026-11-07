import {
  DatabaseZap,
  Flag,
  Headset,
  type LucideIcon,
  ReceiptText,
  UsersRound,
} from 'lucide-react';
import type * as React from 'react';

import { Container } from '@/components/layouts';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal } from '@/components/ui/reveal';
import { Heading, Text } from '@/components/ui/typography';
import { cn } from '@/utils/cn';

import { useTrackProgress } from '../hooks/use-track-progress';

type Assurance = {
  title: string;
  description: string;
  icon: LucideIcon;
};

// Only commitments the team can keep today. Do not add numbers here
// (clients, ratings) until they are real and verifiable.
const assurances: Assurance[] = [
  {
    title: 'Atención humana 24/7',
    description: 'Te responde una persona del equipo, a cualquier hora.',
    icon: Headset,
  },
  {
    title: 'Migración de datos incluida',
    description:
      'Pasamos tus clientes, vehículos y repuestos desde Excel o el cuaderno.',
    icon: DatabaseZap,
  },
  {
    title: 'Capacitación para tu equipo',
    description:
      'Asesores, mecánicos y administración aprenden lo que les toca.',
    icon: UsersRound,
  },
  {
    title: 'Factura electrónica DIAN',
    description: 'Facturas desde la orden cerrada, sin volver a digitar.',
    icon: ReceiptText,
  },
];

// Side view of a race car in the brand colors. Decorative.
const RaceCar = ({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) => (
  <svg
    viewBox="0 0 96 36"
    aria-hidden="true"
    focusable="false"
    className={className}
    style={style}
  >
    <polygon points="6,8 16,8 18,20 4,20" className="fill-inverse-border" />
    <polygon points="2,6 20,6 20,9 2,9" className="fill-primary-bright" />
    <polygon
      points="10,22 26,14 46,12 58,6 70,8 78,16 92,20 94,26 10,28"
      className="fill-primary"
    />
    <polygon points="46,12 58,6 70,8 62,14" className="fill-night" />
    <polygon points="26,14 46,12 44,18 24,20" className="fill-primary-soft" />
    <polygon points="78,16 92,20 94,26 80,24" className="fill-primary-hover" />
    <circle cx="26" cy="28" r="7" className="fill-night" />
    <circle cx="26" cy="28" r="3" className="fill-steel" />
    <circle cx="78" cy="28" r="7" className="fill-night" />
    <circle cx="78" cy="28" r="3" className="fill-steel" />
  </svg>
);

const checkpoints = assurances.map(
  (_, index) => (index + 0.5) / assurances.length,
);

// Trust band drawn as a race track: the car runs from the start to the
// finish flag (following the mouse, or the scroll on touch screens) and
// lights up each commitment it passes.
export const TrustStrip = () => {
  const { sectionRef, trackRef, progress } = useTrackProgress<
    HTMLElement,
    HTMLDivElement
  >();
  const finished = progress > 0.97;

  return (
    <section
      ref={sectionRef}
      aria-labelledby="trust-title"
      className="relative overflow-hidden bg-inverse bg-hex-mesh py-20 text-inverse-foreground sm:py-24"
    >
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal className="flex max-w-2xl flex-col gap-4">
            <Eyebrow tone="inverse">Empiezas acompañado</Eyebrow>
            <Heading
              id="trust-title"
              level="h2"
              className="text-inverse-foreground"
            >
              Te acompañamos en todo tu proceso
            </Heading>
          </Reveal>
          <Reveal
            delay={120}
            className="flex max-w-xs items-start gap-3 sm:justify-end sm:text-right"
          >
            <span
              className={cn(
                'grid h-11 w-12 shrink-0 place-items-center transition-colors duration-300 clip-hex sm:order-2',
                finished
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-inverse-muted text-inverse-foreground',
              )}
            >
              <Flag aria-hidden="true" className="size-5" />
            </span>
            <span className="flex flex-col gap-1">
              <span className="font-mono text-sm font-semibold tracking-[0.06em] text-primary-bright uppercase">
                La meta
              </span>
              <span className="font-heading text-2xl leading-tight font-extrabold text-inverse-foreground">
                Un taller que funciona mejor
              </span>
            </span>
          </Reveal>
        </div>

        <div className="flex flex-col gap-8">
          {/* Track */}
          <div ref={trackRef} aria-hidden="true" className="relative h-20">
            <span className="absolute inset-x-0 bottom-3 h-2 bg-inverse-muted" />
            <span
              className="absolute bottom-3 left-0 h-2 origin-left bg-primary motion-safe:transition-[width] motion-safe:duration-300 motion-safe:ease-out"
              style={{ width: `${progress * 100}%` }}
            />
            {/* Lane dashes */}
            <span className="absolute inset-x-0 bottom-[15px] h-0.5 bg-[repeating-linear-gradient(90deg,var(--color-inverse-foreground)_0_14px,transparent_14px_30px)] opacity-25" />
            {checkpoints.map((position, index) => (
              <span
                key={assurances[index].title}
                className={cn(
                  'absolute bottom-1.5 h-5 w-0.5 transition-colors',
                  progress >= position
                    ? 'bg-primary-bright'
                    : 'bg-inverse-border',
                )}
                style={{ left: `${position * 100}%` }}
              />
            ))}
            {/* Checkered finish line */}
            <span className="absolute right-0 bottom-0 h-10 w-4 bg-[conic-gradient(var(--color-inverse-foreground)_25%,var(--color-night)_0_50%,var(--color-inverse-foreground)_0_75%,var(--color-night)_0)] bg-[length:8px_8px]" />
            <RaceCar
              className="absolute bottom-2 h-11 w-28 motion-safe:transition-[left,transform] motion-safe:duration-300 motion-safe:ease-out"
              // Keep the car inside the track at both ends.
              style={{
                left: `calc(${progress * 100}% - ${progress * 7}rem)`,
              }}
            />
          </div>

          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {assurances.map(({ title, description, icon: Icon }, index) => {
              const reached = progress >= checkpoints[index];
              return (
                <li key={title}>
                  <Reveal delay={index * 90} className="flex flex-col gap-3">
                    <span
                      className={cn(
                        'grid h-12 w-14 place-items-center transition-colors duration-300 clip-hex',
                        reached
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-inverse-muted text-primary-bright',
                      )}
                    >
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <span className="font-heading text-xl font-extrabold">
                      {title}
                    </span>
                    <Text
                      variant="small"
                      className="max-w-[30ch] text-inverse-muted-foreground"
                    >
                      {description}
                    </Text>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
};
