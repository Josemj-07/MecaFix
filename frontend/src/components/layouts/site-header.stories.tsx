import type { Meta, StoryObj } from '@storybook/react-vite';

import { SiteHeader } from './site-header';

const meta = {
  title: 'Layout/SiteHeader',
  component: SiteHeader,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SiteHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};
export const Mobile: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
};
