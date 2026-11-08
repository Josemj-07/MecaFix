import type { Meta, StoryObj } from '@storybook/react-vite';
import { ClipboardList, Wrench } from 'lucide-react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';

const meta = { title: 'UI/Tabs', component: Tabs } satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="recepcion" className="w-[32rem]">
      <TabsList aria-label="Pasos">
        <TabsTrigger value="recepcion">
          <ClipboardList aria-hidden="true" /> Recepción
        </TabsTrigger>
        <TabsTrigger value="taller">
          <Wrench aria-hidden="true" /> Taller
        </TabsTrigger>
      </TabsList>
      <TabsContent value="recepcion" className="p-6">
        Registra el carro y el motivo de ingreso.
      </TabsContent>
      <TabsContent value="taller" className="p-6">
        Sigue el avance de cada elevador.
      </TabsContent>
    </Tabs>
  ),
};
