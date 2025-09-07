/**
 * @file next.config.mjs
 * @description Configuración de Next.js con soporte PWA usando next-pwa.
 * @responsibilities Habilitar App Router, configurar PWA, y optimizar build.
 * @dependencies next, next-pwa.
 * @diagram [Next.js] -> [next-pwa wrapper] -> [Service Worker]
 */
import withPWA from 'next-pwa'; // importa wrapper PWA

// configuración base del plugin PWA
const withPWAModule = withPWA({
  dest: 'public', // salida del SW
  disable: process.env.NODE_ENV === 'development', // desactiva PWA en dev
  register: true, // registra SW automáticamente
  skipWaiting: true // activa nuevo SW al instalarse
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // habilita modo estricto
  experimental: {
    typedRoutes: true // rutas tipadas
  }
};

export default withPWAModule(nextConfig); // exporta config envuelta

