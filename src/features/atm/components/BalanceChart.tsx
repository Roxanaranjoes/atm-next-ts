/**
 * @file src/features/atm/components/BalanceChart.tsx
 * @description Pequeño gráfico de línea del saldo a lo largo de transacciones.
 * @responsibilities Renderizar SVG responsivo sin dependencias externas.
 * @dependencies React.
 * @diagram [SVG] -> [polyline]
 */
'use client';
import * as React from 'react';

interface Point {
  // punto
  x: number; // x
  y: number; // y
}

interface BalanceChartProps {
  // props
  balances: number[]; // lista de saldos cronológicos (más antiguo primero)
}

export function BalanceChart({ balances }: BalanceChartProps) {
  // dimensiones base
  const width = 280; // ancho
  const height = 100; // alto
  const padding = 8; // padding

  // evita vacío
  if (balances.length === 0) {
    return <div className="text-xs text-subtle">Sin datos suficientes</div>; // mensaje
  }

  // normaliza puntos
  const min = Math.min(...balances); // mínimo
  const max = Math.max(...balances); // máximo
  const range = Math.max(1, max - min); // rango

  const pts: Point[] = balances.map((b, i) => ({
    x: padding + (i * (width - padding * 2)) / Math.max(1, balances.length - 1), // x espaciada
    y: height - padding - ((b - min) / range) * (height - padding * 2), // y invertida
  })); // mapea

  const d = pts.map((p) => `${p.x},${p.y}`).join(' '); // cadena polyline

  return (
    <svg
      width={width}
      height={height}
      role="img"
      aria-label="Gráfico de saldo"
      className="w-full"
    >
      {' '}
      {/* svg */}
      <defs>
        <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
          {' '}
          {/* gradiente */}
          <stop offset="0%" stopColor="#24d3ee" stopOpacity="0.6" />{' '}
          {/* inicio */}
          <stop offset="100%" stopColor="#24d3ee" stopOpacity="0.05" />{' '}
          {/* fin */}
        </linearGradient>
      </defs>
      <polyline points={d} fill="none" stroke="url(#grad)" strokeWidth="2" />{' '}
      {/* línea */}
    </svg>
  );
}
