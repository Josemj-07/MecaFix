import type * as React from 'react';
import { type UseFormRegisterReturn } from 'react-hook-form';

import { cn } from '@/utils/cn';

import {
  FieldWrapper,
  type FieldWrapperPassThroughProps,
} from './field-wrapper';

// Fields are machined plates: chamfered corners and a hairline that follows
// the shape (drawn by <FieldPlate>). Focus and errors recolor the hairline.
export const fieldBaseClassName =
  'flex w-full bg-card px-3.5 py-2 text-[0.9375rem] clip-chamfer placeholder:text-steel focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50';

export const FieldPlate = ({ children }: { children: React.ReactNode }) => (
  <span className="block shape-outline transition-[filter] [--outline-color:var(--color-input)] focus-within:[--outline-color:var(--color-primary)] has-[[aria-invalid=true]]:[--outline-color:var(--color-destructive)]">
    {children}
  </span>
);

export type InputProps = React.ComponentProps<'input'> &
  FieldWrapperPassThroughProps & {
    registration: Partial<UseFormRegisterReturn>;
  };

export const Input = ({
  className,
  label,
  description,
  error,
  registration,
  ...props
}: InputProps) => {
  return (
    <FieldWrapper label={label} description={description} error={error}>
      {({ id, describedBy }) => (
        <FieldPlate>
          <input
            id={id}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            className={cn(
              fieldBaseClassName,
              'h-12 file:border-0 file:bg-transparent file:text-sm file:font-medium',
              className,
            )}
            {...registration}
            {...props}
          />
        </FieldPlate>
      )}
    </FieldWrapper>
  );
};
