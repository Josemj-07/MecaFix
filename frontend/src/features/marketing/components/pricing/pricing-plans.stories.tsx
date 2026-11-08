import type { Meta, StoryObj } from '@storybook/react-vite';

import { PricingPlans } from './pricing-plans';

const meta = {
  title: 'Marketing/PricingPlans',
  component: PricingPlans,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof PricingPlans>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};
export const Mobile: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
};
