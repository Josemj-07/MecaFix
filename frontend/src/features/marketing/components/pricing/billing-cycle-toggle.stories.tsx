import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';

import { BillingCycleToggle } from './billing-cycle-toggle';

const meta = {
  title: 'Marketing/BillingCycleToggle',
  component: BillingCycleToggle,
  args: { value: 'mensual', onChange: () => undefined },
  parameters: { backgrounds: { value: 'night' } },
} satisfies Meta<typeof BillingCycleToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  render: (args) => {
    const Demo = () => {
      const [value, setValue] = React.useState(args.value);
      return <BillingCycleToggle value={value} onChange={setValue} />;
    };
    return <Demo />;
  },
};
