import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function Tabs({ items = [], value, onChange, style }) {
  return (
    <div role="tablist" style={{ display: 'flex', gap: 36, borderBottom: '1px solid var(--border-default)', ...style }}>
      {items.map((it) => {
        const on = it.id === value;
        return (
          <button key={it.id} role="tab" aria-selected={on} onClick={() => onChange && onChange(it.id)}
            style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 10, padding: '0 0 16px', background: 'none', border: 0, cursor: 'pointer',
              color: on ? '#fff' : 'var(--text-tertiary)', font: (on ? '700 18px' : '500 14px') + '/1 ' + (on ? 'var(--font-display)' : 'var(--font-body)'), transition: 'color var(--dur-base)' }}>
            {it.icon && <Icon name={it.icon} size={on ? 22 : 18} />}
            {it.label}
            {on && <span style={{ position: 'absolute', left: it.icon ? 'calc(50% + 16px)' : '50%', bottom: 4, width: 5, height: 5, marginLeft: -2.5, borderRadius: 3, background: 'var(--accent)' }}></span>}
          </button>
        );
      })}
    </div>
  );
}
