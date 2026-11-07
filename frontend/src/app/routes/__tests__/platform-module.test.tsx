import { renderApp, screen } from '@/testing/test-utils';

import PlatformModuleRoute from '../platform-module';

const path = '/plataforma/:moduleSlug';

test('renders the page of a module with its benefit and features', async () => {
  await renderApp(<PlatformModuleRoute />, {
    path,
    url: '/plataforma/inventario',
  });

  expect(
    screen.getByRole('heading', {
      level: 1,
      name: /la bodega se descuenta sola con cada orden/i,
    }),
  ).toBeInTheDocument();
  expect(screen.getByText(/órdenes de compra sugeridas/i)).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: /prueba una demo gratis/i }),
  ).toHaveAttribute('href', '/#demo');

  // Links to the other five modules.
  expect(screen.getAllByRole('link', { name: /ver módulo/i })).toHaveLength(5);
});

test('shows the not found page for an unknown module', async () => {
  await renderApp(<PlatformModuleRoute />, {
    path,
    url: '/plataforma/no-existe',
  });

  expect(
    screen.getByRole('heading', { level: 1, name: /página no encontrada/i }),
  ).toBeInTheDocument();
});
