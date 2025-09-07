/**
 * @file tests/unit/store.atm.test.ts
 * @description Pruebas de lógica del store ATM.
 * @responsibilities Depósito, retiro, avance y morosidad.
 * @dependencies vitest, store.
 */
import { describe, it, expect, beforeEach } from 'vitest'; // vitest
import { useATMStore } from '@/store/atm'; // store

describe('ATM store', () => {
  beforeEach(() => {
    useATMStore.getState().reset(); // resetea
  });

  it('depósito incrementa saldo', () => {
    const { deposit } = useATMStore.getState(); // acción
    deposit(100_000); // deposita
    expect(useATMStore.getState().balance).toBe(1_100_000); // valida
  });

  it('retiro válido decrementa saldo', () => {
    const { withdraw } = useATMStore.getState(); // acción
    const ok = withdraw(200_000); // retira
    expect(ok).toBe(true); // éxito
    expect(useATMStore.getState().balance).toBe(800_000); // saldo
  });

  it('retiro inválido no cambia saldo', () => {
    const { withdraw } = useATMStore.getState(); // acción
    const ok = withdraw(2_000_000); // excede
    expect(ok).toBe(false); // falla
    expect(useATMStore.getState().balance).toBe(1_000_000); // igual
  });

  it('avance permite saldo negativo y marca moroso', () => {
    const { advance } = useATMStore.getState(); // acción
    advance(1_200_000); // avanza
    expect(useATMStore.getState().balance).toBe(-200_000); // negativo
    expect(useATMStore.getState().delinquent).toBe(true); // moroso
  });
});
