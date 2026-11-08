import type { Meta, StoryObj } from '@storybook/react-vite';

import { Nut } from './nut';

const meta = {
  title: 'Marca/Nut',
  component: Nut,
  args: { className: 'size-10 text-primary' },
} satisfies Meta<typeof Nut>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Outline: Story = {};
export const Filled: Story = { args: { filled: true } };
