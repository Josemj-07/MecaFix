import { Container } from '@/components/layouts';
import { Reveal } from '@/components/ui/reveal';
import { Text } from '@/components/ui/typography';
import { landingSections, siteConfig } from '@/config/site';
import { landingFaq } from '@/features/marketing/utils/faq';

import { FaqList } from '../faq-list';
import { SectionHeading } from '../section-heading';

export const FaqSection = () => (
  <section
    id={landingSections.faq}
    aria-labelledby="faq-title"
    className="py-20 sm:py-24 lg:py-28"
  >
    <Container className="grid gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16">
      <div className="flex flex-col gap-6 lg:sticky lg:top-32 lg:self-start">
        <SectionHeading
          id="faq-title"
          eyebrow="Preguntas frecuentes"
          title="Lo que nos preguntan antes de empezar"
        />
        <Reveal delay={100}>
          <Text className="text-muted-foreground">
            ¿Tienes otra pregunta?{' '}
            <a
              href={siteConfig.primaryCta.href}
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              Agenda tu demo
            </a>{' '}
            y la resolvemos con tu caso.
          </Text>
        </Reveal>
      </div>
      <Reveal delay={150}>
        <FaqList items={landingFaq} />
      </Reveal>
    </Container>
  </section>
);
