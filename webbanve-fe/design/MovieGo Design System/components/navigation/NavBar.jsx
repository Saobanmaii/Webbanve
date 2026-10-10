import React from 'react';
export function NavBar({ links = [], active, onNavigate, right, transparent, style }) {
  return (
    <header style={{ height: 'var(--nav-height)', display: 'flex', alignItems: 'center', gap: 40, padding: '0 var(--gutter)',
      background: transparent ? 'linear-gradient(180deg,rgba(0,0,0,.75),rgba(0,0,0,0))' : 'var(--surface-glass)', backdropFilter: transparent ? undefined : 'var(--blur-glass)',
      borderBottom: transparent ? '1px solid transparent' : '1px solid var(--border-subtle)', boxSizing: 'border-box', ...style }}>
      <a onClick={() => onNavigate && onNavigate('home')} style={{ font: '800 24px/1 var(--font-display)', letterSpacing: '-0.02em', color: '#fff', cursor: 'pointer', flexShrink: 0 }}>
        Movie<span style={{ color: 'var(--accent)' }}>Go</span>
      </a>
      <nav style={{ display: 'flex', gap: 28, flex: 1 }}>
        {links.map((l) => {
          const id = typeof l === 'string' ? l : l.id; const label = typeof l === 'string' ? l : l.label; const on = id === active;
          return (
            <a key={id} onClick={() => onNavigate && onNavigate(id)} style={{ position: 'relative', font: (on ? '600' : '500') + ' 15px/1 var(--font-body)', color: on ? '#fff' : 'var(--text-secondary)', cursor: 'pointer', padding: '8px 0' }}>
              {label}
              {on && <span style={{ position: 'absolute', left: '50%', bottom: -4, width: 5, height: 5, marginLeft: -2.5, borderRadius: 3, background: 'var(--accent)' }}></span>}
            </a>
          );
        })}
      </nav>
      {right && <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>{right}</div>}
    </header>
  );
}
