import { Container } from '@/components/layouts';
import { CtaButton } from '@/components/ui/cta-button';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Facet } from '@/components/ui/facet';
import { Nut } from '@/components/ui/nut';
import { Reveal } from '@/components/ui/reveal';
import { Heading, Text } from '@/components/ui/typography';
import { siteConfig } from '@/config/site';
import { useBillingCycle } from '@/features/marketing/hooks/use-billing-cycle';
import {
  annualTotal,
  type BillingCycle,
  includedInAllPlans,
  monthlyAmount,
  type Plan,
  plans,
} from '@/features/marketing/utils/pricing';
import { cn } from '@/utils/cn';
import { formatCurrency } from '@/utils/format';

import { BillingCycleToggle } from './billing-cycle-toggle';

const PlanPrice = ({ plan, cycle }: { plan: Plan; cycle: BillingCycle }) => {
  const amount = monthlyAmount(plan, cycle);
  const yearly = annualTotal(plan);

  if (amount === null) {
    return (
      <div className="flex flex-col gap-1">
        <span className="font-heading text-4xl font-extrabold">A medida</span>
        <span className="text-sm opacity-80">Cotizamos según tus sedes</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <span className="flex items-baseline gap-2">
        <span className="font-heading text-4xl font-extrabold tabular-nums">
          {formatCurrency(amount)}
        </span>
        <span className="text-sm opacity-80">COP / mes</span>
      </span>
      <span className="text-sm opacity-80">
        {cycle === 'anual' && yearly !== null
          ? `${formatCurrency(yearly)} facturados una vez al año`
          : 'Facturado cada mes'}
      </span>
    </div>
  );
};

const PlanCard = ({ plan, cycle }: { plan: Plan; cycle: BillingCycle }) => (
  <article
    aria-labelledby={`plan-${plan.id}`}
    className={cn(
      'group relative flex h-full flex-col bg-card text-card-foreground hover:-translate-y-1 motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-brand',
      plan.recommended
        ? 'shadow-[0_0_0_2px_var(--color-primary)]'
        : 'shadow-[inset_0_0_0_1px_var(--color-border)]',
    )}
  >
    {/* Riveted header plate. */}
    <header
      className={cn(
        'relative flex shrink-0 flex-col gap-4 overflow-hidden border-b p-6 sm:p-7',
        plan.recommended
          ? 'border-primary bg-primary text-primary-foreground'
          : 'bg-secondary',
      )}
    >
      <span
        aria-hidden="true"
        className="absolute top-3 left-3 size-1.5 rounded-full bg-current opacity-35"
      />
      <span
        aria-hidden="true"
        className="absolute top-3 right-3 size-1.5 rounded-full bg-current opacity-35"
      />
      {plan.recommended && <Facet size="md" tone="onPrimary" animated />}
      <div className="flex flex-col gap-1">
        <span
          className={cn(
            'font-mono text-xs font-semibold tracking-[0.08em] uppercase',
            plan.recommended
              ? 'text-primary-foreground/85'
              : 'text-muted-foreground',
          )}
        >
          {plan.audience}
          {plan.recommended && ' · Recomendado'}
        </span>
        <h3
          id={`plan-${plan.id}`}
          className="font-heading text-2xl font-extrabold"
        >
          {plan.name}
        </h3>
      </div>
      <PlanPrice plan={plan} cycle={cycle} />
    </header>

    <div className="flex flex-1 flex-col gap-6 p-6 sm:p-7">
      <Text variant="muted">{plan.summary}</Text>
      <ul className="flex flex-col gap-3">
        {plan.highlights.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-[0.9375rem]">
            <Nut filled className="mt-1 size-3.5 text-primary" />
            {item}
          </li>
        ))}
      </ul>
      <CtaButton
        asChild
        tone={plan.recommended ? 'primary' : 'dark'}
        className="mt-auto justify-between"
      >
        <a href={siteConfig.primaryCta.href}>
          {plan.monthlyPrice === null
            ? 'Hablar con ventas'
            : siteConfig.primaryCta.label}
        </a>
      </CtaButton>
    </div>
  </article>
);

// Header of /precios with the billing cycle switch, then the three plans.
export const PricingPlans = () => {
  const { cycle, setCycle } = useBillingCycle();

  return (
    <section aria-labelledby="pricing-title">
      <div className="relative isolate overflow-hidden bg-night bg-hex-mesh text-night-foreground">
        <svg
          aria-hidden="true"
          viewBox="0 0 1000 400"
          preserveAspectRatio="none"
          className="pointer-events-none absolute top-0 left-0 -z-10 h-full w-full motion-safe:animate-wedge-top"
        >
          <polygon points="0,0 360,0 0,240" className="fill-primary" />
          <polygon points="0,0 220,0 0,140" className="fill-primary-hover" />
        </svg>
        <Container className="flex flex-col gap-6 pt-36 pb-28 sm:pt-44 lg:pb-32">
          <div className="motion-safe:animate-rise">
            <Eyebrow tone="inverse" animated>
              Precios
            </Eyebrow>
          </div>
          <Heading
            id="pricing-title"
            level="display"
            className="max-w-3xl text-night-foreground motion-safe:animate-rise"
            style={{ animationDelay: '110ms' }}
          >
            Planes para cada tamaño de taller
          </Heading>
          <Text
            variant="lead"
            className="max-w-[56ch] text-inverse-muted-foreground motion-safe:animate-rise"
            style={{ animationDelay: '220ms' }}
          >
            Precios en pesos colombianos. Todos los planes incluyen atención
            humana 24/7, migración de tus datos y capacitación para tu equipo.
          </Text>
          <div
            className="pt-2 motion-safe:animate-rise"
            style={{ animationDelay: '330ms' }}
          >
            <BillingCycleToggle value={cycle} onChange={setCycle} />
          </div>
        </Container>
      </div>

      <Container className="relative -mt-16 pb-16 lg:-mt-20">
        <ul className="grid gap-6 lg:grid-cols-3 lg:items-stretch lg:gap-5">
          {plans.map((plan, index) => (
            <li key={plan.id}>
              <Reveal delay={index * 100} className="h-full">
                <PlanCard plan={plan} cycle={cycle} />
              </Reveal>
            </li>
          ))}
        </ul>
        <ul className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
          {includedInAllPlans.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <Nut filled className="size-3.5 text-primary" />
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};
