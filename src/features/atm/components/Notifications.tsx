/**
 * @file src/features/atm/components/Notifications.tsx
 * @description Notificaciones sutiles para operaciones (depósito, retiro, avance).
 * @responsibilities Mostrar banners temporales.
 * @dependencies React, framer-motion.
 * @diagram [Notifications] -> [motion.div]*
 */
'use client';
import { AnimatePresence, motion } from 'framer-motion'; // animaciones
import * as React from 'react'; // react

export interface Notice {
  // tipo notificación
  id: string; // id
  text: string; // texto
}

interface NotificationsProps {
  // props
  notices: Notice[]; // lista
  onDismiss: (id: string) => void; // cerrar
}

export function Notifications({ notices, onDismiss }: NotificationsProps) {
  // render lista animada
  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed right-4 top-4 z-50 space-y-2"
    >
      {' '}
      {/* contenedor */}
      <AnimatePresence>
        {' '}
        {/* presencia */}
        {notices.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto rounded-md border border-neon/40 bg-black/60 px-3 py-2 text-sm shadow-glow"
            role="status"
          >
            <div className="flex items-center justify-between gap-4">
              {' '}
              {/* fila */}
              <span>{n.text}</span> {/* texto */}
              <button
                aria-label="Cerrar notificación"
                onClick={() => onDismiss(n.id)}
                className="text-subtle hover:text-foreground"
              >
                ×
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
