import React from 'react';
export function Switch({ label, checked, onChange, disabled, style }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.45 : 1, font: '400 14px/1.3 var(--font-body)', color: 'var(--text-primary)', ...style }}>
      <input type="checkbox" role="switch" checked={!!checked} disabled={disabled} onChange={(e) => onChange && onChange(e.target.checked)} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
      <span style={{ width: 38, height: 22, borderRadius: 11, padding: 2, boxSizing: 'border-box', background: checked ? 'var(--accent)' : 'var(--ink-600)', transition: 'background var(--dur-base) var(--ease-out)', flexShrink: 0 }}>
        <span style={{ display: 'block', width: 18, height: 18, borderRadius: 9, background: '#fff', transform: checked ? 'translateX(16px)' : 'none', transition: 'transform var(--dur-base) var(--ease-spring)', boxShadow: 'var(--shadow-sm)' }}></span>
      </span>
      {label}
    </label>
  );
}
