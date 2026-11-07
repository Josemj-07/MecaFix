import {
  Bot,
  ChartNoAxesCombined,
  ClipboardList,
  type LucideIcon,
  Package,
  ReceiptText,
  Wallet,
} from 'lucide-react';

import { paths } from './paths';

// Anchor ids of the landing sections. Sections render them as `id` and links
// point to `landingAnchor(...)`, so both always match.
export const landingSections = {
  platform: 'plataforma',
  modules: 'modulos',
  howToStart: 'como-empezar',
  savings: 'calculadora',
  testimonials: 'testimonios',
  faq: 'preguntas',
  demo: 'demo',
} as const;

export type LandingSection = keyof typeof landingSections;

export const landingAnchor = (section: LandingSection) =>
  `${paths.home.getHref()}#${landingSections[section]}`;

export type NavLink = {
  label: string;
  href: string;
  // Route links use the router; anchors of the landing use a plain <a>.
  isRoute?: boolean;
};

export type NavMenuItem = NavLink & {
  description: string;
  icon: LucideIcon;
};

export type NavItem = NavLink | (NavLink & { menu: NavMenuItem[] });

const mainNav: NavItem[] = [
  {
    label: 'Plataforma',
    href: landingAnchor('modules'),
    menu: [
      {
        label: 'Órdenes de trabajo',
        description: 'De la recepción a la entrega',
        href: paths.platformModule.getHref('ordenes'),
        isRoute: true,
        icon: ClipboardList,
      },
      {
        label: 'Inventario y compras',
        description: 'Repuestos con stock mínimo',
        href: paths.platformModule.getHref('inventario'),
        isRoute: true,
        icon: Package,
      },
      {
        label: 'Facturación electrónica',
        description: 'Validada ante la DIAN',
        href: paths.platformModule.getHref('facturacion'),
        isRoute: true,
        icon: ReceiptText,
      },
      {
        label: 'Nómina y comisiones',
        description: 'Liquidación por mecánico',
        href: paths.platformModule.getHref('nomina'),
        isRoute: true,
        icon: Wallet,
      },
      {
        label: 'Asistente con IA',
        description: 'Cotiza y responde por ti',
        href: paths.platformModule.getHref('asistente-ia'),
        isRoute: true,
        icon: Bot,
      },
      {
        label: 'Datos y recomendaciones',
        description: 'Margen por servicio y cliente',
        href: paths.platformModule.getHref('reportes'),
        isRoute: true,
        icon: ChartNoAxesCombined,
      },
    ],
  },
  { label: 'Cómo empezar', href: landingAnchor('howToStart') },
  { label: 'Precios', href: paths.pricing.getHref(), isRoute: true },
  { label: 'Preguntas', href: landingAnchor('faq') },
];

const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: 'Plataforma',
    links: [
      { label: 'Mira la plataforma', href: landingAnchor('platform') },
      { label: 'Módulos', href: landingAnchor('modules') },
      { label: 'Precios', href: paths.pricing.getHref(), isRoute: true },
    ],
  },
  {
    title: 'Empezar',
    links: [
      { label: 'Cómo empezar', href: landingAnchor('howToStart') },
      { label: 'Testimonios', href: landingAnchor('testimonials') },
      { label: 'Preguntas frecuentes', href: landingAnchor('faq') },
      { label: 'Prueba una demo gratis', href: landingAnchor('demo') },
    ],
  },
];

// Brand and global content. Change the identity of the app here.
export const siteConfig = {
  name: 'MecaFix',
  description:
    'Software de gestión para talleres automotrices en Colombia: órdenes de trabajo, inventario, clientes, nómina de mecánicos y facturación electrónica DIAN en un solo sistema.',
  tagline: 'Tu taller, a toda máquina.',
  location: 'Colombia',
  // TODO: reemplazar por el correo real de contacto antes de publicar.
  contactEmail: 'hola@mecafix.co',
  // Main calls to action, shared by header, hero and closing section.
  primaryCta: { label: 'Prueba una demo gratis', href: landingAnchor('demo') },
  secondaryCta: {
    label: 'Mira la plataforma',
    href: landingAnchor('platform'),
  },
  // Main navigation rendered by the floating header.
  mainNav,
  // Link columns rendered by the footer.
  footerNav,
  // Third-party media used on the site.
  credits: [
    {
      label: 'Video de fondo: Mixkit (licencia gratuita de Mixkit)',
      href: 'https://mixkit.co/license/#videoFree',
    },
  ],
} as const;
