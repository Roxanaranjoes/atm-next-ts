/**
 * @file src/components/ui/button.tsx
 * @description Botón inspirado en shadcn/ui con variantes simples.
 * @responsibilities Proveer un botón accesible y estilizado.
 * @dependencies React, clsx.
 * @diagram [Button] -> <button className=...>
 */
'use client'; // cliente
import * as React from 'react'; // react
import { clsx } from 'clsx'; // clsx para clases

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // props
  variant?: 'primary' | 'ghost' | 'outline'; // variantes
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { className, variant = 'primary', ...props }, // props
    ref, // ref
  ) {
    // clases por variante
    const base =
      'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon disabled:opacity-50 disabled:pointer-events-none h-10 px-4 py-2'; // base
    const variants = {
      primary:
        'bg-neon/20 text-foreground border border-neon/40 hover:bg-neon/30 shadow-glow', // primario
      ghost: 'bg-transparent hover:bg-white/5', // ghost
      outline: 'border border-white/10 hover:bg-white/5', // outline
    } as const; // const

    return (
      <button
        ref={ref}
        className={clsx(base, variants[variant], className)}
        {...props}
      /> // botón
    );
  },
);
