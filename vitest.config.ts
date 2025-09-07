/**
 * @file vitest.config.ts
 * @description Configuración de Vitest para unit tests.
 * @responsibilities Entorno jsdom, coverage básico y setup.
 * @dependencies vitest, jsdom.
 */
import { defineConfig } from 'vitest/config'; // define

export default defineConfig({
  test: {
    environment: 'jsdom', // entorno DOM
    setupFiles: ['tests/setup.ts'], // setup
    globals: true, // global APIs
    include: ['tests/unit/**/*.test.ts'], // incluye unit
  },
});
