/**
 * @file app/layout.tsx
 * @description Root layout de la app (App Router). Server Component con ThemeProvider cliente.
 * @responsibilities Estructura HTML, estilos globales y metadatos PWA.
 * @dependencies next, TailwindCSS, ThemeProviderClient.
 * @diagram [Server Layout] -> [ThemeProviderClient] -> [Children]
 */
import './globals.css'; // estilos globales
import type { ReactNode } from 'react'; // tipo
import type { Metadata } from 'next'; // tipo metadata
import { ThemeProviderClient } from '@/components/ThemeProviderClient'; // provider cliente

export const metadata: Metadata = {
  // metadatos en server
  title: 'ATM Simulator', // título
  description: 'Simulador de cajero automático en Next.js + TS', // descripción
  manifest: '/manifest.json', // manifest PWA
};

interface RootLayoutProps {
  // props
  children: ReactNode; // hijos
}

export default function RootLayout({ children }: RootLayoutProps) {
  // layout server
  return (
    <html lang="es" suppressHydrationWarning>
      {' '}
      {/* html raíz */}
      <body className="min-h-screen bg-background text-foreground antialiased">
        {' '}
        {/* body */}
        <ThemeProviderClient>
          {' '}
          {/* theming cliente */}
          {children} {/* hijos */}
        </ThemeProviderClient>
      </body>
    </html>
  );
}
