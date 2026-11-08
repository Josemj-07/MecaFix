import type { Meta, StoryObj } from '@storybook/react-vite';

import { Eyebrow } from './eyebrow';

const meta = {
  title: 'Marca/Eyebrow',
  component: Eyebrow,
  args: { children: 'Mira la plataforma' },
  argTypes: {
    tone: {
      control: 'inline-radio',
      options: ['default', 'inverse', 'onPrimary'],
    },
  },
} satisfies Meta<typeof Eyebrow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Inverse: Story = {
  args: { tone: 'inverse' },
  parameters: { backgrounds: { value: 'night' } },
};
export const Animated: Story = { args: { animated: true } };
