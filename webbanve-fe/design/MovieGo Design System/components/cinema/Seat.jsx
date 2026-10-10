import React, { useState } from 'react';
const S = {
  available: { bg: 'var(--seat-available)', bd: 'var(--seat-available-border)', fg: 'transparent' },
  selected: { bg: 'var(--seat-selected)', bd: 'var(--seat-selected)', fg: '#fff' },
  taken: { bg: 'var(--seat-taken)', bd: 'var(--seat-taken-border)', fg: 'transparent' },
  vip: { bg: 'transparent', bd: 'var(--seat-vip)', fg: 'transparent' },
  accessible: { bg: 'transparent', bd: 'var(--seat-accessible)', fg: 'transparent' },
};
export function Seat({ state = 'available', label, size, onClick, style }) {
  const [hover, setHover] = useState(false);
  const s = S[state] || S.available;
  const taken = state === 'taken';
  const sel = state === 'selected';
  const px = size || 'var(--seat-size)';
  return (
    <button type="button" aria-label={label + ' ' + state} disabled={taken} onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ width: px, height: px, padding: 0, borderRadius: 'var(--seat-radius)', background: hover && !taken && !sel ? 'var(--seat-hover)' : s.bg,
        border: (state === 'vip' || state === 'accessible' ? 1.5 : 1) + 'px solid ' + s.bd, boxShadow: sel ? 'var(--glow-accent)' : 'none',
        color: hover && !taken ? '#fff' : s.fg, font: '600 9.5px/1 var(--font-mono)', cursor: taken ? 'not-allowed' : 'pointer',
        transform: sel ? 'scale(1.08)' : 'none', transition: 'transform var(--dur-base) var(--ease-spring), background var(--dur-fast), box-shadow var(--dur-base)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', ...style }}>
      {taken ? <span style={{ width: '40%', height: 1.5, background: 'var(--ink-600)', transform: 'rotate(-45deg)', display: 'block' }}></span> : label && String(label).replace(/^[A-Z]/, '')}
    </button>
  );
}
