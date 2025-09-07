/**
 * @file tailwind.config.ts
 * @description Configuración Tailwind con tokens básicos y dark mode.
 * @responsibilities Theming claro/oscuro y utilidades.
 * @dependencies tailwindcss.
 */
import type { Config } from 'tailwindcss'; // tipo Config

const config: Config = {
  darkMode: ['class'], // dark via clase
  content: [
    './app/**/*.{ts,tsx}', // app router
    './src/**/*.{ts,tsx}', // src componentes
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(222.2 84% 4.9%)', // fondo oscuro
        foreground: 'hsl(210 40% 98%)', // texto claro
        neon: '#24d3ee', // acento neón
        subtle: '#94a3b8', // gris sutil
      },
      boxShadow: {
        glow: '0 0 20px rgba(36, 211, 238, 0.2)', // brillo suave
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 rgba(36,211,238,0)' },
          '50%': { boxShadow: '0 0 20px rgba(36,211,238,0.35)' },
        },
      },
      animation: {
        pulseGlow: 'pulseGlow 2.5s ease-in-out infinite', // animación
      },
    },
  },
  plugins: [], // sin plugins extra
};

export default config; // exporta config
