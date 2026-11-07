import { cn } from '@/utils/cn';

import { ANNUAL_MONTHS_CHARGED, type BillingCycle } from '../utils/pricing';

const options: { value: BillingCycle; label: string }[] = [
  { value: 'mensual', label: 'Mensual' },
  { value: 'anual', label: 'Anual' },
];

type BillingCycleToggleProps = {
  value: BillingCycle;
  onChange: (cycle: BillingCycle) => void;
};

// Two-option switch drawn as parallelograms (radio group semantics).
export const BillingCycleToggle = ({
  value,
  onChange,
}: BillingCycleToggleProps) => (
  <fieldset className="flex flex-wrap items-center gap-4">
    <legend className="sr-only">Ciclo de pago</legend>
    <div className="flex gap-1 bg-inverse-muted p-1">
      {options.map((option) => {
        const checked = option.value === value;
        return (
          <label
            key={option.value}
            className={cn(
              'relative isolate cursor-pointer px-6 py-2.5 text-sm font-semibold transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ring',
              'before:absolute before:inset-0 before:-z-10 before:transition-colors before:[--slant:8px] before:clip-slant',
              checked
                ? 'text-primary-foreground before:bg-primary'
                : 'text-inverse-muted-foreground before:bg-transparent hover:text-inverse-foreground',
            )}
          >
            <input
              type="radio"
              name="billing-cycle"
              value={option.value}
              checked={checked}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            {option.label}
          </label>
        );
      })}
    </div>
    <span className="font-mono text-xs font-semibold tracking-[0.06em] text-primary-bright uppercase">
      Anual: pagas {ANNUAL_MONTHS_CHARGED} meses y usas 12
    </span>
  </fieldset>
);
