function MovieDetail({ id, go }) {
  const { Button, Rating, Badge, DateStrip, ShowtimeChip, MoviePoster, Icon } = window.MovieGoDesignSystem_a2f949;
  const D = window.MG_DATA; const m = D.movies.find((x) => x.id === id) || D.movies[0];
  const [day, setDay] = React.useState('d1');
  const [pick, setPick] = React.useState(null);
  return (
    <div>
      <Backdrop seed={m.title} height={460}>
        <div style={{ position: 'absolute', left: 'var(--gutter)', right: 'var(--gutter)', bottom: 40, display: 'flex', gap: 32, alignItems: 'flex-end' }}>
          <MoviePoster title={m.title} width={180} showMeta={false} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 620 }}>
            <a onClick={() => go({ name: 'home' })} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, font: '500 13px var(--font-body)', color: 'var(--text-secondary)', cursor: 'pointer' }}><Icon name="arrow-left" size={15} />All movies</a>
            <h1 style={{ margin: 0, font: '800 56px/0.95 var(--font-display)', letterSpacing: '-0.02em', textTransform: 'uppercase' }}>{m.title}</h1>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', font: '500 13px var(--font-body)', color: 'var(--text-secondary)' }}><Rating value={m.rating} /><Badge variant="outline">{m.age}</Badge><span>{m.runtime}</span><span>{m.genre}</span></div>
            <p style={{ margin: 0, font: '400 15px/1.5 var(--font-body)', color: 'var(--text-secondary)' }}>{m.synopsis}</p>
          </div>
        </div>
      </Backdrop>
      <div style={{ padding: '32px var(--gutter) 120px', display: 'flex', flexDirection: 'column', gap: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
          <h2 style={{ margin: 0, font: '700 22px/1.15 var(--font-display)' }}>Choose a showtime</h2>
          <DateStrip days={D.days} value={day} onChange={setDay} />
        </div>
        {D.cinemas.map((c) => (
          <div key={c.id} style={{ display: 'grid', gridTemplateColumns: '260px minmax(0,1fr)', gap: 24, padding: '20px 0', borderTop: '1px solid var(--border-subtle)' }}>
            <div><div style={{ font: '600 16px var(--font-body)' }}>{c.name}</div><div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6, font: '400 13px var(--font-body)', color: 'var(--text-tertiary)' }}><Icon name="map-pin" size={14} />{c.area}</div></div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>{c.times.map(([t, fmt, left]) => { const k = c.id + t; return <ShowtimeChip key={k} time={t} format={fmt} seatsLeft={left} soldOut={left === 0} selected={pick && pick.key === k} onClick={() => setPick({ key: k, cinema: c.name, time: t, fmt })} />; })}</div>
          </div>
        ))}
      </div>
      {pick && (
        <div style={{ position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 30, background: 'var(--surface-glass)', backdropFilter: 'var(--blur-glass)', borderTop: '1px solid var(--border-subtle)', padding: '16px var(--gutter)', display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ flex: 1 }}><div style={{ font: '600 15px var(--font-body)' }}>{m.title} · {pick.fmt}</div><div style={{ font: '400 13px var(--font-body)', color: 'var(--text-secondary)', marginTop: 2 }}>{pick.cinema} · Thu 15 Oct · <span style={{ fontFamily: 'var(--font-mono)' }}>{pick.time}</span></div></div>
          <Button size="lg" iconRight="arrow-right" onClick={() => go({ name: 'seats', id: m.id, show: pick })}>Select seats</Button>
        </div>
      )}
    </div>
  );
}
window.MovieDetail = MovieDetail;
