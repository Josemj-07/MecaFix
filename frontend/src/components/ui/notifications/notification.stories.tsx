import type { Meta, StoryObj } from '@storybook/react-vite';

import { Notification } from './notification';

const meta = {
  title: 'UI/Notification',
  component: Notification,
  args: { onDismiss: () => undefined },
} satisfies Meta<typeof Notification>;

export default meta;
type Story = StoryObj<typeof meta>;

const make = (
  type: 'info' | 'success' | 'warning' | 'error',
  title: string,
  message: string,
): Story => ({
  args: { notification: { id: type, type, title, message } },
});

export const Info = make(
  'info',
  'Recordatorio enviado',
  'El cliente recibirá un WhatsApp.',
);
export const Success = make(
  'success',
  'Orden guardada',
  'OT-03877 quedó registrada.',
);
export const Warning = make(
  'warning',
  'Stock bajo',
  'Quedan 2 filtros de aceite.',
);
export const Error = make(
  'error',
  'No se pudo guardar',
  'Revisa la conexión e intenta de nuevo.',
);
