import { Bot, Check, CircleCheck, Lightbulb, Send } from 'lucide-react';
import type * as React from 'react';

import { cn } from '@/utils/cn';
import { formatCurrency } from '@/utils/format';

import { type ModuleSlug } from '../utils/modules';
import {
  sampleAssistantChat,
  sampleMarginByService,
  samplePayroll,
  sampleStock,
} from '../utils/preview-data';

import { PlateTag, StatusChip } from './preview-primitives';
import { SceneCursor, SceneLabel, SceneSwap, at } from './scene-kit';
import { DeliveryScene, WorkshopBoardScene } from './tour-scenes';

// Scenes of the module showcase and module pages. Sample data.

const rise = 'motion-safe:animate-rise';
const pop = 'motion-safe:animate-pop';
const fade = 'motion-safe:animate-fade';

const OrdersModuleScene = () => (
  <div className="flex flex-col">
    <WorkshopBoardScene />
    <div
      className={cn(
        'mx-5 mb-5 flex flex-wrap items-center justify-between gap-3 border-t pt-4 text-[0.8125rem] sm:mx-6 sm:mb-6',
        fade,
      )}
      style={at(1800)}
    >
      <span className="flex items-center gap-2">
        <PlateTag>ABC 214</PlateTag>3 visitas · última 6 nov
      </span>
      <span className="font-mono text-[0.6875rem] text-muted-foreground uppercase">
        Historial por placa
      </span>
    </div>
  </div>
);

const InventoryModuleScene = () => (
  <div className="@container relative flex flex-col gap-4 p-5 sm:p-6">
    <ul className="flex flex-col divide-y border-y">
      {sampleStock.map((item, index) => {
        const low = item.available < item.minimum;
        const percent = Math.min(
          100,
          Math.round((item.available / (item.minimum * 2)) * 100),
        );
        return (
          <li
            key={item.part}
            className={cn('flex flex-col gap-2 py-3', rise)}
            style={at(index * 180)}
          >
            <div className="flex items-center justify-between gap-3 text-[0.8125rem]">
              <span className="truncate font-medium">{item.part}</span>
              <span
                className={cn(
                  'shrink-0 px-2.5 py-0.5 font-mono text-[0.6875rem] font-semibold clip-bolt',
                  low
                    ? 'bg-warning/15 text-warning'
                    : 'bg-success/15 text-success',
                  pop,
                )}
                style={at(900 + index * 180)}
              >
                {item.available} / mín. {item.minimum}
              </span>
            </div>
            <span className="relative block h-1.5 bg-steel-pale">
              <span
                className={cn(
                  'absolute inset-y-0 left-0 origin-left motion-safe:animate-grow-x',
                  low ? 'bg-warning' : 'bg-success',
                )}
                style={{ width: `${percent}%`, ...at(400 + index * 180) }}
              />
              <span
                aria-hidden="true"
                className="absolute -top-1 left-1/2 h-3.5 w-px bg-primary"
              />
            </span>
          </li>
        );
      })}
    </ul>
    <div
      className={cn(
        'flex flex-col gap-3 bg-inverse p-4 text-inverse-foreground sm:flex-row sm:items-center sm:justify-between',
        rise,
      )}
      style={at(1700)}
    >
      <span className="text-[0.8125rem]">
        <strong className="block font-semibold">
          Orden de compra sugerida
        </strong>
        <span className="text-inverse-muted-foreground">
          2 referencias bajo el mínimo · Autopartes Sur
        </span>
      </span>
      <SceneSwap
        delay={3400}
        before={
          <span className="bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">
            Enviar pedido
          </span>
        }
        after={
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-bright">
            <CircleCheck aria-hidden="true" className="size-4" />
            Pedido enviado
          </span>
        }
      />
    </div>
    <SceneCursor
      from={['40cqw', '120px']}
      to={['80cqw', '262px']}
      delay={2100}
    />
  </div>
);

const payrollTotal = samplePayroll.reduce(
  (total, person) => total + person.commission,
  0,
);
const maxCommission = Math.max(
  ...samplePayroll.map((person) => person.commission),
);

const PayrollModuleScene = () => (
  <div className="@container relative flex flex-col gap-4 p-5 sm:p-6">
    <div className="flex items-center justify-between gap-3">
      <SceneLabel>Quincena 1 · noviembre</SceneLabel>
      <SceneSwap
        delay={3600}
        before={<StatusChip status="pending" />}
        after={
          <span className="inline-flex items-center gap-1.5 bg-success/15 px-3.5 py-1 text-xs font-semibold text-success clip-bolt">
            <Check aria-hidden="true" className="size-3" />
            Aprobada
          </span>
        }
      />
    </div>
    <ul className="flex flex-col divide-y border-y">
      {samplePayroll.map((person, index) => (
        <li
          key={person.name}
          className={cn(
            'grid grid-cols-[auto_1fr_auto] items-center gap-3 py-3',
            rise,
          )}
          style={at(index * 220)}
        >
          <span className="grid h-9 w-10 place-items-center bg-inverse text-xs font-bold text-inverse-foreground clip-hex">
            {person.name
              .split(' ')
              .map((word) => word[0])
              .join('')}
          </span>
          <span className="flex min-w-0 flex-col gap-1.5">
            <span className="truncate text-[0.8125rem] font-semibold">
              {person.name}
              <span className="ml-2 font-mono text-[0.6875rem] font-normal text-muted-foreground">
                {person.orders} órdenes
              </span>
            </span>
            <span className="block h-1.5 bg-steel-pale">
              <span
                className="block h-full origin-left bg-primary motion-safe:animate-grow-x"
                style={{
                  width: `${(person.commission / maxCommission) * 100}%`,
                  ...at(600 + index * 220),
                }}
              />
            </span>
          </span>
          <span className="font-mono text-[0.8125rem] font-semibold tabular-nums">
            {formatCurrency(person.commission)}
          </span>
        </li>
      ))}
    </ul>
    <div
      className={cn('flex items-center justify-between gap-3', fade)}
      style={at(1600)}
    >
      <span className="text-[0.8125rem]">
        Comisiones de la quincena
        <strong className="ml-2 font-mono tabular-nums">
          {formatCurrency(payrollTotal)}
        </strong>
      </span>
      <span className="bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">
        Aprobar quincena
      </span>
    </div>
    <SceneCursor
      from={['30cqw', '80px']}
      to={['84cqw', '250px']}
      delay={2300}
    />
  </div>
);

const AssistantModuleScene = () => (
  <div className="@container relative flex flex-col gap-3 bg-background p-5 sm:p-6">
    <div
      className={cn(
        'max-w-[85%] self-start bg-card p-3 text-[0.8125rem] shadow-[inset_0_0_0_1px_var(--color-border)]',
        rise,
      )}
      style={at(0)}
    >
      {sampleAssistantChat[0].text}
    </div>
    <span
      aria-hidden="true"
      className="flex gap-1 self-end px-2 py-1 motion-safe:animate-swap-out motion-reduce:hidden"
      style={at(1600)}
    >
      {[0, 1, 2].map((dot) => (
        <span
          key={dot}
          className="size-1.5 bg-steel clip-hex motion-safe:animate-typing"
          style={at(dot * 160)}
        />
      ))}
    </span>
    <div
      className={cn(
        'max-w-[88%] self-end bg-inverse p-3 text-[0.8125rem] leading-relaxed text-inverse-foreground',
        rise,
      )}
      style={at(1700)}
    >
      <span className="mb-1 flex items-center gap-1.5 font-mono text-[0.6875rem] tracking-[0.06em] text-primary-bright uppercase">
        <Bot aria-hidden="true" className="size-3.5" />
        Asistente MecaFix · borrador
      </span>
      {sampleAssistantChat[1].text}
    </div>
    <div
      className={cn(
        'flex flex-wrap items-center justify-between gap-3 bg-primary-tint px-3 py-2.5 text-xs',
        fade,
      )}
      style={at(2400)}
    >
      <span className="text-primary">
        Basado en OT-03876 · elevador 3 · 75 % avance
      </span>
      <SceneSwap
        delay={4000}
        before={
          <span className="inline-flex items-center gap-1.5 bg-primary px-2.5 py-1 font-semibold text-primary-foreground">
            <Send aria-hidden="true" className="size-3" />
            Aprobar y enviar
          </span>
        }
        after={
          <span className="inline-flex items-center gap-1.5 font-semibold text-success">
            <CircleCheck aria-hidden="true" className="size-3.5" />
            Enviado
          </span>
        }
      />
    </div>
    <SceneCursor
      from={['20cqw', '60px']}
      to={['82cqw', '232px']}
      delay={2800}
    />
  </div>
);

const maxMargin = Math.max(...sampleMarginByService.map((row) => row.margin));

const ReportsModuleScene = () => (
  <div className="flex flex-col gap-4 p-5 sm:p-6">
    <div className="grid grid-cols-3 gap-2">
      {[
        { label: 'Órdenes', value: '128' },
        { label: 'Ticket prom.', value: formatCurrency(377000) },
        { label: 'Margen', value: '38 %' },
      ].map((kpi, index) => (
        <div
          key={kpi.label}
          className={cn('flex flex-col gap-1 bg-secondary p-3', rise)}
          style={at(index * 150)}
        >
          <SceneLabel>{kpi.label}</SceneLabel>
          <span className="font-heading text-lg font-extrabold tabular-nums">
            {kpi.value}
          </span>
        </div>
      ))}
    </div>
    <div className="flex flex-col gap-2">
      <SceneLabel>Margen por servicio</SceneLabel>
      <div className="flex h-36 items-end gap-3 border-b border-foreground pt-2">
        {sampleMarginByService.map((row, index) => (
          <div
            key={row.service}
            className="flex h-full flex-1 flex-col justify-end gap-1"
          >
            <span
              className={cn(
                'text-center font-mono text-[0.6875rem] tabular-nums',
                fade,
              )}
              style={at(1100 + index * 150)}
            >
              {row.margin} %
            </span>
            <span
              className={cn(
                'block origin-bottom motion-safe:animate-grow-y',
                index === 0 ? 'bg-primary' : 'bg-steel',
              )}
              style={{
                height: `${(row.margin / maxMargin) * 80}%`,
                ...at(600 + index * 150),
              }}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        {sampleMarginByService.map((row) => (
          <span
            key={row.service}
            className="flex-1 truncate text-center text-[0.6875rem] text-muted-foreground"
          >
            {row.service}
          </span>
        ))}
      </div>
    </div>
    <div
      className={cn(
        'flex items-start gap-3 border-l-4 border-primary bg-primary-tint p-3 text-[0.8125rem]',
        rise,
      )}
      style={at(2100)}
    >
      <Lightbulb
        aria-hidden="true"
        className="mt-0.5 size-4 shrink-0 text-primary"
      />
      <span>
        <strong className="font-semibold">Recomendación:</strong> 12 clientes
        cumplen 6 meses desde su último mantenimiento. Envíales un recordatorio.
      </span>
    </div>
  </div>
);

export const moduleScenes: Record<ModuleSlug, () => React.ReactElement> = {
  ordenes: OrdersModuleScene,
  inventario: InventoryModuleScene,
  facturacion: DeliveryScene,
  nomina: PayrollModuleScene,
  'asistente-ia': AssistantModuleScene,
  reportes: ReportsModuleScene,
};
