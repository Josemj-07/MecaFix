// Plans shown on the landing teaser and on /precios.
// TODO: los precios, el descuento anual y los límites son PROVISIONALES.
// Confirmar con el equipo antes de publicar (ver .claude/product-marketing.md).

export type BillingCycle = 'mensual' | 'anual';

export type PlanId = 'taller' | 'taller-pro' | 'red';

export type Plan = {
  id: PlanId;
  name: string;
  audience: string;
  summary: string;
  // Monthly price in COP; null for custom quotes.
  monthlyPrice: number | null;
  recommended?: boolean;
  highlights: string[];
};

// Months charged when paying a year upfront (12 months for the price of 10).
export const ANNUAL_MONTHS_CHARGED = 10;

export const plans: Plan[] = [
  {
    id: 'taller',
    name: 'Taller',
    audience: '1 a 3 elevadores',
    summary: 'Para ordenar la operación de un taller pequeño.',
    monthlyPrice: 149000,
    highlights: [
      'Órdenes de trabajo ilimitadas',
      'Clientes y vehículos con historial',
      'Inventario con stock mínimo',
      '3 usuarios',
    ],
  },
  {
    id: 'taller-pro',
    name: 'Taller Pro',
    audience: '4 a 10 elevadores',
    summary: 'Para talleres con varios mecánicos y facturación diaria.',
    monthlyPrice: 289000,
    recommended: true,
    highlights: [
      'Todo lo del plan Taller',
      'Facturación electrónica DIAN',
      'Nómina y comisiones',
      'Asistente con IA',
      '10 usuarios',
    ],
  },
  {
    id: 'red',
    name: 'Red de talleres',
    audience: '2 sedes o más',
    summary: 'Para grupos con varias sedes y bodegas.',
    monthlyPrice: null,
    highlights: [
      'Todo lo del plan Taller Pro',
      'Multisede y multibodega',
      'Reportes consolidados',
      'Usuarios ilimitados',
    ],
  },
];

// Included in every plan: the commitments of the trust strip.
export const includedInAllPlans = [
  'Atención humana 24/7',
  'Migración de datos incluida',
  'Capacitación para tu equipo',
  'Actualizaciones sin costo',
];

// Monthly amount to display for a plan in a billing cycle.
export const monthlyAmount = (plan: Plan, cycle: BillingCycle) => {
  if (plan.monthlyPrice === null) return null;
  return cycle === 'mensual'
    ? plan.monthlyPrice
    : Math.round((plan.monthlyPrice * ANNUAL_MONTHS_CHARGED) / 12);
};

export const annualTotal = (plan: Plan) =>
  plan.monthlyPrice === null ? null : plan.monthlyPrice * ANNUAL_MONTHS_CHARGED;

export type FeatureValue = boolean | string;

export type FeatureRow = {
  label: string;
  values: Record<PlanId, FeatureValue>;
};

export type FeatureGroup = {
  title: string;
  rows: FeatureRow[];
};

export const featureGroups: FeatureGroup[] = [
  {
    title: 'Operación del taller',
    rows: [
      {
        label: 'Órdenes de trabajo',
        values: {
          taller: 'Ilimitadas',
          'taller-pro': 'Ilimitadas',
          red: 'Ilimitadas',
        },
      },
      {
        label: 'Recepción con fotos y firma',
        values: { taller: true, 'taller-pro': true, red: true },
      },
      {
        label: 'Historial por placa',
        values: { taller: true, 'taller-pro': true, red: true },
      },
      {
        label: 'Agenda por elevador',
        values: { taller: true, 'taller-pro': true, red: true },
      },
      {
        label: 'Avisos al cliente por WhatsApp',
        values: { taller: false, 'taller-pro': true, red: true },
      },
    ],
  },
  {
    title: 'Inventario y finanzas',
    rows: [
      {
        label: 'Inventario con stock mínimo',
        values: { taller: true, 'taller-pro': true, red: true },
      },
      {
        label: 'Órdenes de compra a proveedores',
        values: { taller: false, 'taller-pro': true, red: true },
      },
      {
        label: 'Facturación electrónica DIAN',
        values: { taller: false, 'taller-pro': true, red: true },
      },
      {
        label: 'Nómina y comisiones',
        values: { taller: false, 'taller-pro': true, red: true },
      },
    ],
  },
  {
    title: 'Inteligencia y escala',
    rows: [
      {
        label: 'Asistente con IA',
        values: { taller: false, 'taller-pro': true, red: true },
      },
      {
        label: 'Datos y recomendaciones',
        values: { taller: 'Básicos', 'taller-pro': true, red: true },
      },
      {
        label: 'Multisede y multibodega',
        values: { taller: false, 'taller-pro': false, red: true },
      },
      {
        label: 'Usuarios',
        values: { taller: '3', 'taller-pro': '10', red: 'Ilimitados' },
      },
    ],
  },
];
