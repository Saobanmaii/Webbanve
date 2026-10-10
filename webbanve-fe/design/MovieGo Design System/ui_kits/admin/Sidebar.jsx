function Sidebar({ page, go }) {
  const { Icon } = window.MovieGoDesignSystem_a2f949;
  const items = [['dashboard', 'layout-dashboard', 'Dashboard'], ['movies', 'film', 'Movies'], ['showtimes', 'clock', 'Showtimes'], ['cinemas', 'building-2', 'Cinemas'], ['reports', 'bar-chart-3', 'Revenue reports']];
  return (
    <aside style={{ width: 'var(--sidebar-width)', flexShrink: 0, background: 'var(--surface-1)', borderRight: '1px solid var(--border-subtle)', padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: 28, boxSizing: 'border-box', minHeight: '100vh' }}>
      <div style={{ padding: '0 10px', display: 'flex', alignItems: 'baseline', gap: 8 }}><span style={{ font: '800 22px/1 var(--font-display)', letterSpacing: '-0.02em' }}>Movie<span style={{ color: 'var(--accent)' }}>Go</span></span><span style={{ font: '600 10px var(--font-body)', letterSpacing: '.14em', color: 'var(--text-tertiary)' }}>ADMIN</span></div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {items.map(([id, icon, label]) => { const on = page === id; return (
          <a key={id} onClick={() => go(id)} style={{ display: 'flex', alignItems: 'center', gap: 12, height: 40, padding: '0 12px', borderRadius: 'var(--radius-md)', cursor: 'pointer', font: (on ? '600' : '500') + ' 14px var(--font-body)',
            color: on ? '#fff' : 'var(--text-secondary)', background: on ? 'var(--surface-3)' : 'transparent', position: 'relative' }}>
            {on && <span style={{ position: 'absolute', left: -16, top: 10, bottom: 10, width: 3, borderRadius: 2, background: 'var(--accent)' }}></span>}
            <Icon name={icon} size={18} color={on ? 'var(--accent)' : 'currentColor'} />{label}</a>); })}
      </nav>
      <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 10, padding: '12px 10px', borderTop: '1px solid var(--border-subtle)' }}>
        <span style={{ width: 32, height: 32, borderRadius: 16, background: 'var(--ink-600)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', font: '700 12px var(--font-body)' }}>RK</span>
        <div><div style={{ font: '600 13px var(--font-body)' }}>Rina Kato</div><div style={{ font: '400 12px var(--font-body)', color: 'var(--text-tertiary)' }}>Operations manager</div></div>
      </div>
    </aside>
  );
}
function PageHead({ title, sub, actions }) {
  return (<div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20 }}><div><h1 style={{ margin: 0, font: '700 30px/1.15 var(--font-display)', letterSpacing: '-0.01em' }}>{title}</h1>{sub && <p style={{ margin: '6px 0 0', color: 'var(--text-secondary)' }}>{sub}</p>}</div><div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>{actions}</div></div>);
}
function Panel({ title, right, children, style }) {
  return (<section style={{ background: 'var(--surface-1)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 20, ...style }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}><h2 style={{ margin: 0, font: '700 16px var(--font-display)' }}>{title}</h2>{right}</div>{children}</section>);
}
Object.assign(window, { Sidebar, PageHead, Panel });
