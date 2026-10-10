import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function Select({ label, options = [], value, defaultValue, onChange, size = 'md', style }) {
  const pill = size === 'sm';
  return (
    <label style={{ display: 'inline-flex', flexDirection: 'column', gap: 6, ...style }}>
      {label && <span style={{ font: '600 12px/1.2 var(--font-body)', color: 'var(--text-secondary)' }}>{label}</span>}
      <span style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <select value={value} defaultValue={defaultValue} onChange={onChange}
          style={{ appearance: 'none', WebkitAppearance: 'none', width: '100%', height: pill ? 28 : 44, padding: pill ? '0 28px 0 12px' : '0 38px 0 14px',
            borderRadius: pill ? 'var(--radius-pill)' : 'var(--radius-md)', background: pill ? 'rgba(255,255,255,.1)' : 'var(--surface-2)',
            border: '1px solid ' + (pill ? 'transparent' : 'var(--border-default)'), color: 'var(--text-primary)', font: (pill ? '600 12px' : '400 14px') + ' var(--font-body)', cursor: 'pointer', outline: 'none' }}>
          {options.map((o) => { const v = typeof o === 'string' ? o : o.value; const l = typeof o === 'string' ? o : o.label; return <option key={v} value={v} style={{ background: '#17171C' }}>{l}</option>; })}
        </select>
        <Icon name="chevron-down" size={pill ? 13 : 16} color="var(--text-secondary)" style={{ position: 'absolute', right: pill ? 10 : 14, pointerEvents: 'none' }} />
      </span>
    </label>
  );
}
