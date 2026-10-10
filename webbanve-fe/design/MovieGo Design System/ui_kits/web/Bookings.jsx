function Bookings({ go }) {
  const { Badge, Button, MoviePoster, Tabs, Icon } = window.MovieGoDesignSystem_a2f949;
  const D = window.MG_DATA;
  const [tab, setTab] = React.useState('all');
  const list = D.bookings.filter((b) => tab === 'all' || (tab === 'up' ? b.status === 'Upcoming' : b.status === 'Watched'));
  return (
    <div style={{ padding: '40px var(--gutter) 96px', display: 'flex', flexDirection: 'column', gap: 28, maxWidth: 960 }}>
      <h1 style={{ margin: 0, font: '800 40px/1.1 var(--font-display)', letterSpacing: '-0.02em' }}>My bookings</h1>
      <Tabs value={tab} onChange={setTab} items={[{ id: 'all', label: 'All' }, { id: 'up', label: 'Upcoming' }, { id: 'past', label: 'Past' }]} />
      {list.map((b) => (
        <div key={b.ref} style={{ display: 'flex', gap: 20, alignItems: 'center', padding: 16, background: 'var(--surface-1)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', opacity: b.status === 'Watched' ? 0.75 : 1 }}>
          <MoviePoster title={b.movie} width={64} showMeta={false} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ font: '700 18px var(--font-display)' }}>{b.movie}</span><Badge tone={b.status === 'Upcoming' ? 'success' : 'neutral'}>{b.status}</Badge></div>
            <div style={{ display: 'flex', gap: 18, font: '400 13px var(--font-body)', color: 'var(--text-secondary)' }}><span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}><Icon name="map-pin" size={14} />{b.cinema}</span><span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}><Icon name="calendar-days" size={14} />{b.when}</span></div>
            <div style={{ font: '500 12px var(--font-mono)', color: 'var(--text-tertiary)' }}>{b.ref} · {b.seats.join(' ')}</div>
          </div>
          <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-end' }}><span style={{ font: '700 18px var(--font-display)' }}>{b.total}</span>
            {b.status === 'Upcoming' ? <Button size="sm" iconLeft="qr-code">Show ticket</Button> : <Button size="sm" variant="outline" onClick={() => go({ name: 'home' })}>Book again</Button>}</div>
        </div>
      ))}
    </div>
  );
}
window.Bookings = Bookings;
