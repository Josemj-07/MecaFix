import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../button';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './card';

const meta = { title: 'UI/Card', component: Card } satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Orden OT-03877</CardTitle>
        <CardDescription>Renault Logan · KRT 908</CardDescription>
      </CardHeader>
      <CardContent>Cambio de aceite y revisión de frenos.</CardContent>
      <CardFooter>
        <Button size="sm">Ver orden</Button>
      </CardFooter>
    </Card>
  ),
};
