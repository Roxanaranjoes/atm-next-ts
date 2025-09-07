/**
 * @file vitest.config.ts
 * @description Configuración de Vitest para unit tests.
 * @responsibilities Entorno jsdom, setup y alias TS.
 * @dependencies vitest, jsdom, node:path.
 */
import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['tests/setup.ts'],
    globals: true,
    include: ['tests/unit/**/*.test.ts'],
  },
});
