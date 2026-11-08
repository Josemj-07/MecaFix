import type { Meta, StoryObj } from '@storybook/react-vite';
import { ClipboardList } from 'lucide-react';

import { Button } from '../button';

import { EmptyState } from './empty-state';

const meta = {
  title: 'UI/EmptyState',
  component: EmptyState,
  args: {
    title: 'Aún no hay órdenes',
    description: 'Cuando recibas un carro, la orden aparecerá aquí.',
    icon: <ClipboardList aria-hidden="true" />,
    action: <Button size="sm">Crear orden</Button>,
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Minimal: Story = {
  args: { description: undefined, icon: undefined, action: undefined },
};
