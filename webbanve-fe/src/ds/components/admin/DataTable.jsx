import React, { useState } from 'react';
export function DataTable({ columns = [], rows = [], rowKey = 'id', onRowClick, style }) {
  const [hover, setHover] = useState(null);
  return (
    <div style={{ background: 'var(--surface-1)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', ...style }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead><tr>{columns.map((c) => (
          <th key={c.key} style={{ textAlign: c.align || 'left', padding: '12px 16px', font: '600 11px/1 var(--font-body)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-tertiary)', borderBottom: '1px solid var(--border-subtle)', background: 'var(--surface-2)', width: c.width }}>{c.label}</th>
        ))}</tr></thead>
        <tbody>{rows.map((r, i) => (
          <tr key={r[rowKey] ?? i} onClick={() => onRowClick && onRowClick(r)} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
            style={{ background: hover === i ? 'var(--surface-3)' : 'transparent', cursor: onRowClick ? 'pointer' : 'default', transition: 'background var(--dur-fast)' }}>
            {columns.map((c) => (
              <td key={c.key} style={{ textAlign: c.align || 'left', padding: '12px 16px', font: (c.mono ? '500 13px var(--font-mono)' : '400 14px/1.3 var(--font-body)'), color: c.muted ? 'var(--text-secondary)' : '#fff', borderBottom: i < rows.length - 1 ? '1px solid var(--border-subtle)' : 0, verticalAlign: 'middle' }}>
                {c.render ? c.render(r) : r[c.key]}
              </td>
            ))}
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}
