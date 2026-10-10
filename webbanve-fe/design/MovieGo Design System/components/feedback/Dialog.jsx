import React from 'react';
import { IconButton } from '../core/IconButton.jsx';
export function Dialog({ open = true, title, children, actions, onClose, width = 440, inline, style }) {
  if (!open) return null;
  const panel = (
    <div role="dialog" aria-modal="true" style={{ width, maxWidth: '100%', background: 'var(--surface-raised)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-overlay)', padding: 24, boxSizing: 'border-box', ...style }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
        <div style={{ font: '700 20px/1.2 var(--font-display)', letterSpacing: '-0.01em' }}>{title}</div>
        {onClose && <IconButton icon="x" label="Close" variant="ghost" size={32} onClick={onClose} />}
      </div>
      <div style={{ marginTop: 10, font: '400 14px/1.55 var(--font-body)', color: 'var(--text-secondary)' }}>{children}</div>
      {actions && <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 24 }}>{actions}</div>}
    </div>
  );
  if (inline) return panel;
  return (
    <div onClick={(e) => { if (e.target === e.currentTarget && onClose) onClose(); }}
      style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'var(--surface-overlay)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      {panel}
    </div>
  );
}
