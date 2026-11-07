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

const StepButton = ({
  direction,
  stop,
  onClick,
}: {
  direction: 'prev' | 'next';
  stop: TourStop | undefined;
  onClick: () => void;
}) => {
  if (!stop) return <span />;
  const Icon = direction === 'prev' ? ArrowLeft : ArrowRight;
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group/step flex items-center gap-3 text-sm font-semibold text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:text-foreground focus-visible:underline',
        direction === 'next' && 'flex-row-reverse text-right',
      )}
    >
      <span className="grid h-9 w-10 place-items-center bg-secondary text-primary transition-colors clip-hex group-hover/step:bg-primary group-hover/step:text-primary-foreground">
        <Icon aria-hidden="true" className="size-4" />
      </span>
      <span>
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
export const PlatformTour = () => {
  const [active, setActive] = React.useState(stops[0].value);
  const index = stops.findIndex((stop) => stop.value === active);

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
          title="Un carro, de la recepción al próximo mantenimiento"
          description="Recorre un día del taller paso a paso y mira cómo se ve cada funcionalidad por dentro. Los datos son de ejemplo."
        />

        <Reveal>
          <Tabs
            value={active}
            onValueChange={setActive}
            className="bg-card shadow-[inset_0_0_0_1px_var(--color-border)]"
          >
            <TabsList aria-label="Pasos del recorrido" className="px-2">
              {stops.map(({ value, tab, icon: Icon }, stopIndex) => (
                <TabsTrigger key={value} value={value}>
                  <span
                    aria-hidden="true"
                    className="font-mono text-[0.6875rem] text-muted-foreground"
                  >
                    {String(stopIndex + 1).padStart(2, '0')}
                  </span>
                  <Icon aria-hidden="true" />
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>

            {stops.map((stop) => {
              const Scene = stop.scene;
              return (
                <TabsContent
                  key={stop.value}
                  value={stop.value}
                  className="grid grid-cols-1 gap-10 p-6 sm:p-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-12 lg:p-12"
                >
                  <div className="flex min-w-0 flex-col gap-5 motion-safe:animate-rise">
                    <Heading level="h3" className="text-2xl sm:text-3xl">
                      {stop.title}
                    </Heading>
                    <Text className="text-muted-foreground">
                      {stop.description}
                    </Text>
                    <ul className="flex flex-col gap-2.5">
                      {stop.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2.5 text-[0.9375rem]"
                        >
                          <Nut filled className="mt-1 size-3.5 text-primary" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="relative min-w-0">
                    <div
                      aria-hidden="true"
                      className="absolute -inset-3 overflow-hidden bg-inverse bg-hex-mesh sm:-inset-5"
                    >
                      <Facet size="lg" />
                    </div>
                    <PlayOnView className="relative">
                      <AppWindow title={stop.window}>
                        <Scene />
                      </AppWindow>
                    </PlayOnView>
                  </div>
                </TabsContent>
              );
            })}

            <div className="flex items-center justify-between gap-4 border-t px-6 py-4 sm:px-8">
              <StepButton
                direction="prev"
                stop={stops[index - 1]}
                onClick={() => setActive(stops[index - 1].value)}
              />
              <span className="font-mono text-xs text-muted-foreground tabular-nums">
                {index + 1} / {stops.length}
              </span>
              <StepButton
                direction="next"
                stop={stops[index + 1]}
                onClick={() => setActive(stops[index + 1].value)}
              />
            </div>
          </Tabs>
        </Reveal>
      </Container>
    </section>
  );
};
