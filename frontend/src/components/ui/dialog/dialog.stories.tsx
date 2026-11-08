import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';

import { Button } from '../button';

import { ConfirmationDialog } from './confirmation-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog';

const meta = { title: 'UI/Dialog', component: Dialog } satisfies Meta<
  typeof Dialog
>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Abrir diálogo</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalle de la orden</DialogTitle>
          <DialogDescription>
            Revisa los datos antes de continuar.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button>Entendido</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Confirmation: Story = {
  render: () => {
    const Demo = () => {
      const [open, setOpen] = React.useState(false);
      return (
        <ConfirmationDialog
          open={open}
          onOpenChange={setOpen}
          triggerButton={<Button variant="destructive">Eliminar orden</Button>}
          title="¿Eliminar la orden?"
          body="Esta acción no se puede deshacer."
          confirmLabel="Eliminar"
          onConfirm={() => setOpen(false)}
        />
      );
    };
    return <Demo />;
  },
};
