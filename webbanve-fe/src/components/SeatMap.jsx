// Sơ đồ ghế vẽ từ dữ liệu thật của BE (GET /showtimes/{id}/seats).
// Dùng <Seat> của design; SeatMap gốc của design chia VIP theo cả hàng, còn BE trả loại ghế theo TỪNG ghế
// nên ta tự vẽ lưới: gom ghế theo rowLabel, sắp theo seatNumber.
import { Seat } from '../ds'

// Màu ghế: đang chọn > đã đặt > VIP (viền vàng) > đôi (viền xanh) > thường
function stateOf(seat, selectedIds) {
  if (selectedIds.includes(seat.seatId)) return 'selected'
  if (seat.booked) return 'taken'
  if (seat.seatType === 'VIP') return 'vip'
  if (seat.seatType === 'COUPLE') return 'accessible'
  return 'available'
}

const LEGEND = [
  ['available', 'Ghế thường'], ['vip', 'VIP'], ['accessible', 'Ghế đôi'],
  ['selected', 'Đang chọn'], ['taken', 'Đã đặt'],
]

export default function SeatMap({ seats, selectedIds, onToggle }) {
  // { A: [ghế...], B: [...] }
  const rows = {}
  seats.forEach((s) => (rows[s.rowLabel] ||= []).push(s))
  const rowLabels = Object.keys(rows).sort()
  rowLabels.forEach((r) => rows[r].sort((a, b) => a.seatNumber - b.seatNumber))

  const rowLabelStyle = { width: 18, font: '600 11px/1 var(--font-mono)', color: 'var(--text-tertiary)' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
      {/* Màn hình */}
      <div style={{ width: '82%', textAlign: 'center' }}>
        <div style={{ height: 34, borderTop: '3px solid var(--red-400)', borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
          background: 'radial-gradient(60% 100% at 50% 0%, var(--screen-glow), transparent 80%)' }} />
        <div style={{ font: '600 10.5px/1 var(--font-body)', letterSpacing: '0.4em', color: 'var(--text-tertiary)', marginTop: -16 }}>
          MÀN HÌNH
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--seat-gap)', overflowX: 'auto', maxWidth: '100%' }}>
        {rowLabels.map((r) => (
          <div key={r} style={{ display: 'flex', alignItems: 'center', gap: 'var(--seat-gap)' }}>
            <span style={rowLabelStyle}>{r}</span>
            {rows[r].map((s) => (
              <Seat key={s.seatId} label={r + s.seatNumber} state={stateOf(s, selectedIds)}
                onClick={() => !s.booked && onToggle(s)} />
            ))}
            <span style={{ ...rowLabelStyle, textAlign: 'right' }}>{r}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap', justifyContent: 'center' }}>
        {LEGEND.map(([state, label]) => (
          <span key={state} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, font: '500 12px/1 var(--font-body)', color: 'var(--text-secondary)' }}>
            <Seat state={state} size={16} style={{ pointerEvents: 'none', transform: 'none' }} />{label}
          </span>
        ))}
      </div>
    </div>
  )
}
