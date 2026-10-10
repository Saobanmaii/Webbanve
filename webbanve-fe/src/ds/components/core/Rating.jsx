import React from 'react';
import { Icon } from './Icon.jsx';
export function Rating({ value, votes, size = 'md', style }) {
  const fs = size === 'sm' ? 12 : size === 'lg' ? 16 : 13;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, font: '600 ' + fs + 'px/1 var(--font-body)', color: 'var(--text-primary)', ...style }}>
      <Icon name="star" size={fs + 2} color="var(--rating)" fill="var(--rating)" strokeWidth={1.5} />
      {Number(value).toFixed(1)}
      {votes != null && <span style={{ color: 'var(--text-tertiary)', fontWeight: 500 }}>({votes})</span>}
    </span>
  );
}
