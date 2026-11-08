import type { Meta, StoryObj } from '@storybook/react-vite';

import { AppWindow, PlateTag, StatusChip } from './preview-primitives';

const meta = {
  title: 'Marketing/Piezas de vista previa',
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Statuses: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {(['service', 'done', 'pending', 'waiting'] as const).map((status) => (
        <StatusChip key={status} status={status} />
      ))}
    </div>
  ),
};
export const Plate: Story = { render: () => <PlateTag>KRT 908</PlateTag> };
export const Window: Story = {
  render: () => (
    <AppWindow title="Taller · tablero de hoy" className="w-96">
      <div className="p-6">Contenido de la ventana</div>
    </AppWindow>
  ),
};
