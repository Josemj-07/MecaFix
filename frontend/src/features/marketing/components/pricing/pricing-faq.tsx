import { Container } from '@/components/layouts';
import { CtaButton } from '@/components/ui/cta-button';
import { Facet } from '@/components/ui/facet';
import { Reveal } from '@/components/ui/reveal';
import { Heading, Text } from '@/components/ui/typography';
import { siteConfig } from '@/config/site';
import { pricingFaq } from '@/features/marketing/utils/faq';

import { FaqList } from '../faq-list';
import { SectionHeading } from '../section-heading';

// Pricing questions and a last nudge towards the demo.
export const PricingFaq = () => (
  <section
    aria-labelledby="pricing-faq-title"
    className="py-20 sm:py-24 lg:py-28"
  >
    <Container className="grid gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16">
      <div className="flex flex-col gap-8 lg:sticky lg:top-32 lg:self-start">
        <SectionHeading
          id="pricing-faq-title"
          eyebrow="Preguntas sobre precios"
          title="Antes de escoger tu plan"
        />
        <Reveal
          delay={100}
          className="group relative flex flex-col gap-4 overflow-hidden bg-inverse p-6 text-inverse-foreground sm:p-7"
        >
          <Facet size="sm" interactive />
          <Heading
            level="h3"
            as="h3"
            className="pr-10 text-xl text-inverse-foreground"
          >
            ¿No sabes qué plan te sirve?
          </Heading>
          <Text variant="small" className="text-inverse-muted-foreground">
            En la demo revisamos cuántos elevadores y personas tienes y te
            recomendamos el plan.
          </Text>
          <CtaButton asChild className="self-start">
            <a href={siteConfig.primaryCta.href}>
              {siteConfig.primaryCta.label}
            </a>
          </CtaButton>
        </Reveal>
      </div>
      <Reveal delay={150}>
        <FaqList items={pricingFaq} />
      </Reveal>
    </Container>
  </section>
);
