import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function StatCard({ label, value, delta, icon, caption, style }) {
  const up = delta != null && !String(delta).trim().startsWith('-');
  return (
    <div style={{ background: 'var(--surface-1)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 20, display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0, ...style }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ font: '600 11px/1 var(--font-body)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>{label}</span>
        {icon && <Icon name={icon} size={18} color="var(--text-tertiary)" />}
      </div>
      <div style={{ font: '800 32px/1 var(--font-display)', letterSpacing: '-0.02em' }}>{value}</div>
      {(delta != null || caption) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, font: '500 12px/1 var(--font-body)', color: 'var(--text-tertiary)' }}>
          {delta != null && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, color: up ? 'var(--success)' : 'var(--danger)', fontWeight: 600 }}><Icon name={up ? 'trending-up' : 'trending-down'} size={14} />{delta}</span>}
          {caption}
        </div>
      )}
    </div>
  );
}
