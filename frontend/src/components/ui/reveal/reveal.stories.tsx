import type { Meta, StoryObj } from '@storybook/react-vite';

import { Reveal } from './reveal';

const meta = { title: 'UI/Reveal', component: Reveal } satisfies Meta<
  typeof Reveal
>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FromBottom: Story = {
  render: () => (
    <Reveal className="p-6 shadow-sm">Aparezco al entrar en pantalla</Reveal>
  ),
};
export const FromLeft: Story = {
  render: () => (
    <Reveal from="left" delay={150} className="p-6 shadow-sm">
      Vengo desde la izquierda
    </Reveal>
  ),
};
