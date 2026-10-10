import React from 'react';
import { Seat } from './Seat.jsx';
export function SeatMap({ rows = ['A','B','C','D','E','F','G','H'], seatsPerRow = 14, aisles = [3, 10], taken = [], vipRows = [], accessible = [], selected = [], onToggle, showLegend = true, style }) {
  const legend = [['available', 'Available'], ['selected', 'Selected'], ['taken', 'Taken'], ['vip', 'VIP'], ['accessible', 'Accessible']];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, ...style }}>
      <div style={{ width: '82%', textAlign: 'center' }}>
        <div style={{ height: 34, borderTop: '3px solid var(--red-400)', borderRadius: '50% 50% 0 0 / 100% 100% 0 0', background: 'radial-gradient(60% 100% at 50% 0%, var(--screen-glow), transparent 80%)' }}></div>
        <div style={{ font: '600 10.5px/1 var(--font-body)', letterSpacing: '0.4em', color: 'var(--text-tertiary)', marginTop: -16 }}>SCREEN</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--seat-gap)' }}>
        {rows.map((r) => (
          <div key={r} style={{ display: 'flex', alignItems: 'center', gap: 'var(--seat-gap)' }}>
            <span style={{ width: 18, font: '600 11px/1 var(--font-mono)', color: 'var(--text-tertiary)' }}>{r}</span>
            {Array.from({ length: seatsPerRow }, (_, i) => {
              const id = r + (i + 1);
              const st = selected.includes(id) ? 'selected' : taken.includes(id) ? 'taken' : accessible.includes(id) ? 'accessible' : vipRows.includes(r) ? 'vip' : 'available';
              return (
                <React.Fragment key={id}>
                  <Seat label={id} state={st} onClick={() => onToggle && onToggle(id)} />
                  {aisles.includes(i + 1) && <span style={{ width: 14 }}></span>}
                </React.Fragment>
              );
            })}
            <span style={{ width: 18, textAlign: 'right', font: '600 11px/1 var(--font-mono)', color: 'var(--text-tertiary)' }}>{r}</span>
          </div>
        ))}
      </div>
      {showLegend && (
        <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap', justifyContent: 'center' }}>
          {legend.map(([s, l]) => (
            <span key={s} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, font: '500 12px/1 var(--font-body)', color: 'var(--text-secondary)' }}>
              <Seat state={s} size={16} style={{ pointerEvents: 'none', transform: 'none' }} />{l}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
