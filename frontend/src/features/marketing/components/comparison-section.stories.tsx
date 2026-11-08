import type { Meta, StoryObj } from '@storybook/react-vite';

import { ComparisonSection } from './comparison-section';

const meta = {
  title: 'Marketing/ComparisonSection',
  component: ComparisonSection,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ComparisonSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};
export const Mobile: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
};
