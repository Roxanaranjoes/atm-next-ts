/**
 * @file src/components/ui/switch.tsx
 * @description Switch accesible simple.
 * @responsibilities Toggle booleano con ARIA.
 * @dependencies React, clsx.
 * @diagram [Switch] -> <button role=switch>
 */
'use client';
import * as React from 'react';
import { clsx } from 'clsx';

interface SwitchProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  checked: boolean; // estado
  onCheckedChange?: (checked: boolean) => void; // cambio
}

export function Switch({
  checked,
  onCheckedChange,
  className,
  ...props
}: SwitchProps) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange?.(!checked)}
      className={clsx(
        'relative inline-flex h-6 w-10 items-center rounded-full transition-colors',
        checked ? 'bg-neon/60' : 'bg-white/10',
        className,
      )}
      {...props}
    >
      <span
        className={clsx(
          'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
          checked ? 'translate-x-5' : 'translate-x-1',
        )}
      />
    </button>
  );
}
