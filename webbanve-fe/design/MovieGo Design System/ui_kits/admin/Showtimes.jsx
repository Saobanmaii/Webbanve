function Showtimes() {
  const { DataTable, Badge, Button, Select, Switch, DateStrip } = window.MovieGoDesignSystem_a2f949;
  const [rows, setRows] = React.useState(window.MG_ADMIN.showtimes);
  const [day, setDay] = React.useState('d1');
  const flip = (id, v) => setRows((r) => r.map((x) => x.id === id ? { ...x, live: v } : x));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <PageHead title="Showtimes" sub="Publish, pause and schedule screenings" actions={<Button iconLeft="calendar-plus">Schedule showtime</Button>} />
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', justifyContent: 'space-between' }}>
        <DateStrip value={day} onChange={setDay} days={[['d0','Wed',14],['d1','Thu',15],['d2','Fri',16],['d3','Sat',17],['d4','Sun',18]].map(([id, weekday, d]) => ({ id, weekday, day: d }))} />
        <div style={{ display: 'flex', gap: 10 }}><Select options={['All cinemas', 'Central', 'Riverside', 'Harbour']} /><Select options={['All formats', '2D', 'IMAX', 'Dolby', '4DX']} /></div>
      </div>
      <DataTable columns={[{ key: 'movie', label: 'Movie', render: (r) => <span style={{ fontWeight: 600 }}>{r.movie}</span> }, { key: 'cinema', label: 'Cinema · Hall', muted: true, render: (r) => r.cinema + ' · ' + r.hall },
        { key: 'date', label: 'Date', mono: true, muted: true }, { key: 'time', label: 'Time', mono: true },
        { key: 'fmt', label: 'Format', render: (r) => <Badge tone={r.fmt === 'IMAX' ? 'gold' : 'neutral'} variant={r.fmt === 'IMAX' ? 'solid' : 'soft'}>{r.fmt}</Badge> },
        { key: 'sold', label: 'Occupancy', width: 200, render: (r) => { const p = Math.round((r.sold / r.cap) * 100); return (<div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ flex: 1, height: 6, borderRadius: 3, background: 'var(--ink-700)' }}><span style={{ display: 'block', height: '100%', width: p + '%', borderRadius: 3, background: p > 90 ? 'var(--warning)' : 'var(--accent)' }}></span></span><span style={{ font: '500 12px var(--font-mono)', color: 'var(--text-secondary)', width: 34, textAlign: 'right' }}>{p}%</span></div>); } },
        { key: 'live', label: 'On sale', render: (r) => <Switch checked={r.live} onChange={(v) => flip(r.id, v)} /> }]} rows={rows} />
    </div>
  );
}
function Cinemas() {
  const { DataTable, Button, IconButton } = window.MovieGoDesignSystem_a2f949;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <PageHead title="Cinemas" sub="Venues, halls and seating capacity" actions={<Button iconLeft="plus">Add cinema</Button>} />
      <DataTable columns={[{ key: 'name', label: 'Cinema', render: (r) => <span style={{ fontWeight: 600 }}>{r.name}</span> }, { key: 'city', label: 'Location', muted: true }, { key: 'halls', label: 'Halls', align: 'right', mono: true }, { key: 'seats', label: 'Seats', align: 'right', mono: true }, { key: 'occ', label: 'Avg. occupancy', align: 'right', mono: true }, { key: 'x', label: '', align: 'right', width: 60, render: () => <IconButton icon="pencil" label="Edit" variant="ghost" size={32} /> }]} rows={window.MG_ADMIN.cinemas} />
    </div>
  );
}
function Reports() {
  const { BarList, StatCard, Select, Button } = window.MovieGoDesignSystem_a2f949;
  const A = window.MG_ADMIN;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <PageHead title="Revenue reports" sub="Gross ticket revenue by movie" actions={<><Select size="sm" options={['This week', 'This month', 'This quarter']} /><Button size="sm" variant="secondary" iconLeft="download">CSV</Button></>} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 16 }}><StatCard label="Gross revenue" value="$77,150" delta="+12.4%" icon="banknote" /><StatCard label="Avg. ticket" value="$13.05" delta="+0.8%" icon="receipt" /><StatCard label="Top title" value="Night Shift" caption="24% of revenue" icon="trophy" /></div>
      <Panel title="By movie"><BarList items={A.revenue} /></Panel>
    </div>
  );
}
Object.assign(window, { Showtimes, Cinemas, Reports });
