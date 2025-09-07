/**
 * @file playwright.config.ts
 * @description Configuración de Playwright para e2e.
 * @responsibilities Definir baseURL y navegadores.
 * @dependencies @playwright/test.
 */
import { defineConfig, devices } from '@playwright/test'; // define

export default defineConfig({
  testDir: 'tests/e2e', // carpeta
  timeout: 30_000, // timeout
  use: {
    baseURL: 'http://localhost:3000', // base
    trace: 'on-first-retry', // trace
  },
  webServer: {
    command: 'pnpm dev', // inicia dev server para e2e locales/CI
    port: 3000, // puerto
    reuseExistingServer: true, // reutiliza si ya está corriendo
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } }, // chrome
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } }, // firefox
  ],
});
