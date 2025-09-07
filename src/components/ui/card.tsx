/**
 * @file src/components/ui/card.tsx
 * @description Contenedor Card simplificado.
 * @responsibilities Proveer panel con borde y sombra suave.
 * @dependencies React, clsx.
 * @diagram [Card] -> <div role=group>
 */
'use client';
import * as React from 'react';
import { clsx } from 'clsx';

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="group"
      className={clsx(
        'rounded-xl border border-white/10 bg-black/30 p-4 soft-shadow',
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx('mb-2 flex items-center justify-between', className)}
      {...props}
    />
  );
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={clsx('text-lg font-semibold text-neon', className)}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx('text-sm', className)} {...props} />;
}
