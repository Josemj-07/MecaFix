import type { Meta, StoryObj } from '@storybook/react-vite';

import { CtaButton } from './cta-button';

const meta = {
  title: 'UI/CtaButton',
  component: CtaButton,
  args: { children: 'Prueba una demo gratis' },
  argTypes: {
    tone: {
      control: 'select',
      options: ['primary', 'dark', 'light', 'outline', 'outline-inverse'],
    },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof CtaButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Dark: Story = { args: { tone: 'dark' } };
export const Outline: Story = { args: { tone: 'outline' } };
export const Large: Story = { args: { size: 'lg' } };
