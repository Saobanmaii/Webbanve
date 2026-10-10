import React, { useState } from 'react';
export function ShowtimeChip({ time, format, seatsLeft, selected, soldOut, onClick, style }) {
  const [hover, setHover] = useState(false);
  const low = seatsLeft != null && seatsLeft <= 10 && !soldOut;
  return (
    <button type="button" disabled={soldOut} onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start', gap: 5, minWidth: 96, padding: '10px 14px', borderRadius: 'var(--radius-md)', textAlign: 'left',
        background: selected ? 'var(--accent)' : hover && !soldOut ? 'var(--surface-3)' : 'var(--surface-2)', border: '1px solid ' + (selected ? 'var(--accent)' : hover && !soldOut ? 'var(--border-strong)' : 'var(--border-default)'),
        boxShadow: selected ? 'var(--glow-accent)' : 'none', cursor: soldOut ? 'not-allowed' : 'pointer', opacity: soldOut ? 0.4 : 1, transition: 'all var(--dur-base) var(--ease-out)', ...style }}>
      <span style={{ font: '600 17px/1 var(--font-mono)', color: '#fff', textDecoration: soldOut ? 'line-through' : 'none' }}>{time}</span>
      <span style={{ font: '600 10.5px/1 var(--font-body)', letterSpacing: '0.08em', textTransform: 'uppercase', color: selected ? 'rgba(255,255,255,.85)' : low ? 'var(--warning)' : 'var(--text-tertiary)' }}>
        {soldOut ? 'Sold out' : low ? seatsLeft + ' left' : format}
      </span>
    </button>
  );
}
