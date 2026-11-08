import type { Meta, StoryObj } from '@storybook/react-vite';

import { Logo } from './logo';

const meta = {
  title: 'Marca/Logo',
  component: Logo,
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['default', 'inverse', 'mark'],
    },
  },
  args: { className: 'h-16' },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Inverse: Story = {
  args: { variant: 'inverse' },
  parameters: { backgrounds: { value: 'night' } },
};
export const Mark: Story = { args: { variant: 'mark' } };
