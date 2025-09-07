/**
 * @file src/lib/validation.ts
 * @description Esquemas Zod para validar montos y eventos de ATM.
 * @responsibilities Validar input de formularios y acciones.
 * @dependencies zod.
 * @diagram [Zod Schemas] -> (amount >= 0) etc.
 */
import { z } from 'zod'; // importa zod

// Esquema para montos positivos o cero
export const amountSchema = z
  .number({ required_error: 'Monto requerido' }) // número requerido
  .finite('Monto inválido') // número finito
  .nonnegative('El monto no puede ser negativo'); // no negativo

// Esquema para montos de avance (permitimos cero o positivo,
// pero en lógica, el avance puede llevar la cuenta a negativo)
export const advanceAmountSchema = amountSchema; // reutiliza

// Tipos derivados
export type AmountInput = z.infer<typeof amountSchema>; // tipo monto
