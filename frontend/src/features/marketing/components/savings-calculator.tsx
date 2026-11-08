import * as React from 'react';

import { Container } from '@/components/layouts';
import { CtaButton } from '@/components/ui/cta-button';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Facet } from '@/components/ui/facet';
import { Reveal } from '@/components/ui/reveal';
import { Heading, Text } from '@/components/ui/typography';
import { landingSections, siteConfig } from '@/config/site';
import { formatCurrency } from '@/utils/format';

import { useAnimatedNumber } from '../hooks/use-animated-number';
import { plans } from '../utils/pricing';
import {
  type SavingsInput,
  estimateYearlySavings,
  paybackDays,
  savingsAssumptions,
} from '../utils/savings';

type Slider = {
  key: keyof SavingsInput;
  label: string;
  min: number;
  max: number;
  step: number;
  format: (value: number) => string;
};

const sliders: Slider[] = [
  {
    key: 'carsPerMonth',
    label: 'Carros al mes',
    min: 20,
    max: 400,
    step: 10,
    format: (value) => `${value}`,
  },
  {
    key: 'averageTicket',
    label: 'Valor promedio por carro',
    min: 150000,
    max: 2000000,
    step: 25000,
    format: (value) => formatCurrency(value),
  },
  {
    key: 'paperworkHoursPerWeek',
    label: 'Horas de papeleo a la semana',
    min: 2,
    max: 40,
    step: 1,
    format: (value) => `${value} h`,
  },
];

const initialInput: SavingsInput = {
  carsPerMonth: 120,
  averageTicket: 450000,
  paperworkHoursPerWeek: 12,
};

// The plan the payback is measured against.
const referencePlan = plans.find((plan) => plan.recommended) ?? plans[0];
const yearlyCost = (referencePlan.monthlyPrice ?? 0) * 12;

const SliderField = ({
  slider,
  value,
  onChange,
}: {
  slider: Slider;
  value: number;
  onChange: (value: number) => void;
}) => {
  const id = React.useId();
  const fill = ((value - slider.min) / (slider.max - slider.min)) * 100;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-4">
        <label
          htmlFor={id}
          className="font-mono text-[0.8125rem] font-semibold tracking-[0.04em] text-muted-foreground uppercase"
        >
          {slider.label}
        </label>
        <span
          aria-hidden="true"
          className="font-mono text-base font-semibold tabular-nums"
        >
          {slider.format(value)}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={slider.min}
        max={slider.max}
        step={slider.step}
        value={value}
        aria-valuetext={slider.format(value)}
        onChange={(event) => onChange(Number(event.target.value))}
        className="range-nut"
        style={{ '--fill': `${fill}%` } as React.CSSProperties}
      />
    </div>
  );
};

// Interactive estimate: the owner moves his own numbers and sees how much
// money MecaFix can recover in a year and how fast it pays for itself.
export const SavingsCalculator = () => {
  const [input, setInput] = React.useState(initialInput);
  const estimate = estimateYearlySavings(input);
  const total = useAnimatedNumber(estimate.total);
  const days = paybackDays(estimate.total, yearlyCost);

  const lines = [
    {
      label: 'Repuestos y mano de obra que hoy no se cobran',
      value: estimate.uncharged,
    },
    {
      label: 'Horas de papeleo que vuelven a ser tuyas',
      value: estimate.paperwork,
    },
    { label: 'Margen de los clientes que vuelven', value: estimate.returning },
  ];

  return (
    <section
      id={landingSections.savings}
      aria-labelledby="savings-title"
      className="bg-secondary py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <Reveal className="grid bg-card shadow-[inset_0_0_0_1px_var(--color-border)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <form
            className="flex flex-col gap-7 p-5 sm:p-8 lg:p-10"
            onSubmit={(event) => event.preventDefault()}
          >
            <Eyebrow>Haz la cuenta de tu taller</Eyebrow>
            <Heading id="savings-title" level="h2" className="-mt-2">
              ¿Cuánta plata se le escapa a tu taller al año?
            </Heading>
            {sliders.map((slider) => (
              <SliderField
                key={slider.key}
                slider={slider}
                value={input[slider.key]}
                onChange={(value) =>
                  setInput((current) => ({ ...current, [slider.key]: value }))
                }
              />
            ))}
          </form>

          <div className="relative flex flex-col gap-6 overflow-hidden bg-night p-5 text-night-foreground sm:p-8 lg:p-10">
            <Facet size="md" />
            <span className="pr-12 font-heading text-xl font-extrabold text-inverse-foreground sm:pr-16">
              Lo que puedes recuperar al año
            </span>
            <span
              aria-live="polite"
              className="font-heading text-[clamp(1.75rem,8.5vw,2.75rem)] leading-none font-extrabold text-inverse-foreground tabular-nums sm:text-6xl"
            >
              {formatCurrency(total)}
            </span>
            <dl className="flex flex-col border-t border-inverse-border">
              {lines.map((line) => (
                <div
                  key={line.label}
                  className="flex justify-between gap-4 border-b border-dashed border-inverse-border py-3 text-[0.9375rem] text-inverse-muted-foreground"
                >
                  <dt>{line.label}</dt>
                  <dd className="font-mono font-semibold whitespace-nowrap text-inverse-foreground tabular-nums">
                    {formatCurrency(line.value)}
                  </dd>
                </div>
              ))}
            </dl>
            {days !== null && (
              <div className="flex flex-col gap-1 bg-primary p-4 text-primary-foreground sm:flex-row sm:items-center sm:gap-4">
                <span className="font-heading text-2xl font-extrabold whitespace-nowrap">
                  {days} días
                </span>
                <span className="text-[0.9375rem] leading-snug">
                  Con lo que recuperas en ese tiempo pagas un año de MecaFix:{' '}
                  {formatCurrency(yearlyCost)} en el plan {referencePlan.name}.
                </span>
              </div>
            )}
            <CtaButton asChild tone="light" className="self-start">
              <a href={siteConfig.primaryCta.href}>Revísalos en tu demo</a>
            </CtaButton>
            <details className="group/assume border-t border-inverse-border pt-4 text-sm text-inverse-muted-foreground">
              <summary className="cursor-pointer font-mono text-[0.8125rem] font-semibold tracking-[0.04em] text-inverse-foreground uppercase">
                Cómo calculamos
              </summary>
              <Text variant="small" as="div" className="mt-3">
                <ul className="flex list-disc flex-col gap-1 pl-5">
                  <li>
                    Cobros perdidos:{' '}
                    {Math.round(savingsAssumptions.unchargedRate * 100)} % de lo
                    facturado.
                  </li>
                  <li>
                    Papeleo: MecaFix ahorra el{' '}
                    {Math.round(savingsAssumptions.paperworkReduction * 100)} %
                    de esas horas, a{' '}
                    {formatCurrency(savingsAssumptions.hourValue)} la hora.
                  </li>
                  <li>
                    Clientes que vuelven:{' '}
                    {Math.round(savingsAssumptions.returningRate * 100)} % más
                    de carros al mes, con un margen del{' '}
                    {Math.round(savingsAssumptions.returningMargin * 100)} %.
                  </li>
                  <li>Es una estimación con supuestos conservadores.</li>
                </ul>
              </Text>
            </details>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};
