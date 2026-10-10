function PosterRow({ movies, go }) {
  const { MoviePoster, Badge } = window.MovieGoDesignSystem_a2f949;
  return (
    <div style={{ display: 'flex', gap: 20, overflowX: 'auto', padding: '6px 0 12px' }}>
      {movies.map((m) => <MoviePoster key={m.id} title={m.title} year={m.year} rating={m.rating} genre={m.genre} width={168}
        badge={m.format && <Badge tone="gold" variant="solid">{m.format}</Badge>} onClick={() => go({ name: 'movie', id: m.id })} />)}
    </div>
  );
}
function Home({ go }) {
  const { Button, Chip, Tabs, Rating, Badge, Select } = window.MovieGoDesignSystem_a2f949;
  const D = window.MG_DATA; const hero = D.movies[0];
  const [tab, setTab] = React.useState('now');
  const [genres, setGenres] = React.useState(['Thriller', 'Drama']);
  const toggle = (g) => setGenres((s) => s.includes(g) ? s.filter((x) => x !== g) : [...s, g]);
  const list = D.movies.filter((m) => !genres.length || genres.includes(m.genre));
  return (
    <div>
      <Backdrop seed={hero.title} height={600}>
        <div style={{ position: 'absolute', left: 'var(--gutter)', bottom: 96, maxWidth: 520, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Badge tone="gold" variant="solid">IMAX</Badge><Badge variant="outline">{hero.age}</Badge><span style={{ font: '600 11px var(--font-body)', letterSpacing: '.14em', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Now showing</span></div>
          <h1 style={{ margin: 0, font: '800 var(--fs-display-xl)/0.95 var(--font-display)', letterSpacing: '-0.02em', textTransform: 'uppercase' }}>{hero.title}</h1>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', font: '500 13px var(--font-body)', color: 'var(--text-secondary)' }}><Rating value={hero.rating} votes="12k" /><span>{hero.year}</span><span>{hero.runtime}</span><span>{hero.genre}</span></div>
          <p style={{ margin: 0, font: '400 16px/1.5 var(--font-body)', color: 'var(--text-secondary)', textWrap: 'pretty' }}>{hero.synopsis}</p>
          <div style={{ display: 'flex', gap: 10, marginTop: 6 }}><Button size="lg" iconLeft="ticket" onClick={() => go({ name: 'movie', id: hero.id })}>Book tickets</Button><Button size="lg" variant="secondary" iconLeft="play">Trailer</Button></div>
        </div>
        <div style={{ position: 'absolute', left: '50%', bottom: 40, display: 'flex', gap: 8, transform: 'translateX(-50%)' }}>{[0,1,2].map((i) => <span key={i} style={{ width: 28, height: 3, borderRadius: 2, background: i === 0 ? '#fff' : 'rgba(255,255,255,.3)' }}></span>)}</div>
      </Backdrop>
      <div style={{ padding: '24px var(--gutter) 80px', display: 'flex', flexDirection: 'column', gap: 24, background: 'var(--haze-red)' }}>
        <Tabs value={tab} onChange={setTab} items={[{ id: 'now', label: 'Now showing', icon: 'trending-up' }, { id: 'soon', label: 'Coming soon', icon: 'calendar-days' }, { id: 'imax', label: 'IMAX', icon: 'clapperboard' }]} />
        <div style={{ display: 'flex', gap: 6, overflowX: 'auto' }}>{D.genres.map((g) => <Chip key={g} selected={genres.includes(g)} onClick={() => toggle(g)}>{g}</Chip>)}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, font: '500 12px var(--font-body)', color: 'var(--text-tertiary)' }}>Sort by <Select size="sm" options={['Popular', 'Rating', 'A–Z']} /><span style={{ marginLeft: 'auto' }}>{list.length} films</span></div>
        <PosterRow movies={tab === 'imax' ? D.movies.filter((m) => m.format) : tab === 'soon' ? [...list].reverse() : list} go={go} />
      </div>
    </div>
  );
}
window.Home = Home;
