// Vé của tôi — theo design ui_kits/web/Bookings.jsx
// Luồng:
//   GET /bookings?userId={user.userId} -> danh sách đơn -> sắp mới nhất lên đầu -> lọc theo tab
//   Đơn PENDING: "Thanh toán" (sang trang pay) / "Hủy"
//   Đơn PAID chưa chiếu: "Xem vé" (trang done) / "Hủy vé"
//   Hủy -> Dialog xác nhận -> PATCH /bookings/{id}/cancel -> tải lại danh sách
// Đơn cũ đã hủy có thể thiếu movieTitle/cinemaName/startTime (null) -> hiện "Không rõ".
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import bookingApi from '../api/bookingApi'
import { getErrorMessage } from '../api/axiosClient'
import { useAuth } from '../auth/AuthContext'
import useMoviePoster from '../hooks/useMoviePoster'
import { Badge, Button, Dialog, Icon, MoviePoster, Tabs } from '../ds'
import { BOOKING_STATUS, bookingRef, formatLongDate, formatMoney, formatTime } from '../utils/format'

const TABS = [
  { id: 'all', label: 'Tất cả' },
  { id: 'upcoming', label: 'Sắp chiếu' },
  { id: 'past', label: 'Đã qua' },
  { id: 'cancelled', label: 'Đã hủy' },
]
const STATUS_TONE = { PENDING: 'warning', PAID: 'success', CANCELLED: 'neutral' }

// Suất đã chiếu chưa? (không có startTime thì coi như đã qua)
const isPast = (b) => !b.startTime || new Date(b.startTime) < new Date()

function matchTab(b, tab) {
  if (tab === 'cancelled') return b.bookingStatus === 'CANCELLED'
  if (tab === 'upcoming') return b.bookingStatus !== 'CANCELLED' && !isPast(b)
  if (tab === 'past') return b.bookingStatus !== 'CANCELLED' && isPast(b)
  return true
}

export default function MyBookingsPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [tab, setTab] = useState('all')
  const [toCancel, setToCancel] = useState(null) // đơn đang hỏi xác nhận hủy
  const posterOf = useMoviePoster()

  function load() {
    return bookingApi
      .getByUser(user.userId)
      .then((list) => setBookings([...list].sort((a, b) => b.bookingTime.localeCompare(a.bookingTime))))
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [user.userId])

  async function confirmCancel() {
    try {
      await bookingApi.cancel(toCancel.bookingId)
      setToCancel(null)
      load()
    } catch (err) {
      setError(getErrorMessage(err))
      setToCancel(null)
    }
  }

  const list = bookings.filter((b) => matchTab(b, tab))

  return (
    <div className="container" style={{ maxWidth: 1000, display: 'flex', flexDirection: 'column', gap: 28 }}>
      <h1 className="confirm-title">Vé của tôi</h1>
      <Tabs value={tab} onChange={setTab} items={TABS} />
      {error && <p className="alert-error">{error}</p>}
      {loading && <p className="muted">Đang tải...</p>}
      {!loading && list.length === 0 && (
        <div className="muted" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          Chưa có vé nào ở mục này.
          <Button size="sm" variant="outline" iconLeft="film" onClick={() => navigate('/')}>Đặt vé ngay</Button>
        </div>
      )}

      {list.map((b) => {
        const seats = (b.tickets || []).map((t) => t.seatCode)
        const cancelled = b.bookingStatus === 'CANCELLED'
        const past = isPast(b)
        return (
          <div key={b.bookingId} className={'booking-card' + (cancelled || past ? ' dim' : '')}>
            <MoviePoster title={b.movieTitle || '?'} src={posterOf(b)} width={64} showMeta={false} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ font: '700 18px var(--font-display)' }}>{b.movieTitle || 'Không rõ phim'}</span>
                <Badge tone={STATUS_TONE[b.bookingStatus]}>{BOOKING_STATUS[b.bookingStatus]}</Badge>
              </div>
              <div className="booking-meta">
                <span><Icon name="map-pin" size={14} />{b.cinemaName ? `${b.cinemaName} · ${b.roomName}` : 'Không rõ rạp'}</span>
                <span><Icon name="calendar-days" size={14} />
                  {b.startTime ? `${formatLongDate(b.startTime.slice(0, 10))} · ${formatTime(b.startTime)}` : 'Không rõ giờ'}
                </span>
              </div>
              <div style={{ font: '500 12px var(--font-mono)', color: 'var(--text-tertiary)' }}>
                {bookingRef(b.bookingId)}{seats.length > 0 && ` · ${seats.join(' ')}`}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-end' }}>
              <span style={{ font: '700 18px var(--font-display)' }}>{formatMoney(b.totalPrice)}</span>
              <div style={{ display: 'flex', gap: 8 }}>
                {!cancelled && !past && (
                  <Button size="sm" variant="ghost" onClick={() => setToCancel(b)}>
                    {b.bookingStatus === 'PAID' ? 'Hủy vé' : 'Hủy'}
                  </Button>
                )}
                {b.bookingStatus === 'PENDING' && !past && (
                  <Button size="sm" iconLeft="credit-card" onClick={() => navigate(`/bookings/${b.bookingId}/pay`)}>Thanh toán</Button>
                )}
                {b.bookingStatus === 'PAID' && (
                  <Button size="sm" iconLeft="ticket" onClick={() => navigate(`/bookings/${b.bookingId}/done`)}>Xem vé</Button>
                )}
                {cancelled && (
                  <Button size="sm" variant="outline" onClick={() => navigate('/')}>Đặt lại</Button>
                )}
              </div>
            </div>
          </div>
        )
      })}

      <Dialog open={!!toCancel} title="Hủy đơn đặt vé?" onClose={() => setToCancel(null)}
        actions={<>
          <Button variant="ghost" onClick={() => setToCancel(null)}>Giữ lại</Button>
          <Button onClick={confirmCancel}>Hủy đơn</Button>
        </>}>
        {toCancel && <>
          Đơn {bookingRef(toCancel.bookingId)} ({toCancel.movieTitle || 'không rõ phim'}) sẽ bị hủy và các ghế
          {' '}{(toCancel.tickets || []).map((t) => t.seatCode).join(', ')} được nhả cho người khác.
        </>}
      </Dialog>
    </div>
  )
}
