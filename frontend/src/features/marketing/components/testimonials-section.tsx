import { ArrowLeft, ArrowRight } from 'lucide-react';
import * as React from 'react';

import { Container } from '@/components/layouts/container';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Facet } from '@/components/ui/facet';
import { Reveal } from '@/components/ui/reveal';
import { Heading, Text } from '@/components/ui/typography';
import { landingSections } from '@/config/site';
import { cn } from '@/utils/cn';

import { testimonials } from '../utils/testimonials';

import { PlayOnView } from './scene-kit';
import { TestimonialStory } from './testimonial-story';

const pad = (value: number) => String(value).padStart(2, '0');

const SlantIconButton = ({
  label,
  onClick,
  children,
  duplicate = false,
}: {
  label: string;
  onClick: () => void;
  duplicate?: boolean;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    aria-label={label}
    aria-hidden={duplicate || undefined}
    tabIndex={duplicate ? -1 : undefined}
    onClick={onClick}
    className="group/arrow relative isolate grid size-12 place-items-center text-primary-foreground outline-none before:absolute before:inset-0 before:-z-10 before:bg-primary before:transition-colors before:[--slant:9px] before:clip-slant hover:before:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring active:before:bg-primary-hover"
  >
    {children}
  </button>
);

const prefersReducedMotion = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

// Proof from the workshops as a carousel of stories. On a phone each story
// is one card that fits the screen and the next one peeks from the edge:
// swipe it in (native scroll snapping, so it follows the finger), or tap an
// avatar or the arrows below. From lg up a story fills the width.
export const TestimonialsSection = () => {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const frame = React.useRef(0);
  const [index, setIndex] = React.useState(0);
  const total = testimonials.length;

  // The slide whose center is closest to the center of the track.
  const syncIndex = () => {
    const track = trackRef.current;
    if (!track) return;
    const center = track.scrollLeft + track.clientWidth / 2;
    let nearest = 0;
    let best = Number.POSITIVE_INFINITY;
    Array.from(track.children).forEach((child, position) => {
      const slide = child as HTMLElement;
      const distance = Math.abs(
        slide.offsetLeft + slide.offsetWidth / 2 - center,
      );
      if (distance < best) {
        best = distance;
        nearest = position;
      }
    });
    setIndex(nearest);
  };

  const handleScroll = () => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(syncIndex);
  };

  React.useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const goTo = (target: number) => {
    const next = (target + total) % total;
    setIndex(next);
    const track = trackRef.current;
    const slide = track?.children[next] as HTMLElement | undefined;
    if (!track || !slide) return;
    track.scrollTo?.({
      left: slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  };

  return (
    <section
      id={landingSections.testimonials}
      aria-labelledby="testimonials-title"
      className="relative isolate overflow-hidden bg-night pt-14 pb-24 text-night-foreground sm:pt-20 sm:pb-32 lg:pt-28 lg:pb-40"
    >
      <Facet size="md" className="sm:size-36" />
      {/* Faceted wedge rising at the bottom, echo of the hero cuts. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 600 120"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 -z-10 h-14 w-full sm:h-24"
      >
        <polygon points="0,120 600,20 600,120" className="fill-primary" />
        <polygon
          points="260,120 600,20 600,120"
          className="fill-primary-hover"
        />
      </svg>

      <Container className="flex flex-col gap-5 sm:gap-10 lg:gap-14">
        <Reveal className="flex max-w-2xl flex-col gap-3 sm:gap-5">
          <Eyebrow tone="inverse">Testimonios</Eyebrow>
          <Heading
            id="testimonials-title"
            level="h2"
            className="text-inverse-foreground"
          >
            Talleres que ya dejaron el cuaderno
          </Heading>
          <Text
            variant="lead"
            className="text-inverse-muted-foreground max-sm:hidden"
          >
            Lo que cuentan los equipos que pasaron sus órdenes, su bodega y su
            nómina a MecaFix, y lo que cambió en su día a día.
          </Text>
        </Reveal>

        <div className="relative">
          <div className="absolute top-1/2 left-0 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
            <SlantIconButton
              duplicate
              label="Testimonio anterior"
              onClick={() => goTo(index - 1)}
            >
              <ArrowLeft aria-hidden="true" className="size-5" />
            </SlantIconButton>
          </div>
          <div className="absolute top-1/2 right-0 z-10 hidden translate-x-1/2 -translate-y-1/2 lg:block">
            <SlantIconButton
              duplicate
              label="Testimonio siguiente"
              onClick={() => goTo(index + 1)}
            >
              <ArrowRight aria-hidden="true" className="size-5" />
            </SlantIconButton>
          </div>
          <div
            ref={trackRef}
            onScroll={handleScroll}
            role="region"
            aria-roledescription="carrusel"
            aria-label="Historias de talleres"
            className="relative -mx-4 flex snap-x snap-mandatory [scrollbar-width:none] gap-3 overflow-x-auto overscroll-x-contain px-7 sm:-mx-6 sm:gap-4 sm:px-14 lg:mx-0 lg:gap-10 lg:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {testimonials.map((testimonial, position) => (
              <div
                key={testimonial.id}
                role="group"
                aria-roledescription="testimonio"
                aria-label={`${position + 1} de ${total}: ${testimonial.name}`}
                data-active={position === index}
                className="w-[calc(100vw-3.5rem)] shrink-0 snap-center transition-opacity duration-300 data-[active=false]:opacity-40 sm:w-[calc(100vw-7rem)] lg:w-full lg:data-[active=false]:opacity-100"
              >
                <PlayOnView className="h-full [&>div]:h-full">
                  <TestimonialStory
                    testimonial={testimonial}
                    position={position + 1}
                    total={total}
                  />
                </PlayOnView>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 lg:border-t lg:border-inverse-border lg:pt-6">
          <div className="flex gap-3 sm:gap-5 lg:gap-10">
            {testimonials.map((testimonial, position) => {
              const active = position === index;
              return (
                <button
                  key={testimonial.id}
                  type="button"
                  aria-label={`Ver testimonio de ${testimonial.name}`}
                  aria-current={active ? 'true' : undefined}
                  onClick={() => goTo(position)}
                  className="group/rail flex items-center gap-3 text-left outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                >
                  <span className="flex flex-col items-center gap-1.5">
                    <img
                      src={testimonial.photo}
                      alt=""
                      width={44}
                      height={48}
                      loading="lazy"
                      decoding="async"
                      className={cn(
                        'h-12 w-11 bg-inverse object-cover object-top clip-hex motion-safe:transition-[opacity,filter] motion-safe:duration-300',
                        !active &&
                          'opacity-55 grayscale group-hover/rail:opacity-90',
                      )}
                    />
                    <span
                      aria-hidden="true"
                      className={cn(
                        'h-1 w-7 origin-left -skew-x-[14deg] bg-primary motion-safe:transition-transform motion-safe:duration-300',
                        !active && 'scale-x-0',
                      )}
                    />
                  </span>
                  <span
                    className={cn(
                      'hidden flex-col lg:flex',
                      active
                        ? 'text-inverse-foreground'
                        : 'text-inverse-muted-foreground',
                    )}
                  >
                    <span className="text-sm font-semibold">
                      {testimonial.name}
                    </span>
                    <span className="font-mono text-[0.6875rem] tracking-[0.06em] uppercase">
                      {testimonial.workshop} · {testimonial.city}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex shrink-0 items-center gap-3 lg:[&>button]:hidden">
            <span
              aria-hidden="true"
              className="font-mono text-xs text-inverse-muted-foreground tabular-nums max-[22rem]:hidden"
            >
              {pad(index + 1)} / {pad(total)}
            </span>
            <SlantIconButton
              label="Testimonio anterior"
              onClick={() => goTo(index - 1)}
            >
              <ArrowLeft aria-hidden="true" className="size-5" />
            </SlantIconButton>
            <SlantIconButton
              label="Testimonio siguiente"
              onClick={() => goTo(index + 1)}
            >
              <ArrowRight aria-hidden="true" className="size-5" />
            </SlantIconButton>
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          Testimonio {index + 1} de {total}: {testimonials[index].name}
        </p>
      </Container>
    </section>
  );
};
