/**
 * @file tests/unit/format.test.ts
 * @description Pruebas unitarias de formateo COP.
 * @responsibilities Validar salida de formatCOP.
 * @dependencies vitest.
 */
import { describe, it, expect } from 'vitest'; // vitest
import { formatCOP } from '@/lib/format'; // función

describe('formatCOP', () => {
  it('formatea 1000000 como $1.000.000', () => {
    expect(formatCOP(1_000_000)).toBe('$ 1.000.000'); // validación
  });
  it('formatea negativos con signo', () => {
    expect(formatCOP(-5000)).toContain('-'); // contiene negativo
  });
});
