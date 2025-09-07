/**
 * @file src/store/atm.ts
 * @description Estado global del ATM con Zustand: saldo, historial, y acciones.
 * @responsibilities Manejar reglas de negocio: depósito, retiro, avance, morosidad, persistencia opcional.
 * @dependencies zustand, localStorage (opcional), utilidades de fecha.
 * @diagram [ATMStore] -> {balance, history, status, actions}
 */
import { create } from 'zustand'; // crea store
import { uuid } from '@/lib/uuid'; // util uuid

// Tipos de operación permitidos
export type OperationType = 'deposit' | 'withdraw' | 'advance'; // operaciones

// Registro de transacción
export interface Transaction {
  // interfaz transacción
  id: string; // id único
  type: OperationType; // tipo
  amount: number; // monto
  date: string; // iso date
  resultBalance: number; // saldo resultante
}

// Estado principal del ATM
interface ATMState {
  // interfaz estado
  balance: number; // saldo actual
  history: Transaction[]; // historial
  delinquent: boolean; // moroso
  usePersistence: boolean; // toggle persistencia
}

// Acciones del ATM
interface ATMActions {
  // interfaz acciones
  deposit: (amount: number) => void; // depósito
  withdraw: (amount: number) => boolean; // retiro (false si inválido)
  advance: (amount: number) => void; // avance (permite negativo)
  togglePersistence: (enabled: boolean) => void; // persist on/off
  reset: () => void; // reiniciar estado
  loadFromStorage: () => void; // cargar desde storage
}

// Claves y constantes
const STORAGE_KEY = 'atm_state_v1'; // clave localStorage
const INITIAL_BALANCE = 1_000_000; // saldo inicial

// Estado inicial
const initialState: ATMState = {
  // objeto estado base
  balance: INITIAL_BALANCE, // saldo
  history: [], // sin transacciones
  delinquent: false, // no moroso
  usePersistence: false, // persistencia off por defecto
};

// Helper para crear transacción
function createTx(
  type: OperationType,
  amount: number,
  resultBalance: number,
): Transaction {
  return {
    id: uuid(),
    type,
    amount,
    date: new Date().toISOString(),
    resultBalance,
  }; // crea registro
}

// Guardado condicional en localStorage
function maybePersist(state: ATMState, enabled: boolean) {
  if (!enabled) return; // si off, no guardar
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); // guarda
  } catch {
    // ignora errores de almacenamiento
  }
}

// Carga desde localStorage de forma segura
function safeLoad(): ATMState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY); // lee
    if (!raw) return null; // si no hay, null
    const parsed = JSON.parse(raw) as ATMState; // parsea
    return parsed; // devuelve
  } catch {
    return null; // en error, null
  }
}

// Crea el store de Zustand
export const useATMStore = create<ATMState & ATMActions>((set, get) => ({
  ...initialState, // estado base

  // Depósito
  deposit: (amount) => {
    const prev = get(); // estado previo
    const result = prev.balance + amount; // nuevo saldo
    const tx = createTx('deposit', amount, result); // crea tx
    const next: ATMState = {
      balance: result, // saldo
      history: [tx, ...prev.history].slice(0, 200), // guarda hasta 200
      delinquent: result < 0, // morosidad
      usePersistence: prev.usePersistence, // conserva toggle
    }; // arma estado
    set(next); // aplica
    maybePersist(next, next.usePersistence); // persiste si aplica
  },

  // Retiro (no puede exceder saldo)
  withdraw: (amount) => {
    const prev = get(); // estado previo
    if (amount > prev.balance) return false; // valida
    const result = prev.balance - amount; // nuevo saldo
    const tx = createTx('withdraw', amount, result); // crea tx
    const next: ATMState = {
      balance: result, // saldo
      history: [tx, ...prev.history].slice(0, 200), // historial
      delinquent: result < 0, // moroso
      usePersistence: prev.usePersistence, // toggle
    }; // estado
    set(next); // setea
    maybePersist(next, next.usePersistence); // persiste
    return true; // éxito
  },

  // Avance (permite saldo negativo)
  advance: (amount) => {
    const prev = get(); // estado previo
    const result = prev.balance - amount; // saldo puede ser negativo
    const tx = createTx('advance', amount, result); // tx
    const next: ATMState = {
      balance: result, // saldo
      history: [tx, ...prev.history].slice(0, 200), // historial
      delinquent: result < 0, // moroso
      usePersistence: prev.usePersistence, // toggle
    }; // estado
    set(next); // aplica
    maybePersist(next, next.usePersistence); // persiste
  },

  // Toggle persistencia
  togglePersistence: (enabled) => {
    const prev = get(); // estado previo
    const next: ATMState = { ...prev, usePersistence: enabled }; // aplica cambio
    set(next); // setea
    maybePersist(next, enabled); // guarda si on
  },

  // Reset a estado inicial
  reset: () => {
    const prev = get(); // estado previo
    const next: ATMState = {
      ...initialState,
      usePersistence: prev.usePersistence,
    }; // conserva toggle
    set(next); // setea
    maybePersist(next, next.usePersistence); // persiste
  },

  // Cargar desde storage
  loadFromStorage: () => {
    const prev = get(); // estado previo
    const loaded = safeLoad(); // intenta cargar
    if (loaded && prev.usePersistence) {
      set(loaded); // aplica cargado
    }
  },
}));
