import type { Meta, StoryObj } from '@storybook/react-vite';

import { TrustStrip } from './trust-strip';

const meta = {
  title: 'Marketing/TrustStrip',
  component: TrustStrip,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof TrustStrip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};
export const Mobile: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
};
