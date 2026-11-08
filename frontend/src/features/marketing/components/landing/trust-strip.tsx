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
import { Reveal } from '@/components/ui/reveal';
import { Heading, Text } from '@/components/ui/typography';
import { useTrackProgress } from '@/features/marketing/hooks/use-track-progress';
import { cn } from '@/utils/cn';

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

// Where each commitment lights up along the track (0 → 1). On the phone
// rail the goal is one more stop at the end of the list.
const checkpoint = (index: number, vertical: boolean) =>
  vertical
    ? (index + 0.25) / (assurances.length + 1)
    : (index + 0.5) / assurances.length;

const checkered =
  'bg-[conic-gradient(var(--color-inverse-foreground)_25%,var(--color-night)_0_50%,var(--color-inverse-foreground)_0_75%,var(--color-night)_0)] bg-[length:8px_8px]';

const carMotion =
  'motion-safe:transition-[left,top] motion-safe:duration-300 motion-safe:ease-out';

// Goal of the race: the hex goes red when the car gets there.
const Goal = ({
  finished,
  className,
}: {
  finished: boolean;
  className?: string;
}) => (
  <div className={cn('flex items-start gap-3', className)}>
    <span
      className={cn(
        'grid h-12 w-14 shrink-0 place-items-center transition-colors duration-300 clip-hex sm:order-2 sm:h-11 sm:w-12',
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
      <span className="font-heading text-xl leading-tight font-extrabold text-inverse-foreground sm:text-2xl">
        Un taller que funciona mejor
      </span>
    </span>
  </div>
);

// Horizontal race track (from sm up): the car follows the mouse or the
// scroll and lights up each commitment it passes.
const Track = ({
  ref,
  progress,
}: {
  ref: React.Ref<HTMLDivElement>;
  progress: number;
}) => (
  <div ref={ref} aria-hidden="true" className="relative h-20 max-sm:hidden">
    <span className="absolute inset-x-0 bottom-3 h-2 bg-inverse-muted" />
    <span
      className="absolute bottom-3 left-0 h-2 bg-primary motion-safe:transition-[width] motion-safe:duration-300 motion-safe:ease-out"
      style={{ width: `${progress * 100}%` }}
    />
    {/* Lane dashes */}
    <span className="absolute inset-x-0 bottom-[15px] h-0.5 bg-[repeating-linear-gradient(90deg,var(--color-inverse-foreground)_0_14px,transparent_14px_30px)] opacity-25" />
    {assurances.map(({ title }, index) => {
      const position = checkpoint(index, false);
      return (
        <span
          key={title}
          className={cn(
            'absolute bottom-1.5 h-5 w-0.5 transition-colors',
            progress >= position ? 'bg-primary-bright' : 'bg-inverse-border',
          )}
          style={{ left: `${position * 100}%` }}
        />
      );
    })}
    <span className={cn('absolute right-0 bottom-0 h-10 w-4', checkered)} />
    <RaceCar
      className={cn('absolute bottom-2 h-11 w-28', carMotion)}
      // Keep the car inside the track at both ends.
      style={{ left: `calc(${progress * 100}% - ${progress * 7}rem)` }}
    />
  </div>
);

// Vertical rail beside the list (phone only): the car drives down with the
// scroll and reaches the checkered line next to the goal.
const Rail = ({
  ref,
  progress,
}: {
  ref: React.Ref<HTMLDivElement>;
  progress: number;
}) => (
  <div ref={ref} aria-hidden="true" className="relative sm:hidden">
    <span className="absolute inset-y-0 left-1/2 w-2 -translate-x-1/2 bg-inverse-muted" />
    <span
      className="absolute top-0 left-1/2 w-2 -translate-x-1/2 bg-primary motion-safe:transition-[height] motion-safe:duration-300 motion-safe:ease-out"
      style={{ height: `${progress * 100}%` }}
    />
    <span className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-[repeating-linear-gradient(180deg,var(--color-inverse-foreground)_0_14px,transparent_14px_30px)] opacity-25" />
    <span
      className={cn(
        'absolute bottom-0 left-1/2 h-4 w-10 -translate-x-1/2',
        checkered,
      )}
    />
    <span
      className={cn('absolute left-1/2 h-28 w-11 -translate-x-1/2', carMotion)}
      // Keep the car inside the rail at both ends.
      style={{ top: `calc(${progress * 100}% - ${progress * 7}rem)` }}
    >
      <RaceCar className="absolute top-1/2 left-1/2 h-11 w-28 -translate-x-1/2 -translate-y-1/2 rotate-90" />
    </span>
  </div>
);

// Trust band drawn as a race track: the car runs from the start to the
// finish flag and lights up each commitment it passes. On a phone the
// track is a rail beside the list and the goal is its last stop.
export const TrustStrip = () => {
  const { sectionRef, trackRef, railRef, progress, vertical } =
    useTrackProgress<HTMLElement, HTMLDivElement, HTMLDivElement>();
  const finished = progress > 0.97;

  return (
    <section
      ref={sectionRef}
      aria-labelledby="trust-title"
      className="relative overflow-hidden bg-inverse bg-hex-mesh pt-12 pb-14 text-inverse-foreground sm:py-24"
    >
      <Container className="flex flex-col gap-10 sm:gap-12">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal className="max-w-2xl">
            <Heading
              id="trust-title"
              level="h2"
              className="text-inverse-foreground"
            >
              Te acompañamos en todo tu proceso
            </Heading>
          </Reveal>
          <Reveal delay={120} className="max-w-xs max-sm:hidden">
            <Goal
              finished={finished}
              className="sm:justify-end sm:text-right"
            />
          </Reveal>
        </div>

        <div className="flex flex-col gap-8">
          <Track ref={trackRef} progress={progress} />

          <div className="grid grid-cols-[minmax(0,1fr)_3rem] gap-x-4 sm:block">
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {assurances.map(({ title, description, icon: Icon }, index) => {
                const reached = progress >= checkpoint(index, vertical);
                return (
                  <li key={title}>
                    <Reveal
                      delay={index * 90}
                      className="flex gap-4 sm:flex-col sm:gap-3"
                    >
                      <span
                        className={cn(
                          'grid h-12 w-14 shrink-0 place-items-center transition-colors duration-300 clip-hex',
                          reached
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-inverse-muted text-primary-bright',
                        )}
                      >
                        <Icon aria-hidden="true" className="size-5" />
                      </span>
                      <span className="flex flex-col gap-1.5 sm:gap-3">
                        <span className="font-heading text-lg leading-tight font-extrabold sm:text-xl">
                          {title}
                        </span>
                        <Text
                          variant="small"
                          className="max-w-[30ch] text-inverse-muted-foreground"
                        >
                          {description}
                        </Text>
                      </span>
                    </Reveal>
                  </li>
                );
              })}
              <li className="sm:hidden">
                <Goal finished={finished} className="gap-4" />
              </li>
            </ul>
            <Rail ref={railRef} progress={progress} />
          </div>
        </div>
      </Container>
    </section>
  );
};
