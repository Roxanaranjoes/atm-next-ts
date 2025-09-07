/**
 * @file src/lib/format.ts
 * @description Utilidades de formateo para moneda COP y fechas.
 * @responsibilities Proveer `formatCOP` y `formatDate` consistentes y testeables.
 * @dependencies Intl.NumberFormat, Date.
 * @diagram [formatCOP] -> Intl | [formatDate] -> Date.toLocaleString
 */

// Crea instancia de formateador COP una vez para eficiencia
const copFormatter = new Intl.NumberFormat('es-CO', {
  // formateador COP
  style: 'currency', // estilo moneda
  currency: 'COP', // moneda
  maximumFractionDigits: 0, // sin decimales para COP
});

/**
 * Formatea un valor numérico a moneda COP.
 * @param value - Monto en número (puede ser negativo).
 * @returns Cadena formateada en COP, ejemplo: $1.000.000.
 */
export function formatCOP(value: number): string {
  return copFormatter.format(value); // usa Intl
}

/**
 * Formatea un ISO date a fecha legible local (es-CO).
 * @param iso - Fecha en ISO string.
 * @returns Cadena con fecha y hora local.
 */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleString('es-CO'); // formateo local
}
