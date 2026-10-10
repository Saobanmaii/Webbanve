function FlowHeader({ step, go, back }) {
  const { Stepper, IconButton } = window.MovieGoDesignSystem_a2f949;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24, padding: '24px var(--gutter)', borderBottom: '1px solid var(--border-subtle)' }}>
      <IconButton icon="arrow-left" label="Back" onClick={back} />
      <Stepper steps={['Showtime', 'Seats', 'Payment', 'Done']} current={step} style={{ flex: 1, maxWidth: 640 }} />
    </div>
  );
}
window.FlowHeader = FlowHeader;
const PRICE = 13.5, VIP = 18;
window.MG_PRICE = (seats) => { const vip = seats.filter((s) => s[0] === 'H').length, std = seats.length - vip; const fee = seats.length ? 1.5 : 0; return { std, vip, fee, total: std * PRICE + vip * VIP + fee }; };
const money = (n) => '$' + n.toFixed(2);
window.MG_MONEY = money;
function SeatSelect({ id, show, go }) {
  const { SeatMap, BookingSummary, MoviePoster, Badge, Toast } = window.MovieGoDesignSystem_a2f949;
  const D = window.MG_DATA; const m = D.movies.find((x) => x.id === id) || D.movies[0];
  show = show || { cinema: 'MovieGo Central', time: '19:45', fmt: 'IMAX' };
  const [sel, setSel] = React.useState([]);
  const toggle = (s) => setSel((x) => x.includes(s) ? x.filter((y) => y !== s) : x.length >= 8 ? x : [...x, s]);
  const p = window.MG_PRICE(sel);
  const lines = [p.std && { label: p.std + ' × Standard', value: money(p.std * PRICE) }, p.vip && { label: p.vip + ' × VIP', value: money(p.vip * VIP) }, sel.length && { label: 'Booking fee', value: money(p.fee) }].filter(Boolean);
  return (
    <div>
      <FlowHeader step={1} back={() => go({ name: 'movie', id: m.id })} />
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 360px', gap: 40, padding: '40px var(--gutter) 80px', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <SeatMap rows={['A','B','C','D','E','F','G','H']} seatsPerRow={14} taken={D.taken} vipRows={['H']} accessible={['A1','A14']} selected={sel} onToggle={toggle} />
          <Toast tone="warning" title="Seats are held for 10 minutes" message="Up to 8 seats per booking. Row H is VIP recliner seating." />
        </div>
        <BookingSummary style={{ position: 'sticky', top: 24 }} title={m.title} poster={<MoviePoster title={m.title} width={72} showMeta={false} />}
          format={<Badge tone="gold" variant="solid">{show.fmt}</Badge>} cinema={show.cinema + ' · Hall 4'} datetime={'Thu 15 Oct · ' + show.time}
          seats={sel} lines={lines} total={money(p.total)} ctaLabel="Continue to payment" ctaDisabled={!sel.length} onCta={() => go({ name: 'pay', id: m.id, show, seats: sel })} />
      </div>
    </div>
  );
}
window.SeatSelect = SeatSelect;
