// Sample data drawn inside the product previews of the marketing pages.
// Plausible for a Colombian workshop, but fictional: it illustrates the
// product, it is not a claim about any real customer.

export type PreviewStatus = 'service' | 'done' | 'pending' | 'waiting';

export const statusLabels: Record<PreviewStatus, string> = {
  service: 'En servicio',
  done: 'Completada',
  pending: 'Pendiente',
  waiting: 'Esperando repuesto',
};

export const sampleOrder = {
  code: 'OT-03876',
  vehicle: 'Chevrolet Onix 2021',
  plate: 'ABC 214',
  customer: 'Ana Torres',
  technician: 'J. Ospina',
  bay: 'Elevador 3',
  status: 'service' as PreviewStatus,
  lines: [
    { label: 'Aceite 5W-30 sintético · 4 L', amount: 168000 },
    { label: 'Filtro de aceite', amount: 32000 },
    { label: 'Pastillas de freno delanteras', amount: 240000 },
    { label: 'Mano de obra · 2,5 h', amount: 150000 },
  ],
};

export const sampleOrderTotal = sampleOrder.lines.reduce(
  (total, line) => total + line.amount,
  0,
);

export const sampleOrders = [
  {
    code: 'OT-03876',
    vehicle: 'Chevrolet Onix 2021',
    plate: 'ABC 214',
    service: 'Mantenimiento 20.000 km',
    status: 'service' as PreviewStatus,
    amount: 590000,
  },
  {
    code: 'OT-03875',
    vehicle: 'Renault Logan 2018',
    plate: 'KRT 908',
    service: 'Frenos delanteros',
    status: 'done' as PreviewStatus,
    amount: 410000,
  },
  {
    code: 'OT-03874',
    vehicle: 'Mazda 2 2020',
    plate: 'GHU 551',
    service: 'Diagnóstico eléctrico',
    status: 'pending' as PreviewStatus,
    amount: 0,
  },
  {
    code: 'OT-03873',
    vehicle: 'Kia Picanto 2019',
    plate: 'JMQ 337',
    service: 'Cambio de embrague',
    status: 'waiting' as PreviewStatus,
    amount: 1180000,
  },
];

export const sampleStock = [
  { part: 'Filtro de aceite PH-3614', available: 3, minimum: 8 },
  { part: 'Pastillas de freno Onix', available: 6, minimum: 4 },
  { part: 'Aceite 5W-30 · galón', available: 14, minimum: 10 },
  { part: 'Bujía NGK BKR6E', available: 2, minimum: 12 },
];

export const sampleInvoice = {
  code: 'FE-01942',
  customer: 'Ana Torres',
  order: 'OT-03875',
  subtotal: 344538,
  tax: 65462,
  total: 410000,
};

export const samplePayroll = [
  { name: 'Jhon Ospina', role: 'Mecánico', orders: 34, commission: 1240000 },
  { name: 'Luisa Mejía', role: 'Mecánica', orders: 29, commission: 1065000 },
  { name: 'Carlos Ruiz', role: 'Electricista', orders: 18, commission: 820000 },
];

export const sampleAssistantChat = [
  {
    from: 'customer' as const,
    text: 'Buenas, ¿ya está listo el Onix? Lo necesito para mañana.',
  },
  {
    from: 'assistant' as const,
    text: 'Hola Ana. Tu Onix está en el elevador 3, cambiando pastillas. Queda listo hoy a las 4:30 p. m.',
  },
];

export const sampleMarginByService = [
  { service: 'Frenos', margin: 46 },
  { service: 'Mantenimiento', margin: 38 },
  { service: 'Suspensión', margin: 33 },
  { service: 'Eléctrico', margin: 29 },
  { service: 'Embrague', margin: 24 },
];
