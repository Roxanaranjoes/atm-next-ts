/\*\*

- ADR 0001 - Decisiones clave del proyecto ATM
-
- Propósito: Documentar decisiones de arquitectura y librerías.
- Responsabilidades: Motivaciones, alternativas consideradas y trade-offs.
- Dependencias: Next.js, Zustand, Zod, Tailwind, shadcn-like.
- Diagrama: [Requisitos] -> [Decisiones] -> [Implementación]
  \*/

# ADR 0001: Decisiones clave

- Next.js 14 + App Router: navegación moderna, layouts anidados, PWA con next-pwa.
- TypeScript estricto: seguridad en tiempo de compilación, sin any implícitos.
- Zustand: store ligero, simple y sin boilerplate para reglas del ATM.
- Zod + RHF: validaciones declarativas y formularios accesibles.
- Tailwind + shadcn-like: velocidad de desarrollo con componentes consistentes y accesibles.
- PWA (next-pwa): soporte offline básico y manifest; sin SW manual.
- Vitest + Testing Library: unit tests rápidos en jsdom; Playwright para e2e.
- Persistencia opcional: toggle que guarda/lee estado desde localStorage.

## Alternativas consideradas

- Redux Toolkit: más pesado para el alcance actual; Zustand más directo.
- Formik: RHF tiene mejor rendimiento y menor huella.
- SW manual: next-pwa simplifica y evita errores comunes.

## Trade-offs

- shadcn/ui no se instala como paquete; se incluyen wrappers shadcn-like mínimos para evitar CLI y mantener el repositorio autocontenido.
- Persistencia condicional con manejo manual en lugar de middleware persist dinámico para mantener simplicidad y control.
