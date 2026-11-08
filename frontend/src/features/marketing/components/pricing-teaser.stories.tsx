import type { Meta, StoryObj } from '@storybook/react-vite';

import { PricingTeaser } from './pricing-teaser';

const meta = {
  title: 'Marketing/PricingTeaser',
  component: PricingTeaser,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof PricingTeaser>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};
export const Mobile: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
};
