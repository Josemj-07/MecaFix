import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';

import { cn } from '@/utils/cn';

// The typographic scale of the app. Use <Heading> and <Text> instead of
// styling raw h1/p tags so every screen shares the same hierarchy.

const headingVariants = cva(
  // Weight, tracking, case and width come from the design system tokens (theme.css).
  'font-heading leading-[1.05] [letter-spacing:var(--heading-tracking)] text-foreground [text-transform:var(--heading-case)]',
  {
    variants: {
      level: {
        // Landing hero only: one per page.
        hero: 'text-[2.375rem] leading-[1.02] [font-weight:var(--heading-weight)] sm:text-6xl lg:text-[4.25rem]',
        display:
          'text-4xl [font-weight:var(--heading-weight)] sm:text-5xl lg:text-6xl',
        h1: 'text-3xl [font-weight:var(--heading-weight)] sm:text-4xl',
        h2: 'text-[1.875rem] [font-weight:var(--heading-weight)] sm:text-4xl lg:text-[2.75rem]',
        h3: 'text-xl [font-weight:var(--subheading-weight)]',
        h4: 'text-lg [font-weight:var(--subheading-weight)]',
      },
    },
    defaultVariants: { level: 'h2' },
  },
);

const headingTags = {
  hero: 'h1',
  display: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
} as const;

export type HeadingProps = React.ComponentProps<'h2'> &
  VariantProps<typeof headingVariants> & {
    // Render a different tag than the visual level (e.g. h2 styled as h1).
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  };

export const Heading = ({ level, as, className, ...props }: HeadingProps) => {
  const Tag = as ?? headingTags[level ?? 'h2'];
  return (
    <Tag className={cn(headingVariants({ level }), className)} {...props} />
  );
};

const textVariants = cva('', {
  variants: {
    variant: {
      lead: 'text-lg leading-relaxed text-muted-foreground',
      body: 'text-base leading-7',
      small: 'text-sm leading-6',
      muted: 'text-sm text-muted-foreground',
      caption: 'text-xs text-muted-foreground',
      // Technical labels: eyebrows, order codes, table heads.
      label:
        'font-mono text-[0.8125rem] leading-5 font-semibold tracking-[0.06em] text-muted-foreground uppercase',
    },
  },
  defaultVariants: { variant: 'body' },
});

export type TextProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof textVariants> & {
    as?: 'p' | 'span' | 'div';
  };

export const Text = ({
  variant,
  as: Tag = 'p',
  className,
  ...props
}: TextProps) => {
  return (
    <Tag className={cn(textVariants({ variant }), className)} {...props} />
  );
};
