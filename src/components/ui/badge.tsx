/**
 * @file src/components/ui/badge.tsx
 * @description Badge simple para estados.
 * @responsibilities Mostrar etiquetas como "Moroso".
 * @dependencies React, clsx.
 * @diagram [Badge] -> <span>
 */
'use client';
import * as React from 'react';
import { clsx } from 'clsx';

export function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-subtle',
        className,
      )}
      {...props}
    />
  );
}
