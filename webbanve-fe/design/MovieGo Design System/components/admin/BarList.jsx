import React from 'react';
export function BarList({ items = [], max, color = 'var(--accent)', style }) {
  const m = max || Math.max(1, ...items.map((i) => i.value));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, ...style }}>
      {items.map((it, i) => (
        <div key={it.label} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,180px) minmax(0,1fr) 90px', alignItems: 'center', gap: 16 }}>
          <span style={{ font: '500 13px/1.2 var(--font-body)', color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{it.label}</span>
          <span style={{ height: 8, borderRadius: 4, background: 'var(--ink-700)', overflow: 'hidden' }}>
            <span style={{ display: 'block', height: '100%', width: (it.value / m) * 100 + '%', borderRadius: 4, background: color, opacity: 1 - i * 0.08 }}></span>
          </span>
          <span style={{ textAlign: 'right', font: '600 13px/1 var(--font-mono)', color: 'var(--text-secondary)' }}>{it.display ?? it.value}</span>
        </div>
      ))}
    </div>
  );
}
