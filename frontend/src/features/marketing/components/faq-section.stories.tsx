import type { Meta, StoryObj } from '@storybook/react-vite';

import { FaqSection } from './faq-section';

const meta = {
  title: 'Marketing/FaqSection',
  component: FaqSection,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof FaqSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};
export const Mobile: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
};
