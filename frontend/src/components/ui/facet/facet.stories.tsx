import type { Meta, StoryObj } from '@storybook/react-vite';

import { Facet } from './facet';

const meta = {
  title: 'Marca/Facet',
  component: Facet,
  argTypes: {
    tone: {
      control: 'inline-radio',
      options: ['primary', 'onPrimary', 'steel'],
    },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
  decorators: [
    (Story) => (
      <div className="relative size-48 bg-inverse">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Facet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Steel: Story = { args: { tone: 'steel' } };
export const Large: Story = { args: { size: 'lg' } };
export const Animated: Story = { args: { animated: true } };
