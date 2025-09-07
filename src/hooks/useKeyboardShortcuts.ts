/**
 * @file src/hooks/useKeyboardShortcuts.ts
 * @description Hook para atajos de teclado del ATM.
 * @responsibilities Registrar listeners y notificar selección de menú / escape.
 * @dependencies React.
 * @diagram [useEffect] -> [keydown handler] -> callback
 */
import { useEffect } from 'react'; // efecto

// Tipos de menú
export type MenuKey =
  | 'balance'
  | 'deposit'
  | 'withdraw'
  | 'advance'
  | 'exit'
  | 'history'; // menús

interface Options {
  // opciones
  onSelect: (key: MenuKey) => void; // callback selección
  onEscape: () => void; // callback escape
}

export function useKeyboardShortcuts({ onSelect, onEscape }: Options) {
  // registra listeners
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onEscape();
        return;
      } // ESC vuelve menú
      if (e.key === '1') onSelect('balance'); // 1 consultar
      if (e.key === '2') onSelect('deposit'); // 2 depositar
      if (e.key === '3') onSelect('withdraw'); // 3 retirar
      if (e.key === '5') onSelect('advance'); // 5 avance
      if (e.key === '4') onSelect('exit'); // 4 salir
      if (e.key.toLowerCase() === 'h') onSelect('history'); // h historial
    }; // handler
    window.addEventListener('keydown', handler); // agrega
    return () => window.removeEventListener('keydown', handler); // limpia
  }, [onSelect, onEscape]); // deps
}
