import React from 'react';
import { Icon } from '../core/Icon.jsx';
const T = { success: ['circle-check', 'var(--success)'], error: ['circle-alert', 'var(--danger)'], info: ['info', 'var(--info)'], warning: ['clock', 'var(--warning)'] };
export function Toast({ tone = 'info', title, message, onClose, style }) {
  const [icon, c] = T[tone] || T.info;
  return (
    <div role="status" style={{ display: 'flex', alignItems: 'flex-start', gap: 12, width: 360, maxWidth: '100%', padding: '14px 16px', boxSizing: 'border-box', background: 'var(--surface-raised)',
      border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', ...style }}>
      <Icon name={icon} size={20} color={c} style={{ marginTop: 1 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ font: '600 14px/1.3 var(--font-body)', color: '#fff' }}>{title}</div>
        {message && <div style={{ font: '400 13px/1.45 var(--font-body)', color: 'var(--text-secondary)', marginTop: 3 }}>{message}</div>}
      </div>
      {onClose && <button aria-label="Dismiss" onClick={onClose} style={{ background: 'none', border: 0, padding: 2, color: 'var(--text-tertiary)', cursor: 'pointer' }}><Icon name="x" size={16} /></button>}
    </div>
  );
}
