function Dashboard({ go }) {
  const { StatCard, BarList, DataTable, Badge, Button, Select } = window.MovieGoDesignSystem_a2f949;
  const A = window.MG_ADMIN;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <PageHead title="Dashboard" sub="Week of 12–18 Oct · all cinemas" actions={<><Select size="sm" options={['This week', 'Last week', 'This month']} /><Button size="sm" variant="secondary" iconLeft="download">Export</Button></>} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 16 }}>
        <StatCard label="Revenue" value="$77,150" delta="+12.4%" caption="vs last week" icon="banknote" />
        <StatCard label="Tickets sold" value="5,912" delta="+6.1%" caption="vs last week" icon="ticket" />
        <StatCard label="Occupancy" value="71%" delta="-2.3%" caption="avg. per show" icon="armchair" />
        <StatCard label="Shows" value="214" caption="across 13 halls" icon="clock" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.3fr) minmax(0,1fr)', gap: 16 }}>
        <Panel title="Revenue by movie" right={<a onClick={() => go('reports')} style={{ font: '600 13px var(--font-body)', cursor: 'pointer' }}>Full report</a>}><BarList items={A.revenue.slice(0, 6)} /></Panel>
        <Panel title="Cinemas"><DataTable style={{ border: 0, margin: '-4px -20px -20px' }} columns={[{ key: 'name', label: 'Cinema' }, { key: 'halls', label: 'Halls', align: 'right', mono: true }, { key: 'occ', label: 'Occ.', align: 'right', mono: true }]} rows={A.cinemas} /></Panel>
      </div>
      <Panel title="Tonight's showtimes" right={<Button size="sm" variant="ghost" iconRight="arrow-right" onClick={() => go('showtimes')}>All showtimes</Button>}>
        <DataTable style={{ border: 0, margin: '-4px -20px -20px' }} columns={[{ key: 'movie', label: 'Movie' }, { key: 'cinema', label: 'Cinema', muted: true, render: (r) => r.cinema + ' · ' + r.hall }, { key: 'time', label: 'Time', mono: true },
          { key: 'fmt', label: 'Format', render: (r) => <Badge tone={r.fmt === 'IMAX' ? 'gold' : 'neutral'} variant={r.fmt === 'IMAX' ? 'solid' : 'soft'}>{r.fmt}</Badge> },
          { key: 'sold', label: 'Sold', align: 'right', mono: true, render: (r) => r.sold + ' / ' + r.cap }]} rows={A.showtimes.filter((s) => s.live)} />
      </Panel>
    </div>
  );
}
window.Dashboard = Dashboard;
