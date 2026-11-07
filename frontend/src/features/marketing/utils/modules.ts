import {
  Bot,
  ChartNoAxesCombined,
  ClipboardList,
  type LucideIcon,
  Package,
  ReceiptText,
  Wallet,
} from 'lucide-react';

// The six modules of the platform. Shared by the landing showcase and the
// module pages (/plataforma/:moduleSlug), so both always say the same.

export type ModuleSlug =
  | 'ordenes'
  | 'inventario'
  | 'facturacion'
  | 'nomina'
  | 'asistente-ia'
  | 'reportes';

export type PlatformModule = {
  slug: ModuleSlug;
  name: string;
  icon: LucideIcon;
  // The problem it removes, in the words of the workshop.
  problem: string;
  // The outcome, as the big statement of the section.
  benefit: string;
  description: string;
  points: string[];
  window: string;
};

export const platformModules: PlatformModule[] = [
  {
    slug: 'ordenes',
    name: 'Órdenes de trabajo',
    icon: ClipboardList,
    problem:
      'Órdenes en papel que se pierden entre el mostrador y el elevador.',
    benefit: 'Sabes en qué va cada carro sin bajar al taller',
    description:
      'Cada vehículo entra con su orden, su técnico y su elevador. El estado se actualiza mientras trabajan y todo el equipo ve lo mismo.',
    points: [
      'Recepción con fotos, kilometraje y firma del cliente',
      'Tablero por elevador y por técnico',
      'Historial completo de cada placa',
    ],
    window: 'Taller · tablero de hoy',
  },
  {
    slug: 'inventario',
    name: 'Inventario y compras',
    icon: Package,
    problem:
      'Te enteras de que falta un repuesto cuando el carro ya está arriba.',
    benefit: 'La bodega se descuenta sola con cada orden',
    description:
      'Cada repuesto usado en una orden sale del inventario. MecaFix te avisa antes del stock mínimo y te sugiere la compra al proveedor.',
    points: [
      'Stock por bodega con alertas de mínimo',
      'Órdenes de compra sugeridas',
      'Costo y margen por repuesto',
    ],
    window: 'Inventario · bodega principal',
  },
  {
    slug: 'facturacion',
    name: 'Facturación electrónica',
    icon: ReceiptText,
    problem: 'La factura se hace aparte, al final del día, copiando valores.',
    benefit: 'Entregas el carro con la factura DIAN lista',
    description:
      'La orden cerrada se convierte en factura electrónica con los valores que el cliente ya aprobó. Se valida ante la DIAN y le llega al correo.',
    points: [
      'Factura electrónica validada ante la DIAN',
      'Envío automático al cliente',
      'Notas crédito desde la misma factura',
    ],
    window: 'Facturación electrónica',
  },
  {
    slug: 'nomina',
    name: 'Nómina y comisiones',
    icon: Wallet,
    problem:
      'La quincena se calcula a mano en un Excel que solo entiende una persona.',
    benefit: 'La quincena de cada mecánico, calculada con sus órdenes',
    description:
      'Salario, comisiones por servicio, horas extra y anticipos salen de lo que cada persona hizo en el taller. Tú revisas y apruebas.',
    points: [
      'Comisiones por servicio o por porcentaje',
      'Anticipos y descuentos registrados',
      'Liquidación lista para aprobar',
    ],
    window: 'Nómina · quincena 1',
  },
  {
    slug: 'asistente-ia',
    name: 'Asistente con IA',
    icon: Bot,
    problem:
      'El teléfono suena todo el día con clientes preguntando por su carro.',
    benefit: 'Un asistente que responde con el estado real de cada orden',
    description:
      'Agentes de IA preparan cotizaciones, responden a tus clientes por WhatsApp y te avisan qué órdenes están frenadas. Tú revisas antes de que algo salga.',
    points: [
      'Respuestas con datos reales de la orden',
      'Borradores de cotización en segundos',
      'Avisos de órdenes atrasadas',
    ],
    window: 'Asistente · conversación con Ana Torres',
  },
  {
    slug: 'reportes',
    name: 'Datos y recomendaciones',
    icon: ChartNoAxesCombined,
    problem:
      'No sabes qué servicio te deja plata y cuál solo te ocupa el elevador.',
    benefit: 'Decide con números, no con corazonadas',
    description:
      'Margen por servicio, rendimiento por técnico y clientes que ya deberían volver. MecaFix convierte la operación diaria en recomendaciones.',
    points: [
      'Margen por servicio y por cliente',
      'Productividad por técnico y elevador',
      'Clientes para recordar mantenimiento',
    ],
    window: 'Reportes · noviembre',
  },
];

export const moduleAnchor = (slug: ModuleSlug) => `modulo-${slug}`;

export const findModule = (slug: string | undefined) =>
  platformModules.find((module) => module.slug === slug);
