/**
 * @file src/components/ui/scroll-area.tsx
 * @description Área con scroll estilizado.
 * @responsibilities Encapsular overflow con padding.
 * @dependencies React, clsx.
 * @diagram [ScrollArea] -> <div class='overflow-auto'>
 */
'use client';
import * as React from 'react';
import { clsx } from 'clsx';

export function ScrollArea({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx('overflow-auto [scrollbar-width:thin]', className)}
      {...props}
    />
  );
}
