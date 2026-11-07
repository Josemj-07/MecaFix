import { ArrowRight } from 'lucide-react';

import { Container } from '@/components/layouts';
import { CtaButton } from '@/components/ui/cta-button';
import { Facet } from '@/components/ui/facet';
import { Link } from '@/components/ui/link';
import { Nut } from '@/components/ui/nut';
import { Reveal } from '@/components/ui/reveal';
import { Text } from '@/components/ui/typography';
import { paths } from '@/config/paths';
import { cn } from '@/utils/cn';

import { includedInAllPlans, plans } from '../utils/pricing';

import { SectionHeading } from './section-heading';

// Short version of the plans: who each one is for. Prices live on /precios.
export const PricingTeaser = () => (
  <section
    aria-labelledby="pricing-teaser-title"
    className="relative isolate overflow-hidden bg-inverse bg-hex-mesh py-20 text-inverse-foreground sm:py-24 lg:py-28"
  >
    <Container className="flex flex-col gap-12">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <SectionHeading
          id="pricing-teaser-title"
          tone="inverse"
          eyebrow="Precios"
          title="Planes en pesos, según el tamaño de tu taller"
          description="Escoges por número de elevadores o de sedes. Todos los planes incluyen lo mismo para empezar bien."
        />
        <Reveal delay={120}>
          <CtaButton asChild tone="light">
            <Link variant="unstyled" to={paths.pricing.getHref()}>
              Ver precios y planes
            </Link>
          </CtaButton>
        </Reveal>
      </div>

      <ul className="grid gap-4 md:grid-cols-3">
        {plans.map((plan, index) => (
          <li key={plan.id}>
            <Reveal delay={index * 100} className="h-full">
              <Link
                variant="unstyled"
                to={paths.pricing.getHref()}
                className={cn(
                  'group relative flex h-full flex-col gap-3 overflow-hidden p-6 outline-none hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-brand sm:p-7',
                  plan.recommended
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-inverse-muted text-inverse-foreground',
                )}
              >
                <Facet
                  size="sm"
                  interactive
                  tone={plan.recommended ? 'onPrimary' : 'primary'}
                />
                <span
                  className={cn(
                    'font-mono text-xs font-semibold tracking-[0.08em] uppercase',
                    plan.recommended
                      ? 'text-primary-foreground/80'
                      : 'text-inverse-muted-foreground',
                  )}
                >
                  {plan.audience}
                  {plan.recommended && ' · Recomendado'}
                </span>
                <span className="font-heading text-2xl font-extrabold">
                  {plan.name}
                </span>
                <Text
                  variant="small"
                  className={cn(
                    plan.recommended
                      ? 'text-primary-foreground/85'
                      : 'text-inverse-muted-foreground',
                  )}
                >
                  {plan.summary}
                </Text>
                <span className="mt-auto inline-flex items-center gap-2 pt-3 text-sm font-semibold">
                  Ver precio
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 group-hover:translate-x-1 motion-safe:transition-transform"
                  />
                </span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal>
        <ul className="flex flex-wrap gap-x-8 gap-y-3 border-t border-inverse-border pt-6 text-sm text-inverse-muted-foreground">
          {includedInAllPlans.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <Nut filled className="size-3.5 text-primary-bright" />
              {item}
            </li>
          ))}
        </ul>
      </Reveal>
    </Container>
  </section>
);
