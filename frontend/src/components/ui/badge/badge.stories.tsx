import type { Meta, StoryObj } from '@storybook/react-vite';

import { Badge } from './badge';

const meta = {
  title: 'UI/Badge',
  component: Badge,
  args: { children: 'En servicio' },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'secondary',
        'outline',
        'success',
        'warning',
        'destructive',
        'info',
        'label',
      ],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {(
        [
          'default',
          'secondary',
          'outline',
          'success',
          'warning',
          'destructive',
          'info',
          'label',
        ] as const
      ).map((variant) => (
        <Badge key={variant} variant={variant}>
          {variant}
        </Badge>
      ))}
    </div>
  ),
};
