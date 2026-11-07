import { HttpResponse, http } from 'msw';

import { apiUrl, networkDelay } from '../utils';

// One handlers file per feature: handlers/<feature>.ts exporting <feature>Handlers.
import { demoRequestsHandlers } from './demo-requests';
// HANDLERS:IMPORT

export const handlers = [
  ...demoRequestsHandlers,
  // HANDLERS:SPREAD
  http.get(apiUrl('/healthcheck'), async () => {
    await networkDelay();
    return HttpResponse.json({ ok: true });
  }),
];
