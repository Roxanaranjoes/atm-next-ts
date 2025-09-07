/**
 * @file src/features/atm/components/ATMTerminal.tsx
 * @description Panel "terminal" del ATM: menú cíclico, atajos, logs y formularios.
 * @responsibilities Mostrar opciones, manejar foco/esc, y disparar acciones del store.
 * @dependencies Zustand store, useKeyboardShortcuts, UI, Notifications, framer-motion.
 * @diagram [Terminal] -> [Menu | Form] -> [Actions] -> [Notifications]
 */
'use client';
import * as React from 'react'; // react
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // card
import { Button } from '@/components/ui/button'; // botón
import { ScrollArea } from '@/components/ui/scroll-area'; // scroll
import { TransactionForm } from './TransactionForm'; // formulario
import { useATMStore } from '@/store/atm'; // store
import { useKeyboardShortcuts, MenuKey } from '@/hooks/useKeyboardShortcuts'; // atajos
import { formatCOP, formatDate } from '@/lib/format'; // formato
import { Notifications, type Notice } from './Notifications'; // notificaciones
import confetti from 'canvas-confetti'; // confetti
import { Terminal } from 'lucide-react'; // icono
import { uuid } from '@/lib/uuid'; // uuid

type View = 'menu' | 'deposit' | 'withdraw' | 'advance' | 'history' | 'balance'; // vistas

export function ATMTerminal() {
  // estado de vista actual
  const [view, setView] = React.useState<View>('menu'); // vista
  const [notices, setNotices] = React.useState<Notice[]>([]); // notificaciones

  // acceso al store
  const { balance, history, deposit, withdraw, advance } = useATMStore(); // store

  // foco en el primer botón del menú
  const firstBtnRef = React.useRef<HTMLButtonElement | null>(null); // ref
  React.useEffect(() => {
    firstBtnRef.current?.focus();
  }, [view]); // enfoca al cambiar vista

  // atajos de teclado
  useKeyboardShortcuts({
    onSelect: (key: MenuKey) => {
      if (key === 'exit') return; // salir: no hacemos nada en simulador
      if (key === 'balance') setView('balance'); // balance
      if (key === 'deposit') setView('deposit'); // depósito
      if (key === 'withdraw') setView('withdraw'); // retiro
      if (key === 'advance') setView('advance'); // avance
      if (key === 'history') setView('history'); // historial
    },
    onEscape: () => setView('menu'), // ESC vuelve al menú
  });

  // dispara notificación con auto-dismiss
  const pushNotice = (text: string) => {
    const id = uuid(); // id
    setNotices((prev) => [...prev, { id, text }]); // agrega
    setTimeout(
      () => setNotices((prev) => prev.filter((n) => n.id !== id)),
      2500,
    ); // auto cierra
  };

  // manejar envíos de formularios
  const handleDeposit = (amount: number) => {
    deposit(amount); // acción
    pushNotice(`Depósito de ${formatCOP(amount)} realizado`); // aviso
    if (amount >= 300_000)
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.8 } }); // confetti
  };
  const handleWithdraw = (amount: number) => {
    const ok = withdraw(amount); // intenta
    if (!ok) {
      pushNotice('Retiro inválido: monto excede saldo');
      return false;
    } // inválido
    pushNotice(`Retiro de ${formatCOP(amount)} realizado`); // aviso
    return true; // éxito
  };
  const handleAdvance = (amount: number) => {
    advance(amount); // acción
    pushNotice(`Avance de ${formatCOP(amount)} realizado`); // aviso
  };

  // render del panel
  return (
    <Card aria-label="Panel terminal ATM">
      {' '}
      {/* card */}
      <CardHeader>
        {' '}
        {/* header */}
        <CardTitle className="inline-flex items-center gap-2">
          {' '}
          {/* título */}
          <Terminal className="h-4 w-4" aria-hidden /> {/* icon */}
          Terminal
        </CardTitle>
      </CardHeader>
      <CardContent>
        {' '}
        {/* contenido */}
        {view === 'menu' && (
          <div className="space-y-2" aria-label="Menú principal">
            {' '}
            {/* menú */}
            <div className="text-xs text-subtle">
              Atajos: 1=Consultar, 2=Depositar, 3=Retirar, 5=Avance, 4=Salir,
              ESC=Menú, H=Historial
            </div>{' '}
            {/* ayuda */}
            <div className="grid gap-2 sm:grid-cols-2">
              {' '}
              {/* grid */}
              <Button ref={firstBtnRef} onClick={() => setView('balance')}>
                Consultar saldo
              </Button>{' '}
              {/* opción */}
              <Button onClick={() => setView('deposit')}>Depositar</Button>{' '}
              {/* opción */}
              <Button onClick={() => setView('withdraw')}>Retirar</Button>{' '}
              {/* opción */}
              <Button onClick={() => setView('advance')}>
                Avance de dinero
              </Button>{' '}
              {/* opción */}
              <Button onClick={() => setView('history')}>Historial</Button>{' '}
              {/* opción */}
              <Button
                variant="outline"
                aria-label="Salir"
                onClick={() => setView('menu')}
              >
                Salir
              </Button>{' '}
              {/* opción */}
            </div>
          </div>
        )}
        {view === 'balance' && (
          <div className="space-y-2" aria-live="polite">
            {' '}
            {/* balance */}
            <p>
              Saldo actual:{' '}
              <span className="font-semibold text-neon">
                {formatCOP(balance)}
              </span>
            </p>{' '}
            {/* saldo */}
            <Button onClick={() => setView('menu')}>
              Volver al menú (ESC)
            </Button>{' '}
            {/* volver */}
          </div>
        )}
        {view === 'deposit' && (
          <div className="space-y-2">
            {' '}
            {/* depósito */}
            <TransactionForm mode="deposit" onSubmit={handleDeposit} />{' '}
            {/* form */}
            <Button variant="ghost" onClick={() => setView('menu')}>
              Cancelar
            </Button>{' '}
            {/* cancelar */}
          </div>
        )}
        {view === 'withdraw' && (
          <div className="space-y-2">
            {' '}
            {/* retiro */}
            <TransactionForm mode="withdraw" onSubmit={handleWithdraw} />{' '}
            {/* form */}
            <Button variant="ghost" onClick={() => setView('menu')}>
              Cancelar
            </Button>{' '}
            {/* cancelar */}
          </div>
        )}
        {view === 'advance' && (
          <div className="space-y-2">
            {' '}
            {/* avance */}
            <TransactionForm mode="advance" onSubmit={handleAdvance} />{' '}
            {/* form */}
            <Button variant="ghost" onClick={() => setView('menu')}>
              Cancelar
            </Button>{' '}
            {/* cancelar */}
          </div>
        )}
        {view === 'history' && (
          <div className="space-y-2">
            {' '}
            {/* historial */}
            <ScrollArea className="max-h-60">
              {' '}
              {/* scroll */}
              <ul className="space-y-1" aria-label="Historial de transacciones">
                {' '}
                {/* lista */}
                {history.length === 0 && (
                  <li className="text-xs text-subtle">Sin transacciones</li> // vacío
                )}
                {history.map((tx) => (
                  <li
                    key={tx.id}
                    className="flex items-center justify-between gap-3"
                  >
                    {' '}
                    {/* item */}
                    <span className="text-xs">
                      <span className="uppercase text-subtle">{tx.type}</span> —{' '}
                      {formatCOP(tx.amount)} — {formatDate(tx.date)}
                    </span>
                    <span className="text-xs text-neon">
                      {formatCOP(tx.resultBalance)}
                    </span>
                  </li>
                ))}
              </ul>
            </ScrollArea>
            <Button variant="ghost" onClick={() => setView('menu')}>
              Volver
            </Button>{' '}
            {/* volver */}
          </div>
        )}
      </CardContent>
      <Notifications
        notices={notices}
        onDismiss={(id) => setNotices((n) => n.filter((x) => x.id !== id))}
      />{' '}
      {/* notifs */}
    </Card>
  );
}
