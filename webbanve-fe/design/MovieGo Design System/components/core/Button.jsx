import React, { useState } from 'react';
import { Icon } from './Icon.jsx';
const SIZES = { sm: { h: 32, px: 14, fs: 12, ic: 15 }, md: { h: 42, px: 20, fs: 14, ic: 17 }, lg: { h: 52, px: 28, fs: 15, ic: 19 } };
export function Button({ children, variant = 'primary', size = 'md', iconLeft, iconRight, fullWidth, disabled, onClick, type = 'button', style }) {
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);
  const s = SIZES[size] || SIZES.md;
  const v = {
    primary: { bg: hover ? 'var(--accent-hover)' : 'var(--accent)', fg: 'var(--text-on-accent)', bd: 'transparent', sh: hover ? 'var(--glow-accent)' : 'none' },
    secondary: { bg: hover ? 'rgba(255,255,255,.18)' : 'rgba(255,255,255,.1)', fg: 'var(--text-primary)', bd: 'transparent', sh: 'none' },
    outline: { bg: hover ? 'rgba(255,255,255,.06)' : 'transparent', fg: 'var(--text-primary)', bd: hover ? 'var(--border-strong)' : 'var(--border-default)', sh: 'none' },
    ghost: { bg: hover ? 'rgba(255,255,255,.06)' : 'transparent', fg: hover ? 'var(--text-primary)' : 'var(--text-secondary)', bd: 'transparent', sh: 'none' },
  }[variant];
  return (
    <button type={type} disabled={disabled} onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)} onMouseUp={() => setPress(false)}
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, height: s.h, padding: '0 ' + s.px + 'px',
        width: fullWidth ? '100%' : undefined, borderRadius: 'var(--radius-pill)', border: '1px solid ' + v.bd, background: v.bg, color: v.fg,
        boxShadow: v.sh, font: '600 ' + s.fs + 'px/1 var(--font-body)', letterSpacing: '0.01em', cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1, transform: press && !disabled ? 'scale(.97)' : 'none', whiteSpace: 'nowrap',
        transition: 'background var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), transform var(--dur-fast) var(--ease-out), border-color var(--dur-base)', ...style }}>
      {iconLeft && <Icon name={iconLeft} size={s.ic} />}
      {children}
      {iconRight && <Icon name={iconRight} size={s.ic} />}
    </button>
  );
}
