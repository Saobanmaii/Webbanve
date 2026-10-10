import React from 'react';
export function DateStrip({ days = [], value, onChange, style }) {
  return (
    <div style={{ display: 'flex', gap: 8, overflowX: 'auto', ...style }}>
      {days.map((d) => {
        const on = d.id === value;
        return (
          <button key={d.id} type="button" onClick={() => onChange && onChange(d.id)}
            style={{ width: 60, height: 72, flexShrink: 0, borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer',
              background: on ? 'var(--accent)' : 'var(--surface-2)', border: '1px solid ' + (on ? 'var(--accent)' : 'var(--border-subtle)'), color: '#fff', transition: 'all var(--dur-base) var(--ease-out)' }}>
            <span style={{ font: '600 10.5px/1 var(--font-body)', letterSpacing: '0.12em', textTransform: 'uppercase', color: on ? 'rgba(255,255,255,.85)' : 'var(--text-tertiary)' }}>{d.weekday}</span>
            <span style={{ font: '800 22px/1 var(--font-display)' }}>{d.day}</span>
          </button>
        );
      })}
    </div>
  );
}
