import type { Meta, StoryObj } from '@storybook/react-vite';

import { PricingFeatureTable } from './pricing-feature-table';

const meta = {
  title: 'Marketing/PricingFeatureTable',
  component: PricingFeatureTable,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof PricingFeatureTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};
export const Mobile: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
};
