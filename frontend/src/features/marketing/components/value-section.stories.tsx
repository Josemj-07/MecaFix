import type { Meta, StoryObj } from '@storybook/react-vite';

import { ValueSection } from './value-section';

const meta = {
  title: 'Marketing/ValueSection',
  component: ValueSection,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ValueSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};
export const Mobile: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
};
