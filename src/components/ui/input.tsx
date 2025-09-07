/**
 * @file src/components/ui/input.tsx
 * @description Input simple estilizado (shadcn-like).
 * @responsibilities Proveer campo accesible con focus ring.
 * @dependencies React, clsx.
 * @diagram [Input] -> <input className=...>
 */
'use client';
import * as React from 'react';
import { clsx } from 'clsx';

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(function Input({ className, type = 'text', ...props }, ref) {
  return (
    <input
      ref={ref}
      type={type}
      className={clsx(
        'flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm placeholder:text-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon',
        className,
      )}
      {...props}
    />
  );
});
