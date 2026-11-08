import type { Meta, StoryObj } from '@storybook/react-vite';

import { Heading, Text } from './typography';

const meta = {
  title: 'Fundamentos/Tipografía',
  component: Heading,
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Headings: Story = {
  render: () => (
    <div className="flex max-w-3xl flex-col gap-4">
      {(['hero', 'display', 'h1', 'h2', 'h3', 'h4'] as const).map((level) => (
        <Heading key={level} level={level}>
          {level}: Un taller organizado
        </Heading>
      ))}
    </div>
  ),
};

export const TextVariants: Story = {
  render: () => (
    <div className="flex max-w-xl flex-col gap-3">
      {(['lead', 'body', 'small', 'muted', 'caption', 'label'] as const).map(
        (variant) => (
          <Text key={variant} variant={variant}>
            {variant}: Registra la orden una sola vez y todo el taller la ve.
          </Text>
        ),
      )}
    </div>
  ),
};
