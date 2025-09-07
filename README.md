# ATM Simulator (Next.js + TypeScript)

Simulador de cajero con UI estilo terminal neón, reglas de negocio reales, PWA y pruebas.

## Características

- Next.js 14 (App Router) + TypeScript estricto
- TailwindCSS + componentes shadcn-like + lucide-react
- Zustand para estado, Zod + React Hook Form para validaciones/forms
- PWA (next-pwa), theming claro/oscuro (next-themes)
- ESLint + Prettier + Husky + lint-staged
- Vitest + Testing Library (unit) y Playwright (e2e)

## Requisitos

- Node.js 20+
- PNPM 9 (recomendado)

## Instalación

```bash
pnpm install
```

## Desarrollo

```bash
pnpm dev
```

App en `http://localhost:3000` (redirección a `/atm`).

## Scripts

- `dev`: servidor de desarrollo
- `build`: build de producción
- `start`: inicia servidor de producción
- `lint`: ESLint (estricto) + `next lint`
- `typecheck`: `tsc --noEmit`
- `test:unit`: Vitest en modo run
- `test:e2e`: Playwright e2e (requiere `pnpm dev` en otro terminal)
- `format`: Prettier
- `prepare`: instala Husky hooks

## PWA

- Configurado con `next-pwa`. Manifest en `public/manifest.json`.
- SW se genera al build. En desarrollo se desactiva.
- Reemplaza los íconos en `public/icons/` por PNG reales.

## Reglas del ATM

- Saldo inicial: $1.000.000 COP
- Operaciones: Consultar, Depositar, Retirar (no excede saldo), Avance (permite negativo), Historial, Salir
- Menú cíclico, atajos de teclado, accesibilidad ARIA
- Estado "Moroso" cuando saldo < 0
- Historial con tipo, monto, fecha y saldo resultante
- Persistencia opcional via toggle (localStorage)

## Pruebas

Unit tests:

```bash
pnpm test:unit
```

E2E con Playwright (en paralelo correr `pnpm dev`):

```bash
pnpm dev
pnpm test:e2e
```

## CI (GitHub Actions)

Workflow en `.github/workflows/ci.yml` que corre lint, typecheck y unit tests.

## Convenciones de commits

Sigue Conventional Commits. Ejemplos:

- `feat(atm): agrega avance de dinero`
- `fix(store): valida retiro contra saldo`
- `test: añade casos de formato COP`

## Contribución

1. Crea rama `feat/...` o `fix/...`
2. Asegura `pnpm lint && pnpm typecheck && pnpm test:unit`
3. Abre PR con descripción clara

## ADR

Consulta `docs/adr/0001-decisions.md` para decisiones de arquitectura.
