function Movies() {
  const { DataTable, Badge, Button, Input, Select, Dialog, Toast, IconButton } = window.MovieGoDesignSystem_a2f949;
  const [rows, setRows] = React.useState(window.MG_ADMIN.movies);
  const [open, setOpen] = React.useState(false);
  const [q, setQ] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [toast, setToast] = React.useState(null);
  const tone = { 'Now showing': 'success', 'Coming soon': 'info', Ending: 'warning' };
  const add = () => { if (!title.trim()) return; setRows((r) => [{ id: Date.now(), title, genre: 'Drama', runtime: '—', age: 'PG', status: 'Coming soon', shows: 0 }, ...r]); setOpen(false); setToast(title); setTitle(''); setTimeout(() => setToast(null), 3000); };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <PageHead title="Movies" sub={rows.length + ' titles in the catalogue'} actions={<Button iconLeft="plus" onClick={() => setOpen(true)}>Add movie</Button>} />
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}><Input iconLeft="search" placeholder="Search titles" value={q} onChange={(e) => setQ(e.target.value)} style={{ width: 320 }} /><Select options={['All statuses', 'Now showing', 'Coming soon', 'Ending']} /></div>
      <DataTable columns={[{ key: 'title', label: 'Title', render: (r) => <span style={{ fontWeight: 600 }}>{r.title}</span> }, { key: 'genre', label: 'Genre', muted: true }, { key: 'runtime', label: 'Runtime', mono: true, muted: true },
        { key: 'age', label: 'Rating', render: (r) => <Badge variant="outline">{r.age}</Badge> }, { key: 'status', label: 'Status', render: (r) => <Badge tone={tone[r.status]}>{r.status}</Badge> },
        { key: 'shows', label: 'Shows', align: 'right', mono: true }, { key: 'x', label: '', align: 'right', width: 90, render: () => <span style={{ display: 'inline-flex', gap: 4 }}><IconButton icon="pencil" label="Edit" variant="ghost" size={32} /><IconButton icon="trash-2" label="Delete" variant="ghost" size={32} /></span> }]}
        rows={rows.filter((r) => r.title.toLowerCase().includes(q.toLowerCase()))} />
      <Dialog open={open} title="Add movie" width={480} onClose={() => setOpen(false)} actions={<><Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={add} disabled={!title.trim()}>Add movie</Button></>}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 8 }}>
          <Input label="Title" placeholder="e.g. The Velvet Hour" value={title} onChange={(e) => setTitle(e.target.value)} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}><Select label="Genre" options={['Drama', 'Action', 'Thriller', 'Sci-Fi', 'Romance']} /><Select label="Age rating" options={['G', 'PG', 'PG-13', 'R']} /></div>
          <Input label="Runtime (minutes)" placeholder="118" mono />
        </div>
      </Dialog>
      {toast && <Toast tone="success" title={'“' + toast + '” added'} message="Schedule showtimes to put it on sale." style={{ position: 'fixed', right: 24, bottom: 24 }} />}
    </div>
  );
}
window.Movies = Movies;
