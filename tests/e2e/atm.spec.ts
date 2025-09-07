/**
 * @file tests/e2e/atm.spec.ts
 * @description Flujo e2e feliz: atajos, retiro inválido, volver a menú, persistencia.
 * @responsibilities Simular interacción UI.
 * @dependencies @playwright/test.
 */
import { test, expect } from '@playwright/test'; // playwright

test('flujo feliz del ATM', async ({ page }) => {
  await page.goto('/atm'); // ir a atm

  await expect(page.getByText('Simulador de Cajero')).toBeVisible(); // título

  // consultar saldo con atajo 1
  await page.keyboard.press('1'); // atajo
  await expect(page.getByText('Saldo actual:')).toBeVisible(); // visible
  await page.keyboard.press('Escape'); // volver

  // retiro inválido
  await page.keyboard.press('3'); // retirar
  await page.getByLabel('Monto (COP)').fill('2000000'); // monto
  await page.getByRole('button', { name: 'Retirar' }).click(); // enviar
  await expect(page.getByText('Retiro inválido')).toBeVisible(); // notificación
  await page.keyboard.press('Escape'); // volver

  // depósito con atajo 2
  await page.keyboard.press('2'); // depositar
  await page.getByLabel('Monto (COP)').fill('150000'); // monto
  await page.getByRole('button', { name: 'Depositar' }).click(); // enviar
  await expect(page.getByText('Depósito')).toBeVisible(); // notificación
  await page.keyboard.press('Escape'); // volver

  // activar persistencia
  const toggle = page.getByRole('switch', { name: 'Recordar estado' }); // switch
  await toggle.click(); // activar

  // ir a historial con H
  await page.keyboard.press('h'); // historial
  await expect(page.getByRole('list')).toBeVisible(); // lista
});
