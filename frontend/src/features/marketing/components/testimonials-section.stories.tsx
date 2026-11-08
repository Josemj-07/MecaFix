import type { Meta, StoryObj } from '@storybook/react-vite';

import { TestimonialsSection } from './testimonials-section';

const meta = {
  title: 'Marketing/TestimonialsSection',
  component: TestimonialsSection,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof TestimonialsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};
export const Mobile: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
};
