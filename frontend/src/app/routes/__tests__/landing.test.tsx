import {
  getDemoRequests,
  resetDemoRequests,
} from '@/testing/mocks/handlers/demo-requests';
import {
  fireEvent,
  renderApp,
  screen,
  userEvent,
  within,
} from '@/testing/test-utils';

import LandingRoute from '../landing';

beforeEach(() => resetDemoRequests());

test('renders the hero promise with both calls to action', async () => {
  await renderApp(<LandingRoute />);

  expect(
    screen.getByRole('heading', {
      level: 1,
      name: /tu taller, a toda máquina/i,
    }),
  ).toBeInTheDocument();

  const hero = screen.getByRole('region', {
    name: /tu taller, a toda máquina/i,
  });
  expect(
    within(hero).getByRole('link', { name: /prueba una demo gratis/i }),
  ).toHaveAttribute('href', '/#demo');
  expect(
    within(hero).getByRole('link', { name: /mira la plataforma/i }),
  ).toHaveAttribute('href', '/#plataforma');
});

test('follows the decision path from the reframe to the demo', async () => {
  await renderApp(<LandingRoute />);

  const titles = screen
    .getAllByRole('heading', { level: 2 })
    .map((heading) => heading.textContent);

  const expectedOrder = [
    /cobra todo lo que tu taller ya trabaja/i,
    /una sola fuente de verdad, un taller organizado/i,
    /te acompañamos en todo tu proceso/i,
    /conoce cómo.*optimiza tus flujos de trabajo/i,
    /talleres que ya dejaron el cuaderno/i,
    /¿por qué no seguir con el cuaderno\?/i,
    /planes en pesos/i,
    /¿cuánta plata se le escapa a tu taller al año\?/i,
    /lo que nos preguntan antes de empezar/i,
    /mira mecafix funcionando/i,
  ];
  const positions = expectedOrder.map((pattern) =>
    titles.findIndex((title) => pattern.test(title ?? '')),
  );
  expect(positions).not.toContain(-1);
  expect([...positions].sort((a, b) => a - b)).toEqual(positions);

  // Before and after: the MecaFix side is headed by the logo.
  const value = screen.getByRole('region', { name: /cobra todo/i });
  expect(
    within(value).getByRole('heading', { level: 3, name: /con mecafix/i }),
  ).toBeInTheDocument();

  // Trust comes from real commitments, not invented figures.
  const trust = screen.getByRole('region', { name: /en todo tu proceso/i });
  expect(within(trust).getByText('Atención humana 24/7')).toBeInTheDocument();
  expect(
    within(trust).getByText('Migración de datos incluida'),
  ).toBeInTheDocument();
});

test('walks through a working day of the platform', async () => {
  await renderApp(<LandingRoute />);

  const tour = screen.getByRole('region', {
    name: /una sola fuente de verdad, un taller organizado/i,
  });
  expect(
    within(tour).getByRole('heading', {
      level: 3,
      name: /recibe el carro con fotos/i,
    }),
  ).toBeInTheDocument();

  await userEvent.click(
    within(tour).getByRole('button', { name: /siguiente/i }),
  );
  expect(
    within(tour).getByRole('heading', { level: 3, name: /cotiza y recibe/i }),
  ).toBeInTheDocument();

  await userEvent.click(
    within(tour).getByRole('tab', { name: /seguimiento/i }),
  );
  expect(
    within(tour).getByRole('heading', {
      level: 3,
      name: /próximo mantenimiento/i,
    }),
  ).toBeInTheDocument();
  expect(within(tour).getByText('6 / 6')).toBeInTheDocument();
});

test('shows every module with a link to its page', async () => {
  await renderApp(<LandingRoute />);

  const modules = screen.getByRole('region', {
    name: /optimiza tus flujos de trabajo/i,
  });
  const links = within(modules).getAllByRole('link', {
    name: /^ver más de/i,
  });
  expect(links).toHaveLength(6);
  expect(
    within(modules).getByRole('link', {
      name: /ver más de nómina/i,
    }),
  ).toHaveAttribute('href', '/plataforma/nomina');
});

test('estimates the money a workshop recovers with its own numbers', async () => {
  await renderApp(<LandingRoute />);

  const calculator = screen.getByRole('region', {
    name: /cuánta plata se le escapa/i,
  });
  const cars = within(calculator).getByRole('slider', {
    name: /carros al mes/i,
  });

  // 120 cars × $450.000: 2 % uncharged over a year.
  expect(within(calculator).getByText('$ 12.960.000')).toBeInTheDocument();

  fireEvent.change(cars, { target: { value: '200' } });

  // 200 cars × $450.000 × 2 % × 12.
  expect(
    await within(calculator).findByText('$ 21.600.000'),
  ).toBeInTheDocument();
  expect(within(calculator).getByText(/días/)).toBeInTheDocument();
});

test('labels placeholder testimonials and lets you browse them', async () => {
  await renderApp(<LandingRoute />);

  const section = screen.getByRole('region', {
    name: /talleres que ya dejaron el cuaderno/i,
  });
  const stories = within(section).getAllByRole('group');
  expect(stories).toHaveLength(3);
  // Every placeholder story is labelled as an example.
  for (const story of stories) {
    expect(within(story).getAllByText('Ejemplo').length).toBeGreaterThan(0);
  }
  expect(
    within(stories[0]).getByText(/tablero de corcho/i),
  ).toBeInTheDocument();
  expect(within(section).getByText(/testimonio 1 de 3/i)).toBeInTheDocument();

  await userEvent.click(
    within(section).getByRole('button', { name: /testimonio siguiente/i }),
  );

  expect(within(section).getByText(/testimonio 2 de 3/i)).toBeInTheDocument();
  expect(
    within(section).getByRole('group', { name: /2 de 3/i }),
  ).toHaveTextContent(/la quincena me tomaba/i);

  // The avatars jump straight to a story; it shows the task that changed,
  // before and after.
  const julian = within(section).getByRole('button', {
    name: /ver testimonio de julián/i,
  });
  await userEvent.click(julian);

  expect(julian).toHaveAttribute('aria-current', 'true');
  expect(within(section).getByText(/testimonio 3 de 3/i)).toBeInTheDocument();
  const story = within(section).getByRole('group', { name: /3 de 3/i });
  expect(story).toHaveTextContent(/qué repuestos tengo/i);
  expect(within(story).getByText('Con cuaderno')).toBeInTheDocument();
  expect(within(story).getByText('Ninguno')).toBeInTheDocument();
});

test('links the pricing teaser to the pricing page', async () => {
  await renderApp(<LandingRoute />);

  expect(
    screen.getByRole('link', { name: /ver precios y planes/i }),
  ).toHaveAttribute('href', '/precios');
});

test('validates and sends a demo request', async () => {
  await renderApp(<LandingRoute />);

  const section = screen.getByRole('region', {
    name: /mira mecafix funcionando/i,
  });
  const submit = within(section).getByRole('button', {
    name: /agendar mi demo/i,
  });

  await userEvent.click(submit);
  expect(
    await within(section).findByText(/escribe tu nombre/i),
  ).toBeInTheDocument();

  await userEvent.type(
    within(section).getByLabelText(/tu nombre/i),
    'Carlos Gómez',
  );
  await userEvent.type(
    within(section).getByLabelText(/nombre del taller/i),
    'Taller La 80',
  );
  await userEvent.type(
    within(section).getByLabelText(/celular/i),
    '300 123 45',
  );
  await userEvent.type(within(section).getByLabelText(/ciudad/i), 'Medellín');
  await userEvent.click(submit);

  expect(
    await within(section).findByText(/escribe los 10 dígitos/i),
  ).toBeInTheDocument();

  await userEvent.type(within(section).getByLabelText(/celular/i), '67');
  await userEvent.click(submit);

  expect(
    await within(section).findByText(/listo, carlos/i),
  ).toBeInTheDocument();
  expect(within(section).getByText(/300 123 4567/)).toBeInTheDocument();
  expect(getDemoRequests()).toEqual([
    expect.objectContaining({
      name: 'Carlos Gómez',
      workshop: 'Taller La 80',
      phone: '3001234567',
      city: 'Medellín',
    }),
  ]);
});
