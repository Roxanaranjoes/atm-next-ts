/**
 * @file src/features/atm/components/TransactionForm.tsx
 * @description Formulario reutilizable para depósito, retiro y avance con RHF + Zod.
 * @responsibilities Validar monto, disparar acción y limpiar.
 * @dependencies react-hook-form, zod, resolvers, UI Input y Button.
 * @diagram [RHF] -> [onSubmit] -> store action
 */
'use client';
import * as React from 'react'; // react
import { useForm } from 'react-hook-form'; // RHF
import { z } from 'zod'; // zod local
import { zodResolver } from '@hookform/resolvers/zod'; // resolver
import { Input } from '@/components/ui/input'; // input
import { Button } from '@/components/ui/button'; // botón
import { amountSchema, advanceAmountSchema } from '@/lib/validation'; // esquemas

// Tipos de formulario
type Mode = 'deposit' | 'withdraw' | 'advance'; // modo

interface Props {
  // props
  mode: Mode; // modo
  onSubmit: (amount: number) => void | boolean; // callback
}

// Esquemas por modo
const schemas: Record<Mode, z.ZodTypeAny> = {
  deposit: amountSchema, // depósito
  withdraw: amountSchema, // retiro
  advance: advanceAmountSchema, // avance
};

export function TransactionForm({ mode, onSubmit }: Props) {
  // estado local del formulario
  const {
    register, // registrar campos
    handleSubmit, // manejador submit
    reset, // reset form
    formState: { errors, isSubmitting }, // estado
  } = useForm<{ amount: number }>({
    resolver: zodResolver(z.object({ amount: schemas[mode] })), // valida monto
    defaultValues: { amount: 0 }, // valor inicial
  });

  // envío del formulario
  const submit = (data: { amount: number }) => {
    const ok = onSubmit(data.amount); // ejecuta acción
    if (ok !== false) reset(); // si éxito, limpia
  };

  // etiquetas por modo
  const labels: Record<Mode, string> = {
    deposit: 'Depositar',
    withdraw: 'Retirar',
    advance: 'Avance de dinero',
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="space-y-3"
      aria-label={`Formulario ${labels[mode]}`}
    >
      {' '}
      {/* form */}
      <div className="space-y-1">
        {' '}
        {/* campo */}
        <label htmlFor="amount" className="text-xs text-subtle">
          Monto (COP)
        </label>{' '}
        {/* label */}
        <Input
          id="amount"
          type="number"
          step="1000"
          min={0}
          aria-invalid={!!errors.amount}
          {...register('amount', { valueAsNumber: true })}
        />{' '}
        {/* input */}
        {errors.amount && (
          <p className="text-xs text-red-300" role="alert">
            {errors.amount.message as string}
          </p> // error
        )}
      </div>
      <div className="flex gap-2">
        {' '}
        {/* acciones */}
        <Button type="submit" disabled={isSubmitting} aria-label={labels[mode]}>
          {labels[mode]}
        </Button>
      </div>
    </form>
  );
}
