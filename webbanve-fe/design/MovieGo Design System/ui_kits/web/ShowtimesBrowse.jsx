const stHash = (s) => { let h = 7; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h; };
const ST_SLOTS = ['10:30','11:45','13:10','14:00','15:20','16:30','17:15','18:40','19:45','20:30','21:30','22:10','23:50'];
function stSchedule(movie, cinema, day) {
  const h = stHash(movie.id + cinema.id + day);
  if (h % 5 === 0) return [];
  const n = 2 + (h % 4), out = [];
  for (let i = 0; i < ST_SLOTS.length && out.length < n; i++) if ((h >> i) & 1) out.push(ST_SLOTS[i]);
  return out.map((t, i) => {
    const r = (h >> (i + 3)) % 9;
    const fmt = movie.format === 'IMAX' && cinema.id === 'central' && i % 2 ? 'IMAX' : cinema.id === 'riverside' && r === 2 ? 'Dolby' : cinema.id === 'harbour' && r === 3 ? '4DX' : '2D';
    return [t, fmt, r === 0 ? 0 : r === 1 ? 7 : undefined];
  });
}
function ShowtimesBrowse({ go }) {
  const { DateStrip, ShowtimeChip, MoviePoster, Rating, Badge, Button, Icon } = window.MovieGoDesignSystem_a2f949;
  const D = window.MG_DATA;
  const [day, setDay] = React.useState('d0');
  const [cinemaId, setCinemaId] = React.useState(D.cinemas[0].id);
  const [pick, setPick] = React.useState(null);
  const dayObj = D.days.find((d) => d.id === day);
  const dayLabel = (dayObj.weekday === 'Today' ? 'Today' : dayObj.weekday) + ' ' + dayObj.day + ' Oct';
  const cinema = D.cinemas.find((c) => c.id === cinemaId);
  const chips = (m, c) => {
    const times = stSchedule(m, c, day);
    if (!times.length) return <span style={{ font: '400 13px var(--font-body)', color: 'var(--text-tertiary)' }}>No showtimes on this day</span>;
    return times.map(([t, fmt, left]) => { const k = m.id + c.id + day + t; return <ShowtimeChip key={k} time={t} format={fmt} seatsLeft={left} soldOut={left === 0} selected={pick && pick.key === k} onClick={() => setPick({ key: k, movie: m, cinema: c.name, time: t, fmt })} />; });
  };
  const listItem = (on, onClick, children) => (
    <button onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 14, width: '100%', padding: 10, textAlign: 'left', border: 0, borderRadius: 'var(--radius-md)', cursor: 'pointer', color: 'var(--text-primary)', background: on ? 'var(--ink-700)' : 'transparent', boxShadow: on ? 'inset 0 0 0 1px var(--border-default)' : 'none', transition: 'background var(--dur-base)' }}>{children}</button>
  );
  const rows = D.movies.map((m) => ({ key: m.id, head: <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}><MoviePoster title={m.title} width={52} showMeta={false} /><div><a onClick={() => go({ name: 'movie', id: m.id })} style={{ font: '600 16px var(--font-body)', cursor: 'pointer', color: 'var(--text-primary)' }}>{m.title}</a><div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6, font: '400 13px var(--font-body)', color: 'var(--text-tertiary)' }}><Badge variant="outline">{m.age}</Badge>{m.runtime}</div></div></div>, body: chips(m, cinema) }));
  return (
    <div style={{ padding: '32px var(--gutter) 140px', display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h1 style={{ margin: 0, font: '800 44px/0.95 var(--font-display)', letterSpacing: '-0.02em', textTransform: 'uppercase' }}>Showtimes</h1>
          <p style={{ margin: 0, font: '400 15px var(--font-body)', color: 'var(--text-secondary)' }}>Choose a cinema to see what's playing.</p>
        </div>
        <DateStrip days={D.days} value={day} onChange={(d) => { setDay(d); setPick(null); }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(220px,280px) minmax(0,1fr)', gap: 32, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, position: 'sticky', top: 'calc(var(--nav-height) + 16px)' }}>
          <div style={{ font: '600 11px var(--font-body)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-tertiary)', padding: '0 10px 8px' }}>Cinemas</div>
          {D.cinemas.map((c) => <React.Fragment key={c.id}>{listItem(c.id === cinemaId, () => { setCinemaId(c.id); setPick(null); }, <><span style={{ width: 40, height: 40, flex: 'none', borderRadius: 'var(--radius-md)', background: 'var(--ink-600)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}><Icon name="building-2" size={18} /></span><div><div style={{ font: '600 14px var(--font-body)' }}>{c.name}</div><div style={{ marginTop: 4, font: '400 12px var(--font-body)', color: 'var(--text-tertiary)' }}>{c.area}</div></div></>)}</React.Fragment>)}
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, paddingBottom: 16 }}>
            <h2 style={{ margin: 0, font: '700 22px/1.15 var(--font-display)' }}>{cinema.name}</h2>
            <span style={{ font: '400 14px var(--font-body)', color: 'var(--text-secondary)' }}>{dayLabel}</span>
          </div>
          {rows.map((r) => (
            <div key={r.key} style={{ display: 'grid', gridTemplateColumns: '260px minmax(0,1fr)', gap: 24, alignItems: 'center', padding: '18px 0', borderTop: '1px solid var(--border-subtle)' }}>
              {r.head}
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>{r.body}</div>
            </div>
          ))}
        </div>
      </div>
      {pick && (
        <div style={{ position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 30, background: 'var(--surface-glass)', backdropFilter: 'var(--blur-glass)', borderTop: '1px solid var(--border-subtle)', padding: '16px var(--gutter)', display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ flex: 1 }}><div style={{ font: '600 15px var(--font-body)' }}>{pick.movie.title} · {pick.fmt}</div><div style={{ font: '400 13px var(--font-body)', color: 'var(--text-secondary)', marginTop: 2 }}>{pick.cinema} · {dayLabel} · <span style={{ fontFamily: 'var(--font-mono)' }}>{pick.time}</span></div></div>
          <Button size="lg" iconRight="arrow-right" onClick={() => go({ name: 'seats', id: pick.movie.id, show: { key: pick.key, cinema: pick.cinema, time: pick.time, fmt: pick.fmt } })}>Select seats</Button>
        </div>
      )}
    </div>
  );
}
window.ShowtimesBrowse = ShowtimesBrowse;
