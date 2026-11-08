import {
  ArrowLeft,
  ArrowRight,
  BellRing,
  ClipboardCheck,
  HandCoins,
  type LucideIcon,
  MessageSquareText,
  Package,
  Wrench,
} from 'lucide-react';
import * as React from 'react';

import { Container } from '@/components/layouts';
import { Facet } from '@/components/ui/facet';
import { Nut } from '@/components/ui/nut';
import { Reveal } from '@/components/ui/reveal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heading, Text } from '@/components/ui/typography';
import { landingSections } from '@/config/site';
import { cn } from '@/utils/cn';

import { useSwipe } from '../hooks/use-swipe';

import { AppWindow } from './preview-primitives';
import { PlayOnView } from './scene-kit';
import { SectionHeading } from './section-heading';
import {
  DeliveryScene,
  FollowUpScene,
  PartsScene,
  QuoteScene,
  ReceptionScene,
  WorkshopBoardScene,
} from './tour-scenes';

type TourStop = {
  value: string;
  tab: string;
  icon: LucideIcon;
  title: string;
  description: string;
  points: string[];
  window: string;
  scene: () => React.ReactElement;
};

// One car through a working day: each step is a feature of the platform.
const stops: TourStop[] = [
  {
    value: 'recepcion',
    tab: 'Recepción',
    icon: ClipboardCheck,
    title: 'Recibe el carro con fotos, checklist y firma',
    description:
      'El asesor registra kilometraje, gasolina y el estado del vehículo antes de que entre al taller. Si hay un reclamo, tienes la prueba.',
    points: ['Checklist de llegada', 'Fotos y firma del cliente'],
    window: 'Recepción · Chevrolet Onix',
    scene: ReceptionScene,
  },
  {
    value: 'cotizacion',
    tab: 'Cotización',
    icon: MessageSquareText,
    title: 'Cotiza y recibe la aprobación por WhatsApp',
    description:
      'La cotización le llega al cliente con un botón para aprobar. Nadie tiene que llamar ni esperar respuesta en el mostrador.',
    points: [
      'Aprobación desde el celular',
      'Valores que no cambian al facturar',
    ],
    window: 'Cotización · COT-01288',
    scene: QuoteScene,
  },
  {
    value: 'taller',
    tab: 'Taller',
    icon: Wrench,
    title: 'Mira el avance de cada elevador en un tablero',
    description:
      'Cada orden tiene técnico, elevador y estado. Sabes qué carro sale primero sin bajar al taller a preguntar.',
    points: ['Tablero por elevador y técnico', 'Estados en tiempo real'],
    window: 'Taller · tablero de hoy',
    scene: WorkshopBoardScene,
  },
  {
    value: 'repuestos',
    tab: 'Repuestos',
    icon: Package,
    title: 'Los repuestos salen de bodega con la orden',
    description:
      'Al agregar un repuesto a la orden se descuenta del inventario. Si queda poco, MecaFix te sugiere el pedido al proveedor.',
    points: ['Descuento automático de stock', 'Pedido sugerido al proveedor'],
    window: 'Orden OT-03877 · repuestos',
    scene: PartsScene,
  },
  {
    value: 'entrega',
    tab: 'Entrega',
    icon: HandCoins,
    title: 'Cobra y factura ante la DIAN al entregar',
    description:
      'El total ya está en la orden. Registras el pago y la factura electrónica se valida y le llega al cliente por correo.',
    points: ['Efectivo, tarjeta o transferencia', 'Factura electrónica DIAN'],
    window: 'Entrega · OT-03877',
    scene: DeliveryScene,
  },
  {
    value: 'seguimiento',
    tab: 'Seguimiento',
    icon: BellRing,
    title: 'Haz que el cliente vuelva a su próximo mantenimiento',
    description:
      'MecaFix programa el recordatorio por fecha o kilometraje y lo envía por WhatsApp. El cliente agenda sin que nadie llame.',
    points: [
      'Recordatorios por fecha o kilómetros',
      'Citas agendadas por WhatsApp',
    ],
    window: 'Seguimiento · Ana Torres',
    scene: FollowUpScene,
  },
];

// On a phone the buttons sit at both ends of the row of step icons; from
// lg up they are the footer of the card, with the name of the step.
const stepPlacement = {
  prev: 'max-lg:col-start-1 max-lg:row-start-1 max-lg:pl-1',
  next: 'max-lg:col-start-3 max-lg:row-start-1 max-lg:pr-1',
} as const;

const StepButton = ({
  direction,
  stop,
  onClick,
}: {
  direction: 'prev' | 'next';
  stop: TourStop | undefined;
  onClick: () => void;
}) => {
  if (!stop) {
    return (
      <span
        className={cn('max-lg:w-13 max-lg:border-b', stepPlacement[direction])}
      />
    );
  }
  const Icon = direction === 'prev' ? ArrowLeft : ArrowRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${direction === 'prev' ? 'Anterior' : 'Siguiente'}: ${stop.tab}`}
      className={cn(
        'group/step flex items-center gap-3 text-sm font-semibold text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:text-foreground max-lg:border-b lg:absolute lg:top-1/2 lg:z-10 lg:-translate-y-1/2',
        direction === 'next'
          ? 'flex-row-reverse text-right lg:right-5'
          : 'lg:left-5',
        stepPlacement[direction],
      )}
    >
      <span
        className={cn(
          'grid h-11 w-12 place-items-center transition-colors clip-hex group-hover/step:bg-primary-hover group-active/step:bg-primary-hover lg:h-14 lg:w-16',
          direction === 'next'
            ? 'bg-primary text-primary-foreground'
            : 'max-lg:bg-secondary max-lg:text-primary lg:bg-primary lg:text-primary-foreground',
        )}
      >
        <Icon aria-hidden="true" className="size-4 lg:size-6" />
      </span>
      <span className="sr-only">
        <span className="block font-mono text-[0.6875rem] font-normal tracking-[0.06em] uppercase">
          {direction === 'prev' ? 'Anterior' : 'Siguiente'}
        </span>
        {stop.tab}
      </span>
    </button>
  );
};

// "Mira la plataforma": the main features as the steps of a working day.
// You move with the tabs or the previous/next buttons; each screen plays
// its short animation when it opens and then stays put.
//
// On a phone the whole step fits one screen: the tabs become six icons, the
// step and its arrows sit right under them, then the title, the screen and
// the description. Swiping the step sideways moves to the next one.
export const PlatformTour = () => {
  const [active, setActive] = React.useState(stops[0].value);
  const index = stops.findIndex((stop) => stop.value === active);
  const swipe = useSwipe((direction) => {
    const next = stops[index + direction];
    if (next) setActive(next.value);
  });

  return (
    <section
      id={landingSections.platform}
      aria-labelledby="platform-title"
      className="pt-12 pb-20 sm:pt-14 sm:pb-24 lg:pb-28"
    >
      <Container className="flex flex-col gap-10 lg:gap-12">
        <SectionHeading
          id="platform-title"
          eyebrow="Mira la plataforma"
          title="Una sola fuente de verdad, un taller organizado"
          description="Lo que registra el asesor lo ven al instante el mecánico, la bodega y caja. Nadie vuelve a digitar ni a preguntar en qué va un carro. Recorre un día del taller y mira cómo se ve por dentro, con datos de ejemplo."
        />

        <Reveal>
          <Tabs
            value={active}
            onValueChange={setActive}
            className="bg-card shadow-[inset_0_0_0_1px_var(--color-border)] max-lg:grid max-lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:relative lg:flex lg:flex-col"
          >
            <TabsList
              aria-label="Pasos del recorrido"
              className="max-lg:col-start-2 max-lg:row-start-1 max-lg:grid max-lg:grid-cols-6 lg:px-2"
            >
              {stops.map(({ value, tab, icon: Icon }, stopIndex) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="max-lg:justify-center max-lg:px-0 max-lg:py-3.5 max-lg:after:inset-x-2 max-lg:[&_svg]:size-5"
                >
                  <span
                    aria-hidden="true"
                    className="font-mono text-[0.6875rem] text-muted-foreground max-lg:hidden"
                  >
                    {String(stopIndex + 1).padStart(2, '0')}
                  </span>
                  <Icon aria-hidden="true" />
                  <span className="max-lg:sr-only">{tab}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="max-lg:contents lg:contents">
              <StepButton
                direction="prev"
                stop={stops[index - 1]}
                onClick={() => setActive(stops[index - 1].value)}
              />
              <span className="font-mono text-xs text-muted-foreground tabular-nums max-lg:hidden lg:absolute lg:bottom-4 lg:left-1/2 lg:-translate-x-1/2">
                {index + 1} / {stops.length}
              </span>
              <StepButton
                direction="next"
                stop={stops[index + 1]}
                onClick={() => setActive(stops[index + 1].value)}
              />
            </div>

            <div
              {...swipe}
              className="touch-pan-y max-lg:col-span-3 max-lg:row-start-2"
            >
              {stops.map((stop) => {
                const Scene = stop.scene;
                return (
                  <TabsContent
                    key={stop.value}
                    value={stop.value}
                    className="grid grid-cols-1 gap-3 px-4 pt-4 pb-4 sm:gap-6 sm:p-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:grid-rows-[1fr_auto_auto_1fr] lg:gap-x-12 lg:gap-y-5 lg:px-28 lg:py-12"
                  >
                    <Heading
                      level="h3"
                      className="text-lg motion-safe:animate-rise sm:text-2xl lg:col-start-1 lg:row-start-2 lg:text-3xl"
                    >
                      {stop.title}
                    </Heading>

                    <div className="relative min-w-0 max-lg:mx-2 max-lg:my-2 lg:col-start-2 lg:row-span-4 lg:row-start-1 lg:self-center">
                      <div
                        aria-hidden="true"
                        className="absolute -inset-2 overflow-hidden bg-inverse bg-hex-mesh sm:-inset-5"
                      >
                        <Facet size="md" className="sm:size-36" />
                      </div>
                      <PlayOnView className="relative">
                        <AppWindow
                          title={stop.window}
                          className="max-sm:[zoom:0.82]"
                        >
                          <Scene />
                        </AppWindow>
                      </PlayOnView>
                    </div>

                    <div className="flex min-w-0 flex-col gap-4 motion-safe:animate-rise-sm lg:col-start-1 lg:row-start-3 lg:gap-5">
                      <Text className="text-[0.9375rem] text-muted-foreground sm:text-base">
                        {stop.description}
                      </Text>
                      <ul className="flex flex-col gap-2.5 max-sm:hidden">
                        {stop.points.map((point) => (
                          <li
                            key={point}
                            className="flex items-start gap-2.5 text-[0.9375rem]"
                          >
                            <Nut
                              filled
                              className="mt-1 size-3.5 text-primary"
                            />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                );
              })}
            </div>
          </Tabs>
        </Reveal>
      </Container>
    </section>
  );
};
