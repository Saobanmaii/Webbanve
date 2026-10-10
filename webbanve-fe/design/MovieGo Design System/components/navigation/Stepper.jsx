import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function Stepper({ steps = [], current = 0, style }) {
  return (
    <ol style={{ display: 'flex', alignItems: 'center', gap: 12, listStyle: 'none', margin: 0, padding: 0, ...style }}>
      {steps.map((s, i) => {
        const done = i < current, on = i === current;
        return (
          <React.Fragment key={s}>
            <li style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 26, height: 26, borderRadius: 13, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', font: '700 12px/1 var(--font-body)',
                background: done ? 'var(--accent)' : on ? '#fff' : 'transparent', color: done ? '#fff' : on ? '#000' : 'var(--text-tertiary)', border: '1.5px solid ' + (done ? 'var(--accent)' : on ? '#fff' : 'var(--border-strong)') }}>
                {done ? <Icon name="check" size={14} strokeWidth={3} /> : i + 1}
              </span>
              <span style={{ font: (on ? '600' : '500') + ' 13px/1 var(--font-body)', color: on ? '#fff' : done ? 'var(--text-secondary)' : 'var(--text-tertiary)', whiteSpace: 'nowrap' }}>{s}</span>
            </li>
            {i < steps.length - 1 && <li aria-hidden="true" style={{ flex: 1, minWidth: 24, height: 1.5, background: done ? 'var(--accent)' : 'var(--border-default)' }}></li>}
          </React.Fragment>
        );
      })}
    </ol>
  );
}
