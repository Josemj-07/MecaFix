import type { Meta, StoryObj } from '@storybook/react-vite';
import { z } from 'zod';

import { Button } from '../button';

import { Form } from './form';
import { Input } from './input';
import { Select } from './select';
import { Textarea } from './textarea';

const schema = z.object({
  name: z.string().min(1, 'Escribe tu nombre'),
  email: z.string().email('Correo no válido'),
  plan: z.string().min(1, 'Elige un plan'),
  notes: z.string().optional(),
});

const meta = { title: 'UI/Form' } satisfies Meta;

export default meta;
type Story = StoryObj;

export const DemoRequest: Story = {
  render: () => (
    <div className="w-96">
      <Form schema={schema} onSubmit={() => undefined}>
        {({ register, formState }) => (
          <>
            <Input
              label="Nombre"
              error={formState.errors.name}
              registration={register('name')}
            />
            <Input
              label="Correo"
              type="email"
              description="Te enviaremos la demo."
              error={formState.errors.email}
              registration={register('email')}
            />
            <Select
              label="Plan"
              error={formState.errors.plan}
              registration={register('plan')}
              options={[
                { label: 'Elige un plan', value: '' },
                { label: 'Esencial', value: 'esencial' },
                { label: 'Pro', value: 'pro' },
              ]}
            />
            <Textarea
              label="Notas"
              error={formState.errors.notes}
              registration={register('notes')}
            />
            <Button type="submit">Enviar</Button>
          </>
        )}
      </Form>
    </div>
  ),
};
