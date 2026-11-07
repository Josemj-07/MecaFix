import type * as React from 'react';

import { cn } from '@/utils/cn';

import { type PreviewStatus, statusLabels } from '../utils/preview-data';

const statusClassName: Record<PreviewStatus, string> = {
  service: 'bg-primary-tint text-primary',
  done: 'bg-success/15 text-success',
  pending: 'bg-steel-pale text-muted-foreground',
  waiting: 'bg-warning/15 text-warning',
};

// Order status as a bolt-head chip (product UI language).
export const StatusChip = ({
  status,
  className,
}: {
  status: PreviewStatus;
  className?: string;
}) => (
  <span
    className={cn(
      'inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-semibold whitespace-nowrap clip-bolt',
      statusClassName[status],
      className,
    )}
  >
    <span aria-hidden="true" className="size-1.5 bg-current clip-hex" />
    {statusLabels[status]}
  </span>
);

// Colombian license plate.
export const PlateTag = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block w-fit border-[1.5px] border-plate-foreground bg-plate px-2 py-px font-mono text-xs font-semibold tracking-[0.08em] whitespace-nowrap text-plate-foreground">
    {children}
  </span>
);

// Thin frame that reads as a screen of the product.
export const AppWindow = ({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      'overflow-hidden bg-card text-card-foreground shadow-[0_24px_60px_-28px_var(--color-overlay),inset_0_0_0_1px_var(--color-border)]',
      className,
    )}
  >
    <div className="flex items-center gap-3 border-b bg-secondary px-4 py-2.5">
      <span aria-hidden="true" className="flex gap-1.5">
        <span className="size-2.5 bg-primary clip-hex" />
        <span className="size-2.5 bg-steel-light clip-hex" />
        <span className="size-2.5 bg-steel-light clip-hex" />
      </span>
      <span className="truncate font-mono text-[0.6875rem] tracking-[0.06em] text-muted-foreground uppercase">
        {title}
      </span>
    </div>
    {children}
  </div>
);
