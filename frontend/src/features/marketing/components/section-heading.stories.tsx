import type { Meta, StoryObj } from '@storybook/react-vite';

import { SectionHeading } from './section-heading';

const meta = {
  title: 'Marketing/SectionHeading',
  component: SectionHeading,
  args: {
    id: 'demo-title',
    eyebrow: 'Mira la plataforma',
    title: 'Una sola fuente de verdad, un taller organizado',
    description:
      'Lo que registra el asesor lo ven al instante el mecánico, la bodega y caja.',
  },
} satisfies Meta<typeof SectionHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Inverse: Story = {
  args: { tone: 'inverse' },
  parameters: { backgrounds: { value: 'night' } },
};
