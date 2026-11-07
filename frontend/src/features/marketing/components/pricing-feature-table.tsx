import { Check, Minus } from 'lucide-react';
import { Fragment } from 'react';

import { Container } from '@/components/layouts';
import { Reveal } from '@/components/ui/reveal';
import { cn } from '@/utils/cn';

import { type FeatureValue, featureGroups, plans } from '../utils/pricing';

import { SectionHeading } from './section-heading';

const FeatureCell = ({ value }: { value: FeatureValue }) => {
  if (value === true) {
    return (
      <span className="inline-flex items-center gap-2">
        <span className="grid h-6 w-7 place-items-center bg-primary text-primary-foreground clip-hex">
          <Check aria-hidden="true" className="size-3.5" />
        </span>
        <span className="sr-only">Incluido</span>
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center gap-2 text-muted-foreground">
        <Minus aria-hidden="true" className="size-4" />
        <span className="sr-only">No incluido</span>
      </span>
    );
  }
  return <span className="text-sm font-medium">{value}</span>;
};

// Plan by plan comparison of every module.
export const PricingFeatureTable = () => (
  <section
    aria-labelledby="features-title"
    className="bg-secondary py-20 sm:py-24"
  >
    <Container className="flex flex-col gap-10">
      <SectionHeading
        id="features-title"
        eyebrow="Compara los planes"
        title="Qué incluye cada plan"
      />
      <Reveal className="overflow-x-auto bg-card shadow-[inset_0_0_0_1px_var(--color-border)]">
        <table className="w-full min-w-[40rem] border-collapse text-left">
          <caption className="sr-only">
            Módulos incluidos en cada plan de MecaFix
          </caption>
          <thead>
            <tr className="border-b-2 border-foreground">
              <th scope="col" className="w-2/5 p-5">
                <span className="font-mono text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase">
                  Módulo
                </span>
              </th>
              {plans.map((plan) => (
                <th
                  key={plan.id}
                  scope="col"
                  className={cn(
                    'p-5 font-heading text-lg font-extrabold',
                    plan.recommended && 'bg-primary-tint text-primary',
                  )}
                >
                  {plan.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {featureGroups.map((group) => (
              <Fragment key={group.title}>
                <tr className="bg-secondary">
                  <th
                    scope="colgroup"
                    colSpan={plans.length + 1}
                    className="px-5 py-3 font-mono text-xs font-semibold tracking-[0.08em] text-foreground uppercase"
                  >
                    {group.title}
                  </th>
                </tr>
                {group.rows.map((row) => (
                  <tr
                    key={row.label}
                    className="border-t transition-colors hover:bg-background"
                  >
                    <th
                      scope="row"
                      className="px-5 py-4 text-[0.9375rem] font-medium"
                    >
                      {row.label}
                    </th>
                    {plans.map((plan) => (
                      <td
                        key={plan.id}
                        className={cn(
                          'px-5 py-4',
                          plan.recommended && 'bg-primary-tint/40',
                        )}
                      >
                        <FeatureCell value={row.values[plan.id]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </Reveal>
    </Container>
  </section>
);
