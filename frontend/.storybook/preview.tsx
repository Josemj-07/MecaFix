import type { Preview } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router';

import '../src/styles/globals.css';

const queryClient = new QueryClient();

const preview: Preview = {
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </QueryClientProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        paper: { name: 'Papel', value: '#fafaf8' },
        night: { name: 'Noche', value: '#15171a' },
      },
    },
    viewport: {
      options: {
        small: {
          name: 'Celular pequeño',
          styles: { width: '360px', height: '640px' },
          type: 'mobile',
        },
        mobile: {
          name: 'Celular',
          styles: { width: '390px', height: '844px' },
          type: 'mobile',
        },
        tablet: {
          name: 'Tablet',
          styles: { width: '768px', height: '1024px' },
          type: 'tablet',
        },
        desktop: {
          name: 'Escritorio',
          styles: { width: '1280px', height: '800px' },
          type: 'desktop',
        },
      },
    },
    a11y: { test: 'todo' },
  },
};

export default preview;
