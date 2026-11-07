import { CircleCheck } from 'lucide-react';

import { CtaButton } from '@/components/ui/cta-button';
import { Form, Input } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';
import { Spinner } from '@/components/ui/spinner';
import { Heading, Text } from '@/components/ui/typography';
import { formatPhone } from '@/utils/format';

import {
  createDemoRequestInputSchema,
  useCreateDemoRequest,
} from '../api/create-demo-request';

// Four fields only: everything else is asked during the demo.
export const DemoRequestForm = () => {
  const addNotification = useNotifications((state) => state.addNotification);
  const demoRequest = useCreateDemoRequest({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Recibimos tu solicitud',
          message: 'Te escribimos por WhatsApp para agendar la demo.',
        });
      },
    },
  });

  if (demoRequest.isSuccess) {
    const { name, phone } = demoRequest.data;
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-4 bg-card p-8 text-card-foreground motion-safe:animate-rise sm:p-10"
      >
        <span className="grid h-14 w-16 place-items-center bg-success/15 text-success clip-hex">
          <CircleCheck aria-hidden="true" className="size-7" />
        </span>
        <Heading level="h3" className="text-2xl">
          Listo, {name.split(' ')[0]}.
        </Heading>
        <Text className="text-muted-foreground">
          Te escribimos al {formatPhone(phone)} para agendar la demo en el
          horario que te sirva.
        </Text>
      </div>
    );
  }

  return (
    <div className="bg-card p-6 text-card-foreground sm:p-8">
      <Heading level="h3" className="mb-1 text-xl">
        Agenda tu demo gratis
      </Heading>
      <Text variant="muted" className="mb-6">
        Te toma menos de un minuto.
      </Text>
      <Form
        schema={createDemoRequestInputSchema}
        onSubmit={(values) => demoRequest.mutate({ data: values })}
        className="grid gap-5 space-y-0 sm:grid-cols-2"
      >
        {({ register, formState }) => (
          <>
            <Input
              label="Tu nombre"
              autoComplete="name"
              error={formState.errors.name}
              registration={register('name')}
            />
            <Input
              label="Nombre del taller"
              autoComplete="organization"
              error={formState.errors.workshop}
              registration={register('workshop')}
            />
            <Input
              label="Celular (WhatsApp)"
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              placeholder="300 123 4567"
              error={formState.errors.phone}
              registration={register('phone')}
            />
            <Input
              label="Ciudad"
              autoComplete="address-level2"
              error={formState.errors.city}
              registration={register('city')}
            />
            <div className="flex flex-col gap-3 pt-2 sm:col-span-2">
              <CtaButton
                type="submit"
                size="lg"
                disabled={demoRequest.isPending}
                aria-busy={demoRequest.isPending || undefined}
                className="justify-between"
              >
                <span className="flex items-center gap-2">
                  {demoRequest.isPending && (
                    <Spinner size="sm" className="text-current" />
                  )}
                  Agendar mi demo gratis
                </span>
              </CtaButton>
              <Text variant="caption">
                Usamos tus datos solo para contactarte sobre la demo.
              </Text>
            </div>
          </>
        )}
      </Form>
    </div>
  );
};
