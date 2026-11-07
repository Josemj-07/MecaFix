import { Container } from '@/components/layouts';
import { CtaButton } from '@/components/ui/cta-button';
import { Reveal } from '@/components/ui/reveal';
import { Heading, Text } from '@/components/ui/typography';
import { landingSections, siteConfig } from '@/config/site';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/utils/cn';

import { SectionHeading } from './section-heading';

type Step = {
  title: string;
  description: string;
  tag: string;
};

// A real sequence, so the steps are numbered.
const steps: Step[] = [
  {
    title: 'Agendas tu demo',
    description:
      'Te mostramos el sistema con ejemplos de un taller como el tuyo y resolvemos tus dudas.',
    tag: 'Gratis',
  },
  {
    title: 'Migramos tu información',
    description:
      'Cargamos clientes, vehículos y repuestos desde tus archivos de Excel o las fotos del cuaderno.',
    tag: 'Lo hacemos nosotros',
  },
  {
    title: 'Capacitamos a tu equipo',
    description:
      'Asesores, mecánicos y administración aprenden la parte del sistema que les toca.',
    tag: 'Por roles',
  },
  {
    title: 'Operas con soporte 24/7',
    description:
      'Recibes el primer carro en MecaFix y una persona del equipo te acompaña cuando lo necesites.',
    tag: 'Atención humana',
  },
];

// How to get started, drawn on a measuring ruler that fills up step by
// step when the section scrolls into view.
export const OnboardingSteps = () => {
  const [rulerRef, inView] = useInView<HTMLOListElement>();

  return (
    <section
      id={landingSections.howToStart}
      aria-labelledby="start-title"
      className="py-20 sm:py-24 lg:py-28"
    >
      <Container className="flex flex-col gap-12 lg:gap-16">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="start-title"
            eyebrow="Cómo empezar"
            title="Así pasas del cuaderno a MecaFix"
            description="Tú sigues atendiendo carros mientras nosotros hacemos la parte pesada de la implementación."
          />
          <Reveal delay={120}>
            <CtaButton asChild>
              <a href={siteConfig.primaryCta.href}>
                {siteConfig.primaryCta.label}
              </a>
            </CtaButton>
          </Reveal>
        </div>

        <ol
          ref={rulerRef}
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0"
        >
          {steps.map((step, index) => (
            <li key={step.title} className="flex flex-col gap-4 lg:pr-8">
              <div className="relative h-6 border-t-2 border-foreground bg-ruler">
                <span
                  aria-hidden="true"
                  className="absolute -top-0.5 left-0 h-[18px] w-0.5 bg-primary"
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute -top-0.5 left-0 h-0.5 bg-primary motion-safe:transition-[width] motion-safe:duration-700 motion-safe:ease-brand',
                    inView ? 'w-full' : 'w-0',
                  )}
                  style={{ transitionDelay: `${index * 260}ms` }}
                />
              </div>
              <Reveal delay={index * 120} className="flex flex-col gap-3">
                <span className="font-mono text-sm font-semibold text-primary">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <Heading level="h3" className="text-xl">
                  {step.title}
                </Heading>
                <Text
                  variant="muted"
                  className="text-[0.9375rem] leading-relaxed"
                >
                  {step.description}
                </Text>
                <span className="self-start bg-secondary px-2.5 py-1 font-mono text-[0.6875rem] tracking-[0.06em] text-muted-foreground uppercase">
                  {step.tag}
                </span>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
};
