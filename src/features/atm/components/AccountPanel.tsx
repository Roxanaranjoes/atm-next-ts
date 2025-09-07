/**
 * @file src/features/atm/components/AccountPanel.tsx
 * @description Panel de estado de cuenta: saldo animado, estado moroso, persistencia y gráfico.
 * @responsibilities Mostrar balance, badge de morosidad, toggle de persistencia y gráfico.
 * @dependencies Zustand store, framer-motion, UI, format libs.
 * @diagram [AccountPanel] -> [Header | Balance | Toggles | Chart]
 */
'use client';
import * as React from 'react'; // react
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // card
import { Badge } from '@/components/ui/badge'; // badge
import { Switch } from '@/components/ui/switch'; // switch
import { Button } from '@/components/ui/button'; // botón
import { useATMStore } from '@/store/atm'; // store
import { formatCOP } from '@/lib/format'; // formato
import { motion, AnimatePresence } from 'framer-motion'; // animaciones
import { BalanceChart } from './BalanceChart'; // gráfico

export function AccountPanel() {
  // lee store
  const {
    balance,
    history,
    delinquent,
    usePersistence,
    togglePersistence,
    reset,
    loadFromStorage,
  } = useATMStore(); // estado y acciones

  // cargar estado desde storage al montar si toggle activo
  React.useEffect(() => {
    if (usePersistence) loadFromStorage();
  }, [usePersistence, loadFromStorage]); // efecto

  // lista de saldos en orden cronológico para gráfico
  const balancesChrono = React.useMemo(() => {
    const base = [1_000_000]; // saldo inicial
    const ordered = [...history].reverse(); // cronológico
    const arr = ordered.reduce<number[]>((acc, tx) => {
      acc.push(tx.resultBalance);
      return acc;
    }, base); // acumula
    return arr; // retorna
  }, [history]); // deps

  return (
    <Card aria-label="Panel de estado de cuenta">
      {' '}
      {/* card */}
      <CardHeader className="items-start">
        {' '}
        {/* header */}
        <CardTitle className="flex items-center gap-2">
          {' '}
          {/* título */}
          Estado de cuenta
          <AnimatePresence>
            {' '}
            {/* presencia */}
            {delinquent && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <Badge className="border-red-400/40 bg-red-400/10 text-red-200">
                  Moroso
                </Badge>{' '}
                {/* badge */}
              </motion.div>
            )}
          </AnimatePresence>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {' '}
        {/* contenido */}
        <div aria-live="polite">
          {' '}
          {/* saldo animado */}
          <motion.div
            key={balance}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="text-3xl font-bold text-neon"
          >
            {formatCOP(balance)}
          </motion.div>
        </div>
        <div className="flex items-center justify-between gap-2">
          {' '}
          {/* toggles */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-subtle">
              Recordar estado (localStorage)
            </span>{' '}
            {/* label */}
            <Switch
              aria-label="Recordar estado"
              checked={usePersistence}
              onCheckedChange={(v) => togglePersistence(v)}
            />{' '}
            {/* switch */}
          </div>
          <Button
            variant="outline"
            onClick={() => reset()}
            aria-label="Reiniciar"
          >
            Reiniciar
          </Button>{' '}
          {/* reset */}
        </div>
        <div>
          {' '}
          {/* gráfico */}
          <BalanceChart balances={balancesChrono} /> {/* graf */}
        </div>
      </CardContent>
    </Card>
  );
}
