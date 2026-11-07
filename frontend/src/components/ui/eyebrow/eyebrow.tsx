import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';

import { cn } from '@/utils/cn';

import { Nut } from '../nut';

const eyebrowVariants = cva(
  'flex items-center gap-2.5 font-mono text-sm leading-5 font-semibold tracking-[0.06em] uppercase',
  {
    variants: {
      tone: {
        default: 'text-primary',
        inverse: 'text-primary-bright',
        onPrimary: 'text-primary-foreground',
      },
    },
    defaultVariants: { tone: 'default' },
  },
);

export type EyebrowProps = React.ComponentProps<'p'> &
  VariantProps<typeof eyebrowVariants> & {
    // Turn the nut once on mount ("tightening" it).
    animated?: boolean;
  };

// Label above a section heading, introduced by the hex nut of the logo.
export const Eyebrow = ({
  tone,
  animated,
  className,
  children,
  ...props
}: EyebrowProps) => (
  <p className={cn(eyebrowVariants({ tone }), className)} {...props}>
    <Nut
      filled
      className={cn('size-4', animated && 'motion-safe:animate-tighten')}
    />
    <span>{children}</span>
  </p>
);
