import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function Checkbox({ label, checked, onChange, disabled, style }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.45 : 1, font: '400 14px/1.3 var(--font-body)', color: 'var(--text-primary)', ...style }}>
      <input type="checkbox" checked={!!checked} disabled={disabled} onChange={(e) => onChange && onChange(e.target.checked)} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
      <span style={{ width: 18, height: 18, borderRadius: 5, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        background: checked ? 'var(--accent)' : 'var(--surface-2)', border: '1px solid ' + (checked ? 'var(--accent)' : 'var(--border-strong)'), transition: 'all var(--dur-fast) var(--ease-out)' }}>
        {checked && <Icon name="check" size={13} strokeWidth={3} color="#fff" />}
      </span>
      {label}
    </label>
  );
}
