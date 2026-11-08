import type { Meta, StoryObj } from '@storybook/react-vite';

import { Pagination } from './pagination';

const meta = {
  title: 'UI/Pagination',
  component: Pagination,
  args: { currentPage: 2, totalPages: 8 },
  decorators: [
    (Story) => (
      <div className="w-[28rem]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Middle: Story = {};
export const FirstPage: Story = { args: { currentPage: 1 } };
export const LastPage: Story = { args: { currentPage: 8 } };
