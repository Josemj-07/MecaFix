import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';

import { cn } from '@/utils/cn';

// The facets of the logo M as a corner ornament: three triangles in the
// brand reds. Place it in the top-right corner of a relatively positioned,
// overflow-hidden surface. With `interactive`, the facets swap shades and
// grow when the closest `group` is hovered.
const facetVariants = cva(
  'pointer-events-none absolute top-0 right-0 origin-top-right',
  {
    variants: {
      tone: {
        // On light or carbon surfaces.
        primary:
          '[--f1:var(--color-primary-soft)] [--f2:var(--color-primary)] [--f3:var(--color-primary-hover)]',
        // On a red surface.
        onPrimary:
          '[--f1:var(--color-primary-hover)] [--f2:var(--color-primary-soft)] [--f3:var(--color-primary-hover)]',
        // Quiet version for white cards; turns red with `interactive`.
        steel:
          '[--f1:var(--color-steel-pale)] [--f2:var(--color-steel-light)] [--f3:var(--color-grid)]',
      },
      size: {
        sm: 'size-14',
        md: 'size-24',
        lg: 'size-36',
      },
    },
    defaultVariants: { tone: 'primary', size: 'md' },
  },
);

export type FacetProps = React.ComponentProps<'svg'> &
  VariantProps<typeof facetVariants> & {
    interactive?: boolean;
    // Play the assembly animation on mount.
    animated?: boolean;
  };

export const Facet = ({
  tone,
  size,
  interactive = false,
  animated = false,
  className,
  ...props
}: FacetProps) => (
  <svg
    viewBox="0 0 100 100"
    aria-hidden="true"
    focusable="false"
    className={cn(
      facetVariants({ tone, size }),
      interactive &&
        'group-hover:scale-125 motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-brand',
      interactive &&
        tone === 'steel' &&
        'group-hover:[--f1:var(--color-primary-soft)] group-hover:[--f2:var(--color-primary)] group-hover:[--f3:var(--color-primary-hover)]',
      interactive &&
        tone !== 'steel' &&
        'group-hover:[--f1:var(--color-primary)] group-hover:[--f2:var(--color-primary-soft)]',
      animated && 'motion-safe:animate-facet',
      className,
    )}
    {...props}
  >
    <polygon
      points="20,0 100,0 72,26"
      className="fill-(--f1) transition-[fill] duration-300"
    />
    <polygon
      points="100,0 100,80 72,26"
      className="fill-(--f2) transition-[fill] duration-300"
    />
    <polygon
      points="20,0 72,26 100,80"
      className="fill-(--f3) transition-[fill] duration-300"
    />
  </svg>
);
