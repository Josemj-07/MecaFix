import type { Meta, StoryObj } from '@storybook/react-vite';

import { SiteFooter } from './site-footer';

const meta = {
  title: 'Layout/SiteFooter',
  component: SiteFooter,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SiteFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};
export const Mobile: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
};
