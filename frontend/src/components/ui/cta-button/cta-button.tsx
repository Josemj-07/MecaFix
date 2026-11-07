import { Slot, Slottable } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { ArrowRight } from 'lucide-react';
import type * as React from 'react';

import { cn } from '@/utils/cn';

// Marketing call to action. A parallelogram at the slope of the logo X with
// an arrow block that grows on hover and a sheen that crosses at the same
// angle. The shape is painted by pseudo-elements, so the element itself is
// not clipped and its focus outline stays visible.
//
// <CtaButton asChild><a href="#demo">Prueba una demo gratis</a></CtaButton>
const ctaButtonVariants = cva(
  [
    'group/cta relative isolate inline-flex shrink-0 items-stretch overflow-hidden font-sans font-semibold whitespace-nowrap uppercase outline-none select-none',
    'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring',
    'disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50',
    // Body of the parallelogram (border color for outline tones).
    'before:absolute before:inset-0 before:-z-20 before:bg-(--cta-bg) before:transition-colors before:clip-slant hover:before:bg-(--cta-bg-hover)',
    // Sheen crossing at 76°.
    'after:pointer-events-none after:absolute after:inset-y-0 after:-left-1/2 after:-z-[5] after:w-1/3 after:-skew-x-[14deg] after:bg-primary-foreground/20 after:opacity-0 hover:after:left-[120%] hover:after:opacity-100 motion-safe:after:transition-[left,opacity] motion-safe:after:duration-500',
    'text-(--cta-fg) transition-colors',
  ],
  {
    variants: {
      tone: {
        primary:
          '[--cta-bg-hover:var(--color-primary-hover)] [--cta-bg:var(--color-primary)] [--cta-fg:var(--color-primary-foreground)] [--cta-tip:var(--color-primary-hover)]',
        dark: '[--cta-bg-hover:var(--color-inverse-border)] [--cta-bg:var(--color-inverse)] [--cta-fg:var(--color-inverse-foreground)] [--cta-tip:var(--color-primary)]',
        light:
          '[--cta-bg-hover:var(--color-secondary)] [--cta-bg:var(--color-card)] [--cta-fg:var(--color-foreground)] [--cta-tip:var(--color-primary)]',
        outline:
          '[--cta-bg-hover:var(--color-foreground)] [--cta-bg:var(--color-foreground)] [--cta-fg:var(--color-foreground)] [--cta-fill:var(--color-background)] [--cta-tip:var(--color-primary)] hover:[--cta-fg:var(--color-background)] hover:[--cta-fill:var(--color-foreground)]',
        'outline-inverse':
          '[--cta-bg-hover:var(--color-inverse-foreground)] [--cta-bg:var(--color-inverse-foreground)] [--cta-fg:var(--color-inverse-foreground)] [--cta-fill:var(--color-night)] [--cta-tip:var(--color-primary)] hover:[--cta-fg:var(--color-night)] hover:[--cta-fill:var(--color-inverse-foreground)]',
      },
      size: {
        sm: 'h-10 text-xs tracking-[0.06em] [--slant:9px]',
        md: 'h-12 text-sm tracking-[0.06em] [--slant:11px]',
        lg: 'h-14 text-[0.9375rem] tracking-[0.05em] [--slant:14px]',
      },
    },
    defaultVariants: { tone: 'primary', size: 'md' },
  },
);

const labelPadding = {
  sm: 'pr-4 pl-5',
  md: 'pr-5 pl-6',
  lg: 'pr-7 pl-8',
} as const;

const arrowWidth = {
  sm: 'w-10 group-hover/cta:w-12',
  md: 'w-12 group-hover/cta:w-14',
  lg: 'w-14 group-hover/cta:w-16',
} as const;

export type CtaButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof ctaButtonVariants> & {
    asChild?: boolean;
    // Outline tones read better without the arrow block.
    arrow?: boolean;
  };

export const CtaButton = ({
  className,
  tone,
  size,
  asChild = false,
  arrow,
  children,
  ...props
}: CtaButtonProps) => {
  const Comp = asChild ? Slot : 'button';
  const resolvedSize = size ?? 'md';
  const isOutline = tone === 'outline' || tone === 'outline-inverse';
  const showArrow = arrow ?? !isOutline;

  return (
    <Comp
      className={cn(
        ctaButtonVariants({ tone, size }),
        'items-center',
        labelPadding[resolvedSize],
        showArrow && 'pr-0',
        className,
      )}
      {...props}
    >
      {isOutline && (
        <span
          aria-hidden="true"
          className="absolute inset-[1.5px] -z-10 bg-(--cta-fill) transition-colors clip-slant"
        />
      )}
      <Slottable>{children}</Slottable>
      {showArrow && (
        <span
          aria-hidden="true"
          className={cn(
            'ml-4 grid h-full place-items-center self-stretch bg-(--cta-tip) text-primary-foreground clip-slant motion-safe:transition-[width] motion-safe:duration-300 motion-safe:ease-brand',
            arrowWidth[resolvedSize],
          )}
        >
          <ArrowRight className="size-4 group-hover/cta:translate-x-0.5 motion-safe:transition-transform motion-safe:duration-300" />
        </span>
      )}
    </Comp>
  );
};

export { ctaButtonVariants };
