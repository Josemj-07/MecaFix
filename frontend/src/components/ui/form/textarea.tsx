import type * as React from 'react';
import { type UseFormRegisterReturn } from 'react-hook-form';

import { cn } from '@/utils/cn';

import {
  FieldWrapper,
  type FieldWrapperPassThroughProps,
} from './field-wrapper';
import { FieldPlate, fieldBaseClassName } from './input';

export type TextareaProps = React.ComponentProps<'textarea'> &
  FieldWrapperPassThroughProps & {
    registration: Partial<UseFormRegisterReturn>;
  };

export const Textarea = ({
  className,
  label,
  description,
  error,
  registration,
  ...props
}: TextareaProps) => {
  return (
    <FieldWrapper label={label} description={description} error={error}>
      {({ id, describedBy }) => (
        <FieldPlate>
          <textarea
            id={id}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            className={cn(fieldBaseClassName, 'min-h-24', className)}
            {...registration}
            {...props}
          />
        </FieldPlate>
      )}
    </FieldWrapper>
  );
};
