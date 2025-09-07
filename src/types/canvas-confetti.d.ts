/**
 * @file src/types/canvas-confetti.d.ts
 * @description Declaración mínima para el módulo canvas-confetti.
 * @responsibilities Evitar errores de tipo en TS estricto sin depender de @types.
 * @dependencies N/A.
 * @diagram [declare module] -> default export function
 */
declare module 'canvas-confetti' {
  // Firma mínima: función que acepta opciones desconocidas y puede retornar void o Promise-like
  type ConfettiFn = ((options?: unknown) => void | Promise<void>) & {
    create: (canvas: HTMLCanvasElement, opts?: unknown) => ConfettiFn;
    reset: () => void;
  };
  const confetti: ConfettiFn;
  export default confetti;
}
