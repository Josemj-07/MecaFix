import type { Meta, StoryObj } from '@storybook/react-vite';

import { SavingsCalculator } from './savings-calculator';

const meta = {
  title: 'Marketing/SavingsCalculator',
  component: SavingsCalculator,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SavingsCalculator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};
export const Mobile: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
};
