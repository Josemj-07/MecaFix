import type { Meta, StoryObj } from '@storybook/react-vite';

import { Link } from './link';

const meta = {
  title: 'UI/Link',
  component: Link,
  args: { to: '/precios', children: 'Ver precios' },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Unstyled: Story = { args: { variant: 'unstyled' } };
