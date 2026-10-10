function Confirmation({ id, show, seats = ['F7','F8'], total = '$31.50', go }) {
  const { Button, Badge, Icon, MoviePoster } = window.MovieGoDesignSystem_a2f949;
  const D = window.MG_DATA; const m = D.movies.find((x) => x.id === id) || D.movies[0];
  show = show || { cinema: 'MovieGo Central', time: '19:45', fmt: 'IMAX' };
  const Row = ({ k, v, mono }) => (<div><div style={{ font: '600 11px var(--font-body)', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>{k}</div><div style={{ marginTop: 6, font: mono ? '600 16px var(--font-mono)' : '600 15px var(--font-body)' }}>{v}</div></div>);
  return (
    <div>
      <FlowHeader step={3} back={() => go({ name: 'home' })} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, padding: '56px var(--gutter) 96px' }}>
        <div style={{ width: 56, height: 56, borderRadius: 28, background: 'var(--success-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="check" size={28} color="var(--success)" strokeWidth={2.5} /></div>
        <div style={{ textAlign: 'center' }}><h1 style={{ margin: 0, font: '800 40px/1.1 var(--font-display)', letterSpacing: '-0.02em' }}>You're booked.</h1><p style={{ margin: '8px 0 0', color: 'var(--text-secondary)' }}>Tickets are on their way to sam.lee@mail.com.</p></div>
        <div style={{ width: 640, maxWidth: '100%', display: 'flex', background: 'var(--surface-1)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
          <div style={{ flex: 1, padding: 28, display: 'flex', gap: 20 }}>
            <MoviePoster title={m.title} width={96} showMeta={false} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ font: '800 22px/1 var(--font-display)', textTransform: 'uppercase' }}>{m.title}</span><Badge tone="gold" variant="solid">{show.fmt}</Badge></div>
              <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gap: '16px 32px' }}><Row k="Cinema" v={show.cinema} /><Row k="Hall" v="4" /><Row k="When" v={'Thu 15 Oct · ' + show.time} /><Row k="Seats" v={seats.join(' · ')} mono /></div>
            </div>
          </div>
          <div style={{ width: 170, borderLeft: '2px dashed var(--border-default)', padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', background: 'var(--surface-2)' }}>
            <Row k="Booking ref" v="MG-7Q4K-2291" mono /><Row k="Paid" v={total} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}><Button variant="secondary" iconLeft="calendar-plus">Add to calendar</Button><Button iconLeft="ticket" onClick={() => go({ name: 'bookings' })}>View my bookings</Button></div>
      </div>
    </div>
  );
}
window.Confirmation = Confirmation;
