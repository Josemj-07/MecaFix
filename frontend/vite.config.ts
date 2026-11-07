/// <reference types="vitest/config" />
import path from 'node:path';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  server: { port: 5173 },
  preview: { port: 5173 },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/testing/setup-tests.ts',
    include: ['src/**/*.test.{ts,tsx}'],
    css: false,
    restoreMocks: true,
    env: {
      VITE_APP_API_URL: 'http://localhost:8080',
      VITE_APP_ENABLE_API_MOCKING: 'false',
    },
  },
});
