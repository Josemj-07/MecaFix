import type { Meta, StoryObj } from '@storybook/react-vite';

import { Skeleton } from './skeleton';

const meta = { title: 'UI/Skeleton', component: Skeleton } satisfies Meta<
  typeof Skeleton
>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Card: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-3">
      <Skeleton className="h-6 w-2/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  ),
};
