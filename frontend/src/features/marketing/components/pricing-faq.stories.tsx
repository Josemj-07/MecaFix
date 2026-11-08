import type { Meta, StoryObj } from '@storybook/react-vite';

import { PricingFaq } from './pricing-faq';

const meta = {
  title: 'Marketing/PricingFaq',
  component: PricingFaq,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof PricingFaq>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};
export const Mobile: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
};
