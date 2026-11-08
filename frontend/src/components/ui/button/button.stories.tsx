import type { Meta, StoryObj } from '@storybook/react-vite';
import { Plus } from 'lucide-react';

import { Button } from './button';

const meta = {
  title: 'UI/Button',
  component: Button,
  args: { children: 'Guardar orden' },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
      ],
    },
    size: { control: 'inline-radio', options: ['default', 'sm', 'lg', 'icon'] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Eliminar' },
};
export const Outline: Story = { args: { variant: 'outline' } };
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Ghost: Story = { args: { variant: 'ghost' } };
export const Link: Story = { args: { variant: 'link' } };
export const Loading: Story = { args: { isLoading: true } };
export const Disabled: Story = { args: { disabled: true } };
export const WithIcon: Story = {
  args: { icon: <Plus aria-hidden="true" />, children: 'Nueva orden' },
};
export const IconOnly: Story = {
  args: {
    size: 'icon',
    'aria-label': 'Agregar',
    children: <Plus aria-hidden="true" />,
  },
};
