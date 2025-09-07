/**
 * @file app/(routes)/atm/page.tsx
 * @description Ruta principal del simulador ATM. Renderiza layout split-screen.
 * @responsibilities Orquestar panel terminal y panel estado de cuenta.
 * @dependencies Componentes de features ATM, Tailwind, framer-motion.
 * @diagram [ATM Page] -> [TerminalPanel | AccountPanel]
 */
'use client'; // cliente

import { ATMTerminal } from '@/features/atm/components/ATMTerminal'; // panel terminal
import { AccountPanel } from '@/features/atm/components/AccountPanel'; // panel cuenta

export default function ATMPage() {
  // render de la página ATM
  return (
    <main className="container mx-auto max-w-6xl p-4 md:p-6">
      {' '}
      {/* contenedor */}
      <h1 className="mb-4 text-center text-2xl font-semibold text-neon md:text-3xl animate-pulseGlow">
        {' '}
        {/* título */}
        Simulador de Cajero (ATM)
      </h1>
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {' '}
        {/* split grid */}
        <ATMTerminal /> {/* panel terminal */}
        <AccountPanel /> {/* panel estado */}
      </section>
    </main>
  );
}
