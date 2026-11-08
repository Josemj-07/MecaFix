import type { Meta, StoryObj } from '@storybook/react-vite';

import { Nut } from '../nut';

import { Marquee } from './marquee';

const meta = {
  title: 'UI/Marquee',
  component: Marquee,
  parameters: { layout: 'fullscreen' },
  args: {
    items: [
      'Órdenes',
      'Cotizaciones',
      'Bodega',
      'Caja',
      'Nómina',
      'Facturación DIAN',
    ],
    separator: <Nut filled className="size-3 text-primary" />,
  },
} satisfies Meta<typeof Marquee>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
