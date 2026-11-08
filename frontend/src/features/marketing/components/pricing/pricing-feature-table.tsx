import { Check, Minus } from 'lucide-react';
import { Fragment } from 'react';

import { Container } from '@/components/layouts';
import { Reveal } from '@/components/ui/reveal';
import {
  type FeatureValue,
  featureGroups,
  plans,
} from '@/features/marketing/utils/pricing';
import { cn } from '@/utils/cn';

import { SectionHeading } from '../section-heading';

const FeatureCell = ({ value }: { value: FeatureValue }) => {
  if (value === true) {
    return (
      <span className="inline-flex items-center gap-2">
        <span className="grid h-5 w-6 place-items-center bg-primary text-primary-foreground clip-hex sm:h-6 sm:w-7">
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
  return <span className="text-xs font-medium sm:text-sm">{value}</span>;
};

const planCell = 'px-1.5 py-3 text-center sm:px-5 sm:py-4 sm:text-left';

// Plan by plan comparison of every module. On a phone the three plans stay
// on screen side by side: narrow columns, short cells, no sideways scroll.
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
      <Reveal className="bg-card shadow-[inset_0_0_0_1px_var(--color-border)]">
        <table className="w-full table-fixed border-collapse text-left sm:table-auto">
          <caption className="sr-only">
            Módulos incluidos en cada plan de MecaFix
          </caption>
          <thead>
            <tr className="border-b-2 border-foreground">
              <th scope="col" className="px-3 py-3 sm:w-2/5 sm:p-5">
                <span className="font-mono text-[0.6875rem] font-semibold tracking-[0.08em] text-muted-foreground uppercase sm:text-xs">
                  Módulo
                </span>
              </th>
              {plans.map((plan) => (
                <th
                  key={plan.id}
                  scope="col"
                  className={cn(
                    'w-[4.75rem] px-1.5 py-3 text-center align-bottom font-heading text-xs leading-tight font-extrabold sm:w-auto sm:p-5 sm:text-left sm:text-lg',
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
                    className="px-3 py-3 font-mono text-[0.6875rem] font-semibold tracking-[0.08em] text-foreground uppercase sm:px-5 sm:text-xs"
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
                      className="px-3 py-3 text-sm font-medium sm:px-5 sm:py-4 sm:text-[0.9375rem]"
                    >
                      {row.label}
                    </th>
                    {plans.map((plan) => (
                      <td
                        key={plan.id}
                        className={cn(
                          planCell,
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
