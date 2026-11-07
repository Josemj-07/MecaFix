import { HttpResponse, http } from 'msw';

import { apiUrl, networkDelay } from '../utils';

type DemoRequest = {
  id: string;
  createdAt: number;
  name: string;
  workshop: string;
  phone: string;
  city: string;
};

// In-memory demo requests. Reset between tests with resetDemoRequests().
let demoRequests: DemoRequest[] = [];

export const resetDemoRequests = () => {
  demoRequests = [];
};

export const getDemoRequests = () => demoRequests;

export const demoRequestsHandlers = [
  http.post(apiUrl('/api/v1/demo-requests'), async ({ request }) => {
    await networkDelay();
    const body = (await request.json()) as Omit<
      DemoRequest,
      'id' | 'createdAt'
    >;
    const demoRequest: DemoRequest = {
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      ...body,
    };
    demoRequests = [demoRequest, ...demoRequests];
    return HttpResponse.json(demoRequest, { status: 201 });
  }),
];
