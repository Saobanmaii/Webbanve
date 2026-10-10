function Payment({ id, show, seats = [], go }) {
  const { Input, Checkbox, Button, BookingSummary, MoviePoster, Badge, Icon, Dialog } = window.MovieGoDesignSystem_a2f949;
  const D = window.MG_DATA; const m = D.movies.find((x) => x.id === id) || D.movies[0];
  show = show || { cinema: 'MovieGo Central', time: '19:45', fmt: 'IMAX' };
  if (!seats.length) seats = ['F7', 'F8'];
  const [method, setMethod] = React.useState('card');
  const [agree, setAgree] = React.useState(true);
  const [busy, setBusy] = React.useState(false);
  const [leave, setLeave] = React.useState(false);
  const p = window.MG_PRICE(seats), money = window.MG_MONEY;
  const pay = () => { setBusy(true); setTimeout(() => go({ name: 'done', id: m.id, show, seats, total: money(p.total) }), 1100); };
  const Method = ({ id: mid, icon, label }) => (
    <button onClick={() => setMethod(mid)} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px', borderRadius: 'var(--radius-md)', cursor: 'pointer', color: '#fff', font: '600 14px var(--font-body)',
      background: method === mid ? 'var(--accent-soft)' : 'var(--surface-2)', border: '1px solid ' + (method === mid ? 'var(--accent)' : 'var(--border-default)') }}><Icon name={icon} size={18} />{label}</button>
  );
  return (
    <div>
      <FlowHeader step={2} back={() => setLeave(true)} />
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 360px', gap: 40, padding: '40px var(--gutter) 80px', alignItems: 'start' }}>
        <div style={{ maxWidth: 560, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div><h2 style={{ margin: 0, font: '700 30px/1.15 var(--font-display)', letterSpacing: '-0.01em' }}>Payment</h2><p style={{ margin: '6px 0 0', color: 'var(--text-secondary)' }}>This is a simulated checkout. No real charge is made.</p></div>
          <div style={{ display: 'flex', gap: 10 }}><Method id="card" icon="credit-card" label="Card" /><Method id="wallet" icon="wallet" label="Wallet" /><Method id="bank" icon="landmark" label="Bank transfer" /></div>
          <Input label="Name on card" defaultValue="Sam Lee" />
          <Input label="Card number" iconLeft="credit-card" defaultValue="4242 4242 4242 4242" mono />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}><Input label="Expiry" defaultValue="08 / 28" mono /><Input label="CVC" defaultValue="123" mono hint="3 digits on the back" /></div>
          <Input label="Email for tickets" iconLeft="mail" defaultValue="sam.lee@mail.com" />
          <Checkbox label="I agree to the booking and refund terms" checked={agree} onChange={setAgree} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, font: '400 12px var(--font-body)', color: 'var(--text-tertiary)' }}><Icon name="lock" size={14} />Payments are encrypted end to end.</div>
        </div>
        <BookingSummary style={{ position: 'sticky', top: 24 }} title={m.title} poster={<MoviePoster title={m.title} width={72} showMeta={false} />}
          format={<Badge tone="gold" variant="solid">{show.fmt}</Badge>} cinema={show.cinema + ' · Hall 4'} datetime={'Thu 15 Oct · ' + show.time} seats={seats}
          lines={[{ label: seats.length + ' tickets', value: money(p.total - p.fee) }, { label: 'Booking fee', value: money(p.fee) }]} total={money(p.total)}
          ctaLabel={busy ? 'Processing…' : 'Pay ' + money(p.total)} ctaDisabled={!agree || busy} onCta={pay} />
      </div>
      <Dialog open={leave} title="Release your seats?" onClose={() => setLeave(false)}
        actions={<><Button variant="ghost" onClick={() => setLeave(false)}>Keep seats</Button><Button onClick={() => go({ name: 'seats', id: m.id, show })}>Release seats</Button></>}>
        Seats {seats.join(' and ')} will become available to other moviegoers.
      </Dialog>
    </div>
  );
}
window.Payment = Payment;
