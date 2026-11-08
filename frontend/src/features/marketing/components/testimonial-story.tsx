import { ArrowRight } from 'lucide-react';

import { Facet } from '@/components/ui/facet';
import { cn } from '@/utils/cn';

import { at } from '../utils/scene-timing';
import { type Testimonial } from '../utils/testimonials';

const pad = (value: number) => String(value).padStart(2, '0');

const label =
  'font-mono text-[0.6875rem] font-semibold tracking-[0.08em] uppercase';

// One workshop's story: its portrait and a work sheet with the quote and
// the task that changed. The "before" value is struck through in red, like
// a line in the notebook the workshop left behind, and the MecaFix value
// lands after it.
//
// On a phone it is a single card that fits one screen: the photo on top,
// carrying the name, and the sheet right under it. From lg up the photo and
// the sheet stand side by side.
export const TestimonialStory = ({
  testimonial,
  position,
  total,
}: {
  testimonial: Testimonial;
  position: number;
  total: number;
}) => {
  const { result } = testimonial;

  return (
    <div className="flex h-full flex-col lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
      <div className="relative lg:mx-4">
        {/* Registration marks just outside the photo. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-4 crop-marks [--mark-color:var(--color-inverse-muted-foreground)] max-lg:hidden"
        />
        <div className="relative overflow-hidden bg-inverse motion-safe:animate-rise">
          <img
            src={testimonial.photo}
            alt={testimonial.photoAlt}
            width={800}
            height={1000}
            loading="lazy"
            decoding="async"
            className="aspect-[2/1] w-full object-cover object-[50%_22%] sm:aspect-[2/1] lg:aspect-[4/5] lg:object-[50%_25%]"
          />
          <Facet size="md" animated style={at(300)} className="lg:size-36" />
          {testimonial.isExample && (
            <span
              className={cn(
                'absolute top-3 left-3 bg-night/85 px-2 py-0.5 font-normal text-night-foreground lg:hidden',
                label,
              )}
            >
              Ejemplo
            </span>
          )}
          {/* Phone: who is talking, on the photo. Desktop: the city. */}
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-0 flex flex-col gap-0.5 bg-night px-4 py-2.5 text-night-foreground lg:hidden"
          >
            <span className="text-sm font-semibold">{testimonial.name}</span>
            <span className={cn('text-inverse-muted-foreground', label)}>
              {testimonial.role} · {testimonial.city}
            </span>
          </span>
          <span
            className={cn(
              'absolute bottom-0 left-0 bg-night px-4 py-2.5 text-night-foreground max-lg:hidden',
              label,
            )}
          >
            {testimonial.city}
            <span className="text-primary-bright"> · Colombia</span>
          </span>
        </div>
      </div>

      <figure
        className="relative flex flex-1 flex-col bg-card text-card-foreground motion-safe:animate-rise-sm"
        style={at(120)}
      >
        {/* Ruler along the top edge of the sheet. */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-3.5 border-t-2 border-foreground bg-ruler"
        />
        <div className="flex flex-1 flex-col gap-4 px-5 pt-7 pb-5 sm:gap-6 sm:px-8 sm:pt-10 sm:pb-8 lg:gap-8 lg:px-12 lg:pt-14 lg:pb-10">
          <div
            className={cn(
              'flex items-center justify-between gap-4 text-muted-foreground max-lg:hidden',
              label,
            )}
          >
            <span>
              Testimonio {pad(position)} / {pad(total)}
            </span>
            {testimonial.isExample && (
              <span className="bg-steel-pale px-2 py-0.5 font-normal">
                Ejemplo
              </span>
            )}
          </div>

          <blockquote className="flex flex-col gap-2 lg:gap-3">
            <span
              aria-hidden="true"
              className="font-heading text-5xl leading-[0.5] font-extrabold text-primary lg:text-7xl"
            >
              “
            </span>
            <p className="text-[1.0625rem] leading-snug font-medium tracking-tight text-pretty sm:text-xl lg:text-[1.75rem] lg:leading-[1.3]">
              {testimonial.quote}
            </p>
          </blockquote>

          <div className="mt-auto flex flex-col gap-2 lg:gap-3">
            <p className={cn('text-muted-foreground', label)}>{result.task}</p>
            <dl className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
              <div className="flex flex-col gap-1 bg-secondary px-3 py-2.5 sm:px-5 sm:py-4">
                <dt className={cn('text-muted-foreground', label)}>
                  Con cuaderno
                </dt>
                <dd className="font-heading text-base font-extrabold text-muted-foreground sm:text-xl lg:text-2xl">
                  {/* Struck through in red line by line, like a crossed-out
                      entry in the notebook. */}
                  <span
                    className="bg-[linear-gradient(var(--color-primary),var(--color-primary))] [box-decoration-break:clone] bg-[length:100%_2px] bg-[position:0_55%] bg-no-repeat [-webkit-box-decoration-break:clone] motion-safe:animate-strike"
                    style={at(700)}
                  >
                    {result.before}
                  </span>
                </dd>
              </div>
              <span
                aria-hidden="true"
                className="relative z-10 -mx-2 grid w-9 place-items-center bg-primary text-primary-foreground [--slant:8px] clip-slant sm:w-11"
              >
                <ArrowRight className="size-4" />
              </span>
              <div className="flex flex-col gap-1 bg-primary-tint px-3 py-2.5 sm:px-5 sm:py-4">
                <dt className={cn('text-primary', label)}>Con MecaFix</dt>
                <dd
                  className="self-start font-heading text-base font-extrabold text-primary motion-safe:animate-pop sm:text-xl lg:text-2xl"
                  style={at(1100)}
                >
                  {result.after}
                </dd>
              </div>
            </dl>
          </div>

          <figcaption className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-dashed pt-5 max-lg:sr-only">
            <span className="font-semibold">
              {testimonial.name} · {testimonial.role}
            </span>
            <span className="text-sm text-muted-foreground">
              {testimonial.workshop} · {testimonial.city}
            </span>
          </figcaption>
        </div>
      </figure>
    </div>
  );
};
