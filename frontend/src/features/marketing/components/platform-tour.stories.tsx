import type { Meta, StoryObj } from '@storybook/react-vite';

import { PlatformTour } from './platform-tour';

const meta = {
  title: 'Marketing/PlatformTour',
  component: PlatformTour,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof PlatformTour>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};
export const Mobile: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
};
