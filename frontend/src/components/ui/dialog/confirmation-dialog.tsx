import type * as React from 'react';

import { Button } from '../button';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog';

export type ConfirmationDialogProps = {
  // Element that opens the dialog (usually a <Button />).
  triggerButton: React.ReactElement;
  title: string;
  body?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'default' | 'destructive';
  isLoading?: boolean;
  // Optional controlled state. Without them the dialog manages itself; to
  // close it when an action finishes, control it and call onOpenChange(false)
  // from the mutation's onSuccess.
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onConfirm: () => void;
};

export const ConfirmationDialog = ({
  triggerButton,
  title,
  body,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  variant = 'destructive',
  isLoading = false,
  open,
  onOpenChange,
  onConfirm,
}: ConfirmationDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {body && <DialogDescription>{body}</DialogDescription>}
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">{cancelLabel}</Button>
          </DialogClose>
          <Button variant={variant} isLoading={isLoading} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
