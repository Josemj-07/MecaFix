import { Check, X } from 'lucide-react';

import { Container } from '@/components/layouts';
import { Facet } from '@/components/ui/facet';
import { Logo } from '@/components/ui/logo';
import { Reveal } from '@/components/ui/reveal';
import { Heading, Text } from '@/components/ui/typography';
import { cn } from '@/utils/cn';

type Contrast = {
  today: { title: string; detail: string };
  withMecafix: { title: string; detail: string };
};

// Three leaks every workshop owner recognizes, and how MecaFix closes them.
const contrasts: Contrast[] = [
  {
    today: {
      title: 'El filtro se instaló, pero no se cobró',
      detail: 'La orden en papel no se actualizó a tiempo.',
    },
    withMecafix: {
      title: 'Cada repuesto queda en la orden y en la factura',
      detail: 'Se agrega una vez y sale de bodega solo.',
    },
  },
  {
    today: {
      title: 'Una tarde a la semana pasando datos',
      detail: 'Facturas, quincena y caja, copiados a mano.',
    },
    withMecafix: {
      title: 'Facturas y quincena salen de las órdenes',
      detail: 'Nadie vuelve a digitar lo que ya está registrado.',
    },
  },
  {
    today: {
      title: 'El cliente se fue y no volvió',
      detail: 'Nadie le recordó su próximo mantenimiento.',
    },
    withMecafix: {
      title: 'El cliente recibe su recordatorio por WhatsApp',
      detail: 'Por fecha o kilometraje, sin que nadie llame.',
    },
  },
];

const ContrastPanel = ({ side }: { side: 'today' | 'withMecafix' }) => {
  const isToday = side === 'today';
  const Icon = isToday ? X : Check;

  return (
    <div
      className={cn(
        'relative flex h-full flex-col overflow-hidden p-6 sm:p-8',
        isToday
          ? 'bg-secondary text-muted-foreground'
          : 'bg-inverse text-inverse-muted-foreground',
      )}
    >
      {!isToday && <Facet size="md" animated />}
      <h3
        className={cn(
          'border-b pb-5 font-heading text-2xl font-extrabold sm:text-3xl',
          isToday
            ? 'border-border text-foreground'
            : 'border-inverse-border text-inverse-foreground',
        )}
      >
        {isToday ? (
          'Con cuaderno y Excel'
        ) : (
          <span className="flex items-center gap-3">
            Con
            <Logo variant="inverse" alt="MecaFix" className="h-9 sm:h-11" />
          </span>
        )}
      </h3>
      <ul className="flex flex-col">
        {contrasts.map((item) => {
          const row = item[side];
          return (
            <li
              key={row.title}
              className={cn(
                'grid grid-cols-[2rem_1fr] gap-3 border-b border-dashed py-5 last:border-b-0',
                isToday ? 'border-border' : 'border-inverse-border',
              )}
            >
              <span
                className={cn(
                  'mt-0.5 grid h-7 w-8 place-items-center clip-hex',
                  isToday
                    ? 'bg-steel-pale text-muted-foreground'
                    : 'bg-primary text-primary-foreground',
                )}
              >
                <Icon aria-hidden="true" className="size-4" />
              </span>
              <span className="flex flex-col gap-1">
                <span
                  className={cn(
                    'text-lg font-semibold',
                    isToday ? 'text-foreground' : 'text-inverse-foreground',
                  )}
                >
                  {row.title}
                </span>
                <span className="text-[0.9375rem]">{row.detail}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

// Right after the hero (and visible without scrolling on desktop): the
// reframe of the problem and the before/after of the workshop.
export const ValueSection = () => (
  <section
    aria-labelledby="value-title"
    className="pt-10 pb-6 sm:pt-12 sm:pb-8"
  >
    <Container className="flex flex-col gap-10 lg:gap-12">
      <div
        className="grid gap-5 motion-safe:animate-rise lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-14"
        style={{ animationDelay: '450ms' }}
      >
        <Heading
          id="value-title"
          level="display"
          as="h2"
          className="lg:text-[3.5rem]"
        >
          Cobra todo lo que tu taller{' '}
          <span className="text-primary">ya trabaja.</span>
        </Heading>
        <Text className="text-lg leading-relaxed text-muted-foreground">
          Repuestos que se instalan y no se anotan, horas de papeleo y clientes
          que no vuelven. MecaFix cierra esas tres fugas.
        </Text>
      </div>

      <div className="grid lg:grid-cols-2">
        <Reveal className="h-full">
          <ContrastPanel side="today" />
        </Reveal>
        <Reveal delay={120} className="h-full">
          <ContrastPanel side="withMecafix" />
        </Reveal>
      </div>
    </Container>
  </section>
);
