import { useMutation } from '@tanstack/react-query';
import * as z from 'zod';

import { api } from '@/lib/api-client';
import { type MutationConfig } from '@/lib/react-query';

// TODO(backend): el endpoint POST /api/v1/demo-requests aún no existe en
// server/. Mientras tanto responde el mock de MSW
// (VITE_APP_ENABLE_API_MOCKING=true) en src/testing/mocks/handlers/demo-requests.ts.

// Colombian mobile numbers: 10 digits starting with 3 (spaces allowed).
const MOBILE_PATTERN = /^3\d{9}$/;

export const createDemoRequestInputSchema = z.object({
  name: z.string().trim().min(2, 'Escribe tu nombre.'),
  workshop: z.string().trim().min(2, 'Escribe el nombre de tu taller.'),
  phone: z
    .string()
    .transform((value) => value.replace(/\s+/g, ''))
    .pipe(
      z
        .string()
        .regex(
          MOBILE_PATTERN,
          'Escribe los 10 dígitos de tu celular, por ejemplo 300 123 4567.',
        ),
    ),
  city: z.string().trim().min(2, 'Escribe la ciudad de tu taller.'),
});

export type CreateDemoRequestInput = z.input<
  typeof createDemoRequestInputSchema
>;
export type CreateDemoRequestData = z.output<
  typeof createDemoRequestInputSchema
>;

export type DemoRequest = CreateDemoRequestData & {
  id: string;
  createdAt: number;
};

export const createDemoRequest = ({
  data,
}: {
  data: CreateDemoRequestData;
}): Promise<DemoRequest> => {
  return api.post('/api/v1/demo-requests', data);
};

type UseCreateDemoRequestOptions = {
  mutationConfig?: MutationConfig<typeof createDemoRequest>;
};

export const useCreateDemoRequest = ({
  mutationConfig,
}: UseCreateDemoRequestOptions = {}) =>
  useMutation({
    ...mutationConfig,
    mutationFn: createDemoRequest,
  });
