import type { Meta, StoryObj } from '@storybook/react-vite';

import { ModulesShowcase } from './modules-showcase';

const meta = {
  title: 'Marketing/ModulesShowcase',
  component: ModulesShowcase,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ModulesShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};
export const Mobile: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
};
