import React, { useState } from 'react';
export function Chip({ children, selected, onClick, size = 'md', style }) {
  const [hover, setHover] = useState(false);
  const h = size === 'sm' ? 28 : 34;
  return (
    <button type="button" onClick={onClick} aria-pressed={!!selected} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ height: h, padding: '0 ' + (size === 'sm' ? 12 : 16) + 'px', borderRadius: 'var(--radius-pill)', border: '1px solid ' + (selected ? 'var(--accent)' : hover ? 'var(--border-default)' : 'transparent'),
        background: selected ? 'var(--accent)' : hover ? 'rgba(255,255,255,.06)' : 'transparent', color: selected ? '#fff' : 'var(--text-primary)',
        font: '500 ' + (size === 'sm' ? 13 : 15) + 'px/1 var(--font-body)', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all var(--dur-base) var(--ease-out)', ...style }}>
      {children}
    </button>
  );
}
