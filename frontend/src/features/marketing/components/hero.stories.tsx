import type { Meta, StoryObj } from '@storybook/react-vite';

import { Hero } from './hero';

const meta = {
  title: 'Marketing/Hero',
  component: Hero,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};
export const Mobile: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
};
