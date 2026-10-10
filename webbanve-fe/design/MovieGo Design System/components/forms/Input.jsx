import React, { useState } from 'react';
import { Icon } from '../core/Icon.jsx';
export function Input({ label, hint, error, iconLeft, placeholder, value, defaultValue, onChange, type = 'text', disabled, mono, style }) {
  const [focus, setFocus] = useState(false);
  const bd = error ? 'var(--danger)' : focus ? 'var(--border-focus)' : 'var(--border-default)';
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label && <span style={{ font: '600 12px/1.2 var(--font-body)', color: 'var(--text-secondary)' }}>{label}</span>}
      <span style={{ display: 'flex', alignItems: 'center', gap: 10, height: 44, padding: '0 14px', borderRadius: 'var(--radius-md)', background: 'var(--surface-2)',
        border: '1px solid ' + bd, boxShadow: focus && !error ? '0 0 0 3px rgba(227,38,46,.18)' : 'none', opacity: disabled ? 0.5 : 1, transition: 'all var(--dur-base) var(--ease-out)' }}>
        {iconLeft && <Icon name={iconLeft} size={17} color="var(--text-tertiary)" />}
        <input type={type} placeholder={placeholder} value={value} defaultValue={defaultValue} onChange={onChange} disabled={disabled}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{ flex: 1, minWidth: 0, background: 'transparent', border: 0, outline: 'none', color: 'var(--text-primary)', font: (mono ? '500 14px var(--font-mono)' : '400 14px var(--font-body)'), letterSpacing: mono ? '0.04em' : 0 }} />
      </span>
      {(error || hint) && <span style={{ font: '400 12px/1.3 var(--font-body)', color: error ? 'var(--danger)' : 'var(--text-tertiary)' }}>{error || hint}</span>}
    </label>
  );
}
