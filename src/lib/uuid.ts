/**
 * @file src/lib/uuid.ts
 * @description Utilidad para generar UUID de forma segura con fallback.
 * @responsibilities Evitar dependencias de `crypto.randomUUID` en SSR/tests.
 * @dependencies nativas.
 * @diagram [uuid] -> globalThis.crypto.randomUUID | fallback
 */

/**
 * Genera un UUID. Usa `globalThis.crypto.randomUUID` si existe, de lo contrario un fallback.
 */
export function uuid(): string {
  const g = globalThis as unknown as { crypto?: { randomUUID?: () => string } }; // acceso seguro
  if (g.crypto && typeof g.crypto.randomUUID === 'function') {
    return g.crypto.randomUUID(); // usa API nativa si está
  }
  // Fallback simple (no RFC, suficiente para ids de UI/tests)
  return 'id-' + Math.random().toString(36).slice(2) + Date.now().toString(36); // genera id
}
