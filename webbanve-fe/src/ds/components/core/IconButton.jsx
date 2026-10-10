import React, { useState } from 'react';
import { Icon } from './Icon.jsx';
export function IconButton({ icon, label, variant = 'glass', size = 40, active, disabled, onClick, style }) {
  const [hover, setHover] = useState(false);
  const bg = { glass: hover ? 'rgba(255,255,255,.16)' : 'rgba(255,255,255,.08)', solid: hover ? 'var(--accent-hover)' : 'var(--accent)', ghost: hover ? 'rgba(255,255,255,.08)' : 'transparent' }[variant];
  return (
    <button type="button" aria-label={label} title={label} disabled={disabled} onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ width: size, height: size, borderRadius: 'var(--radius-pill)', border: '1px solid ' + (variant === 'glass' ? 'var(--border-subtle)' : 'transparent'),
        background: active ? 'var(--accent)' : bg, color: active || variant === 'solid' ? '#fff' : hover ? 'var(--text-primary)' : 'var(--text-secondary)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.4 : 1,
        backdropFilter: variant === 'glass' ? 'var(--blur-glass)' : undefined, transition: 'all var(--dur-base) var(--ease-out)', padding: 0, ...style }}>
      <Icon name={icon} size={Math.round(size * 0.45)} />
    </button>
  );
}
