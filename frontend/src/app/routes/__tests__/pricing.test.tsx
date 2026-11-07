import { renderApp, screen, userEvent, within } from '@/testing/test-utils';

import PricingRoute from '../pricing';

const planCard = (name: RegExp) =>
  screen.getByRole('article', { name }) as HTMLElement;

test('shows the three plans with monthly prices in pesos', async () => {
  await renderApp(<PricingRoute />, { path: '/precios', url: '/precios' });

  expect(
    screen.getByRole('heading', {
      level: 1,
      name: /planes para cada tamaño de taller/i,
    }),
  ).toBeInTheDocument();

  expect(
    within(planCard(/^taller$/i)).getByText(/149\.000/),
  ).toBeInTheDocument();
  expect(
    within(planCard(/taller pro/i)).getByText(/289\.000/),
  ).toBeInTheDocument();
  expect(
    within(planCard(/red de talleres/i)).getByText(/a medida/i),
  ).toBeInTheDocument();
  expect(screen.getByRole('radio', { name: /mensual/i })).toBeChecked();
});

test('switches to the annual cycle and keeps it in the URL', async () => {
  const { router } = await renderApp(<PricingRoute />, {
    path: '/precios',
    url: '/precios',
  });

  await userEvent.click(screen.getByRole('radio', { name: /anual/i }));

  // 149.000 × 10 / 12 = 124.167 per month, 1.490.000 billed once a year.
  const taller = planCard(/^taller$/i);
  expect(within(taller).getByText(/124\.167/)).toBeInTheDocument();
  expect(within(taller).getByText(/1\.490\.000/)).toBeInTheDocument();
  expect(router.state.location.search).toBe('?ciclo=anual');
});

test('opens on the annual cycle from a shared link', async () => {
  await renderApp(<PricingRoute />, {
    path: '/precios',
    url: '/precios?ciclo=anual',
  });

  expect(screen.getByRole('radio', { name: /anual/i })).toBeChecked();
});

test('compares the modules of every plan', async () => {
  await renderApp(<PricingRoute />, { path: '/precios', url: '/precios' });

  const table = screen.getByRole('table', {
    name: /módulos incluidos en cada plan/i,
  });
  const payrollRow = within(table).getByRole('row', {
    name: /nómina y comisiones/i,
  });
  expect(within(payrollRow).getByText('No incluido')).toBeInTheDocument();
  expect(within(payrollRow).getAllByText('Incluido')).toHaveLength(2);
});
