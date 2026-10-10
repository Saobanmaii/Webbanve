// Đặt vé thành công — theo design ui_kits/web/Confirmation.jsx (vé dạng cuống vé)
// GET /bookings/{id} -> hiện thông tin vé đã thanh toán
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import bookingApi from '../api/bookingApi'
import { getErrorMessage } from '../api/axiosClient'
import FlowHeader from '../components/FlowHeader'
import useMoviePoster from '../hooks/useMoviePoster'
import { Button, Icon, MoviePoster } from '../ds'
import { BOOKING_STATUS, bookingRef, formatLongDate, formatMoney, formatTime } from '../utils/format'

function Row({ k, v, mono }) {
  return (
    <div>
      <div className="overline" style={{ color: 'var(--text-tertiary)' }}>{k}</div>
      <div style={{ marginTop: 6, font: mono ? '600 16px var(--font-mono)' : '600 15px var(--font-body)' }}>{v}</div>
    </div>
  )
}

export default function ConfirmationPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [b, setB] = useState(null)
  const [error, setError] = useState('')
  const posterOf = useMoviePoster()

  useEffect(() => {
    bookingApi.getById(id).then(setB).catch((err) => setError(getErrorMessage(err)))
  }, [id])

  if (!b) return <div className="container">{error ? <p className="alert-error">{error}</p> : 'Đang tải...'}</div>

  const paid = b.bookingStatus === 'PAID'
  const seats = (b.tickets || []).map((t) => t.seatCode)

  return (
    <div>
      <FlowHeader step={3} onBack={() => navigate('/')} />
      <div className="confirm-wrap">
        <div className="confirm-check"><Icon name="check" size={28} color="var(--success)" strokeWidth={2.5} /></div>
        <div style={{ textAlign: 'center' }}>
          <h1 className="confirm-title">{paid ? 'Đặt vé thành công.' : BOOKING_STATUS[b.bookingStatus]}</h1>
          <p style={{ margin: '8px 0 0', color: 'var(--text-secondary)' }}>
            Đưa mã đặt vé cho nhân viên tại quầy để nhận vé.
          </p>
        </div>

        <div className="ticket">
          <div className="ticket-main">
            <MoviePoster title={b.movieTitle || ''} src={posterOf(b)} width={96} showMeta={false} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <span className="ticket-title">{b.movieTitle || 'Không rõ'}</span>
              <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gap: '16px 32px' }}>
                <Row k="Rạp" v={b.cinemaName || 'Không rõ'} />
                <Row k="Phòng" v={b.roomName || 'Không rõ'} />
                <Row k="Thời gian" v={b.startTime ? `${formatLongDate(b.startTime.slice(0, 10))} · ${formatTime(b.startTime)}` : 'Không rõ'} />
                <Row k="Ghế" v={seats.join(' · ')} mono />
              </div>
            </div>
          </div>
          <div className="ticket-stub">
            <Row k="Mã đặt vé" v={bookingRef(b.bookingId)} mono />
            <Row k={paid ? 'Đã thanh toán' : 'Tổng tiền'} v={formatMoney(b.totalPrice)} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <Button variant="secondary" iconLeft="film" onClick={() => navigate('/')}>Xem phim khác</Button>
          <Button iconLeft="ticket" onClick={() => navigate('/my-bookings')}>Xem vé của tôi</Button>
        </div>
      </div>
    </div>
  )
}
