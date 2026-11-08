import { Camera, Check, CircleCheck, Send } from 'lucide-react';

import { Nut } from '@/components/ui/nut';
import { cn } from '@/utils/cn';
import { formatCurrency } from '@/utils/format';

import { at, reactionAt, tapAt } from '../utils/scene-timing';

import { PlateTag, StatusChip } from './preview-primitives';
import { SceneCursor, SceneLabel, ScenePress, SceneSwap } from './scene-kit';

// Scenes of "Mira la plataforma": one car through a working day, from the
// reception desk to the maintenance reminder. Sample data.
//
// Pacing: rows of a list cascade 60-100ms apart (under 500ms in total);
// the longer pauses are reserved for the beats of the story. Whatever a
// cursor tap causes starts at reactionAt(cursor), never before the tap.

// Panels, cards and messages.
const rise = 'motion-safe:animate-rise';
// Rows, chips and supporting blocks.
const settle = 'motion-safe:animate-rise-sm';
const pop = 'motion-safe:animate-pop';

const receptionCursor = 3000;
const quoteCursor = 2400;
const partsCursor = 2400;
const deliveryCursor = 600;

const checklist = [
  'Luces y direccionales',
  'Rayón en puerta trasera izquierda',
  'Llanta de repuesto',
  'SOAT y tecnomecánica al día',
];

export const ReceptionScene = () => (
  <div className="@container relative grid gap-5 p-5 sm:grid-cols-[1.1fr_0.9fr] sm:p-6">
    <div className="flex flex-col gap-4">
      <div
        className={cn('flex flex-wrap items-center gap-3', rise)}
        style={at(0)}
      >
        <span className="text-sm font-semibold">Chevrolet Onix 2021</span>
        <PlateTag>ABC 214</PlateTag>
      </div>
      <div className="grid grid-cols-2 gap-3 text-[0.8125rem] max-sm:hidden">
        <div className={cn('flex flex-col gap-1', rise)} style={at(150)}>
          <SceneLabel>Kilometraje</SceneLabel>
          <span className="font-mono font-semibold tabular-nums">
            48.230 km
          </span>
        </div>
        <div className={cn('flex flex-col gap-1.5', rise)} style={at(250)}>
          <SceneLabel>Gasolina</SceneLabel>
          <span className="block h-2 bg-steel-pale">
            <span
              className="block h-full w-1/4 origin-left bg-primary motion-safe:animate-grow-x"
              style={at(500)}
            />
          </span>
        </div>
      </div>
      <ul className="flex flex-col divide-y border-y text-[0.8125rem]">
        {checklist.map((item, index) => (
          <li
            key={item}
            // On a phone two items tell the story and keep the step on screen.
            className={cn(
              'flex items-center gap-3 py-2',
              index > 1 && 'max-sm:hidden',
            )}
          >
            <span
              className={cn(
                'grid size-5 shrink-0 place-items-center bg-success text-success-foreground clip-hex',
                pop,
              )}
              style={at(700 + index * 150)}
            >
              <Check aria-hidden="true" className="size-3" />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>

    <div className="flex flex-col gap-4">
      <SceneLabel>Fotos de llegada</SceneLabel>
      <div className="grid grid-cols-3 gap-2">
        {[0, 1, 2].map((photo) => (
          <span
            key={photo}
            className={cn(
              'grid aspect-[16/10] place-items-center bg-steel-pale text-steel sm:aspect-[4/3]',
              pop,
            )}
            style={at(1800 + photo * 100)}
          >
            <Camera aria-hidden="true" className="size-4" />
          </span>
        ))}
      </div>
      <div className="flex flex-col gap-1">
        <SceneLabel>Firma del cliente</SceneLabel>
        <svg
          viewBox="0 0 200 50"
          aria-hidden="true"
          className="h-12 w-full border-b border-dashed border-steel-light"
        >
          <path
            d="M8 34c14-22 22-24 26-6s10 10 18-4 14-12 16 2 12 10 22-6 18-6 24 4 16 8 34-8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            pathLength={100}
            strokeDasharray="100"
            className="text-foreground motion-safe:animate-draw"
            style={at(2400)}
          />
        </svg>
      </div>
      <div className="mt-auto flex items-center justify-between gap-3">
        <ScenePress tap={tapAt(receptionCursor)}>
          <span className="bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">
            Abrir orden
          </span>
        </ScenePress>
        <span
          className={cn(
            'inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-success',
            pop,
          )}
          style={at(reactionAt(receptionCursor))}
        >
          <CircleCheck aria-hidden="true" className="size-4" />
          OT-03877 creada
        </span>
      </div>
    </div>
    <SceneCursor
      from={['30cqw', '180px']}
      to={['62cqw', '300px']}
      delay={receptionCursor}
    />
  </div>
);

const quoteLines = [
  { label: 'Pastillas de freno delanteras', amount: 240000 },
  { label: 'Rectificación de discos', amount: 120000 },
  { label: 'Mano de obra · 1,5 h', amount: 90000 },
];

export const QuoteScene = () => (
  <div className="@container relative grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-sm font-semibold">COT-01288</span>
        <SceneSwap
          delay={reactionAt(quoteCursor) + 200}
          before={<StatusChip status="pending" />}
          after={
            <span className="inline-flex items-center gap-1.5 bg-success/15 px-3.5 py-1 text-xs font-semibold text-success clip-bolt">
              <Check aria-hidden="true" className="size-3" />
              Aprobada
            </span>
          }
        />
      </div>
      {/* On a phone the quote is its total: the approval is the story. */}
      <ul className="flex flex-col divide-y divide-dashed border-y text-[0.8125rem] max-sm:hidden">
        {quoteLines.map((line, index) => (
          <li
            key={line.label}
            className={cn('flex justify-between gap-4 py-2.5', settle)}
            style={at(200 + index * 100)}
          >
            <span>{line.label}</span>
            <span className="font-mono tabular-nums">
              {formatCurrency(line.amount)}
            </span>
          </li>
        ))}
      </ul>
      <div
        className={cn(
          'flex justify-between bg-secondary px-3 py-2.5 text-sm font-bold',
          settle,
        )}
        style={at(900)}
      >
        <span>Total</span>
        <span className="font-mono tabular-nums">{formatCurrency(450000)}</span>
      </div>
    </div>

    <div className="flex flex-col gap-2 bg-secondary p-4">
      <SceneLabel>WhatsApp · Ana Torres</SceneLabel>
      <div
        className={cn(
          'max-w-[95%] bg-card p-3 text-[0.8125rem] shadow-[inset_0_0_0_1px_var(--color-border)]',
          rise,
        )}
        style={at(1700)}
      >
        Hola Ana, tu Onix necesita frenos delanteros. Total{' '}
        {formatCurrency(450000)}.
        <span className="mt-3 flex gap-2">
          <ScenePress tap={tapAt(quoteCursor)}>
            <span className="bg-success px-3 py-1.5 text-xs font-semibold text-success-foreground">
              Aprobar
            </span>
          </ScenePress>
          <span className="px-3 py-1.5 text-xs font-semibold text-muted-foreground shadow-[inset_0_0_0_1px_var(--color-border)]">
            Ver detalle
          </span>
        </span>
      </div>
      <span
        className={cn(
          'self-end bg-success/15 px-3 py-1.5 text-xs font-semibold text-success',
          pop,
        )}
        style={at(reactionAt(quoteCursor))}
      >
        Ana aprobó la cotización
      </span>
    </div>
    <SceneCursor
      from={['80cqw', '260px']}
      to={['56cqw', '128px']}
      delay={quoteCursor}
    />
  </div>
);

const bays = [
  {
    bay: 'Elevador 1',
    car: 'Renault Logan',
    plate: 'KRT 908',
    tech: 'LM',
    progress: 'w-full',
    done: true,
  },
  {
    bay: 'Elevador 2',
    car: 'Mazda 2',
    plate: 'GHU 551',
    tech: 'CR',
    progress: 'w-2/5',
    done: false,
  },
  {
    bay: 'Elevador 3',
    car: 'Chevrolet Onix',
    plate: 'ABC 214',
    tech: 'JO',
    progress: 'w-3/4',
    done: false,
  },
];

export const WorkshopBoardScene = () => (
  <div className="grid grid-cols-2 gap-3 p-5 sm:grid-cols-3 sm:p-6">
    {bays.map((bay, index) => (
      <div
        key={bay.bay}
        className={cn(
          'flex flex-col gap-3 bg-secondary p-3',
          // On a phone the middle bay is left out: two bays side by side.
          index === 1 && 'max-sm:hidden',
          rise,
        )}
        style={at(index * 100)}
      >
        <div className="flex items-center justify-between">
          <SceneLabel>{bay.bay}</SceneLabel>
          <span
            aria-hidden="true"
            className="size-2 bg-success clip-hex motion-safe:animate-beacon"
          />
        </div>
        <div
          className={cn(
            'flex flex-col gap-2 bg-card p-3 shadow-[inset_0_0_0_1px_var(--color-border)]',
            pop,
          )}
          style={at(500 + index * 100)}
        >
          <span className="text-[0.8125rem] font-semibold">{bay.car}</span>
          <PlateTag>{bay.plate}</PlateTag>
          <span className="mt-1 block h-1.5 bg-steel-pale">
            <span
              className={cn(
                'block h-full origin-left motion-safe:animate-grow-x',
                bay.progress,
                bay.done ? 'bg-success' : 'bg-primary',
              )}
              style={at(1000 + index * 100)}
            />
          </span>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="grid h-6 w-7 shrink-0 place-items-center bg-inverse text-[0.625rem] font-bold text-inverse-foreground clip-hex">
              {bay.tech}
            </span>
            {bay.done ? (
              <SceneSwap
                delay={2600}
                before={<StatusChip status="service" />}
                after={<StatusChip status="done" />}
              />
            ) : (
              <StatusChip status="service" />
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
);

const partsLines = [
  { label: 'Filtro de aceite PH-3614', stock: 'Quedan 2 en bodega', low: true },
  { label: 'Aceite 5W-30 · 4 L', stock: 'Quedan 10 en bodega', low: false },
];

export const PartsScene = () => (
  <div className="@container relative flex flex-col gap-4 p-5 sm:p-6">
    <div className="flex items-center justify-between gap-3">
      <span className="font-mono text-sm font-semibold">
        OT-03877 · repuestos
      </span>
      <PlateTag>ABC 214</PlateTag>
    </div>
    <ul className="flex flex-col divide-y border-y text-[0.8125rem]">
      {partsLines.map((line, index) => (
        <li
          key={line.label}
          className={cn(
            'flex flex-wrap items-center justify-between gap-2 py-3',
            settle,
          )}
          style={at(200 + index * 500)}
        >
          <span className="font-medium">{line.label}</span>
          <span
            className={cn(
              'font-mono text-[0.6875rem] font-semibold',
              line.low ? 'text-warning' : 'text-muted-foreground',
              settle,
            )}
            style={at(700 + index * 500)}
          >
            −1 · {line.stock}
          </span>
        </li>
      ))}
    </ul>
    <div
      className={cn(
        'flex flex-col gap-3 border-l-4 border-warning bg-warning/10 p-4 sm:flex-row sm:items-center sm:justify-between',
        rise,
      )}
      style={at(1900)}
    >
      <span className="text-[0.8125rem]">
        <strong className="block font-semibold">
          Stock bajo de filtros PH-3614
        </strong>
        Sugerimos pedir 6 und. a Autopartes Sur.
      </span>
      <SceneSwap
        delay={reactionAt(partsCursor)}
        before={
          <ScenePress tap={tapAt(partsCursor)}>
            <span className="bg-inverse px-3 py-1.5 text-xs font-semibold text-inverse-foreground">
              Crear orden de compra
            </span>
          </ScenePress>
        }
        after={
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-success">
            <CircleCheck aria-hidden="true" className="size-4" />
            Pedido enviado
          </span>
        }
      />
    </div>
    <SceneCursor
      from={['30cqw', '60px']}
      to={['74cqw', '190px']}
      delay={partsCursor}
    />
  </div>
);

const payments = ['Efectivo', 'Tarjeta', 'Transferencia'];

export const DeliveryScene = () => (
  <div className="@container relative grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
    <div className="flex flex-col gap-3">
      <SceneLabel>Entrega · OT-03877</SceneLabel>
      <span
        className={cn(
          'font-heading text-3xl font-extrabold tabular-nums',
          rise,
        )}
        style={at(100)}
      >
        {formatCurrency(450000)}
      </span>
      <SceneLabel>Medio de pago</SceneLabel>
      <div className="flex flex-wrap gap-2">
        {payments.map((method, index) => (
          <span
            key={method}
            className={cn(
              'px-3 py-1.5 text-xs font-semibold shadow-[inset_0_0_0_1px_var(--color-border)]',
              settle,
            )}
            style={at(300 + index * 60)}
          >
            {index === 2 ? (
              <SceneSwap
                delay={reactionAt(deliveryCursor)}
                before={
                  <ScenePress tap={tapAt(deliveryCursor)}>{method}</ScenePress>
                }
                after={<span className="text-primary">✓ {method}</span>}
              />
            ) : (
              method
            )}
          </span>
        ))}
      </div>
    </div>
    <div className="flex flex-col gap-3 bg-secondary p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-sm font-semibold">FE-01943</span>
        <SceneSwap
          delay={3300}
          before={
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="size-3 border-2 border-steel-light border-t-primary motion-safe:animate-spin-slow" />
              Validando con la DIAN
            </span>
          }
          after={
            <span className="inline-flex items-center gap-1.5 bg-success/15 px-3 py-1 text-xs font-semibold text-success clip-bolt">
              <CircleCheck aria-hidden="true" className="size-3.5" />
              Validada DIAN
            </span>
          }
        />
      </div>
      <dl
        className={cn(
          'grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-[0.8125rem]',
          settle,
        )}
        style={at(2400)}
      >
        <dt className="text-muted-foreground">Subtotal</dt>
        <dd className="text-right font-mono">{formatCurrency(378151)}</dd>
        <dt className="text-muted-foreground">IVA 19 %</dt>
        <dd className="text-right font-mono">{formatCurrency(71849)}</dd>
      </dl>
      <span
        className={cn(
          'inline-flex items-center gap-1.5 font-mono text-[0.6875rem] text-muted-foreground',
          settle,
        )}
        style={at(3900)}
      >
        <Send aria-hidden="true" className="size-3" />
        Enviada a ana.torres@correo.com
      </span>
    </div>
    <SceneCursor
      from={['10cqw', '220px']}
      to={['36cqw', '150px']}
      delay={deliveryCursor}
    />
  </div>
);

const followUp = [
  { label: 'Entregado', detail: '6 nov · 48.230 km', delay: 0 },
  {
    label: 'Recordatorio programado',
    detail: '6 may · o a los 53.230 km',
    delay: 600,
  },
  {
    label: 'Mensaje enviado por WhatsApp',
    detail: '6 may · 9:00 a. m.',
    delay: 1400,
  },
  { label: 'Cita agendada', detail: '12 may · Elevador 2', delay: 2600 },
];

export const FollowUpScene = () => (
  <div className="grid gap-5 p-5 sm:grid-cols-[0.9fr_1.1fr] sm:p-6">
    <ol className="relative flex flex-col gap-5 pl-6">
      <span
        aria-hidden="true"
        className="absolute top-1 bottom-1 left-[7px] w-px origin-top bg-steel-light motion-safe:animate-grow-y"
        style={at(100)}
      />
      {followUp.map((step, index) => (
        <li
          key={step.label}
          className={cn(
            'relative flex flex-col',
            // On a phone the chat beside it already shows the message.
            index === 2 && 'max-sm:hidden',
            rise,
          )}
          style={at(step.delay)}
        >
          <span
            aria-hidden="true"
            className={cn(
              'absolute top-1 -left-6 grid size-4 place-items-center clip-hex',
              index === followUp.length - 1 ? 'bg-primary' : 'bg-inverse',
            )}
          />
          <span className="text-[0.8125rem] font-semibold">{step.label}</span>
          <span className="font-mono text-[0.6875rem] text-muted-foreground">
            {step.detail}
          </span>
        </li>
      ))}
    </ol>
    <div className="flex flex-col gap-2 bg-secondary p-4">
      <SceneLabel>WhatsApp · Ana Torres</SceneLabel>
      <div
        className={cn(
          'bg-card p-3 text-[0.8125rem] shadow-[inset_0_0_0_1px_var(--color-border)]',
          rise,
        )}
        style={at(1600)}
      >
        Hola Ana, ya le toca el mantenimiento de 50.000 km a tu Onix. ¿Te
        agendamos esta semana?
      </div>
      <div
        className={cn(
          'self-end bg-inverse p-3 text-[0.8125rem] text-inverse-foreground',
          rise,
        )}
        style={at(2300)}
      >
        Sí, el lunes en la mañana.
      </div>
      <span
        className={cn(
          'mt-1 inline-flex items-center gap-2 self-start text-xs font-semibold text-primary',
          pop,
        )}
        style={at(2900)}
      >
        <Nut filled className="size-3.5" />
        Cita creada sin una llamada
      </span>
    </div>
  </div>
);
