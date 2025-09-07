/**
 * @file src/components/ThemeProviderClient.tsx
 * @description Wrapper cliente para next-themes.
 * @responsibilities Proveer ThemeProvider desde un Client Component.
 * @dependencies next-themes, React.
 * @diagram [Server Layout] -> [ThemeProviderClient] -> children
 */
'use client'; // componente cliente
import { ThemeProvider } from 'next-themes'; // provider
import type { ReactNode } from 'react'; // tipo

interface Props {
  // props
  children: ReactNode; // hijos
}

export function ThemeProviderClient({ children }: Props) {
  // render del provider
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
