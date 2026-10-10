// Thanh toán (giả lập) — theo design ui_kits/web/Payment.jsx
// Luồng:
//   GET /bookings/{id} -> hiện tóm tắt đơn (đơn đang PENDING)
//   "Thanh toán" -> PATCH /bookings/{id}/pay -> PAID -> /bookings/{id}/done
//   Nút quay lại -> hỏi xác nhận -> PATCH /bookings/{id}/cancel (nhả ghế) -> về trang chọn ghế
// Form thẻ chỉ để minh họa, KHÔNG gửi lên BE.
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import bookingApi from '../api/bookingApi'
import { getErrorMessage } from '../api/axiosClient'
import FlowHeader from '../components/FlowHeader'
import useMoviePoster from '../hooks/useMoviePoster'
import { BookingSummary, Button, Checkbox, Dialog, Icon, Input, MoviePoster } from '../ds'
import { formatLongDate, formatMoney, formatTime } from '../utils/format'

const METHODS = [
  { id: 'card', icon: 'credit-card', label: 'Thẻ' },
  { id: 'wallet', icon: 'wallet', label: 'Ví điện tử' },
  { id: 'bank', icon: 'landmark', label: 'Chuyển khoản' },
]

export default function PaymentPage() {
  const { id } = useParams() // bookingId
  const navigate = useNavigate()
  const [booking, setBooking] = useState(null)
  const [error, setError] = useState('')
  const [method, setMethod] = useState('card')
  const [agree, setAgree] = useState(true)
  const [busy, setBusy] = useState(false)
  const [leaveOpen, setLeaveOpen] = useState(false)
  const posterOf = useMoviePoster()

  useEffect(() => {
    bookingApi
      .getById(id)
      .then((b) => {
        // Đơn đã thanh toán rồi thì sang luôn trang hoàn tất
        if (b.bookingStatus === 'PAID') navigate(`/bookings/${id}/done`, { replace: true })
        else setBooking(b)
      })
      .catch((err) => setError(getErrorMessage(err)))
  }, [id, navigate])

  async function handlePay() {
    setBusy(true)
    setError('')
    try {
      await bookingApi.pay(id)
      navigate(`/bookings/${id}/done`, { replace: true })
    } catch (err) {
      setError(getErrorMessage(err))
      setBusy(false)
    }
  }

  async function handleRelease() {
    try {
      await bookingApi.cancel(id)
    } catch {
      // Hủy lỗi cũng vẫn cho quay lại
    }
    navigate(booking.showtimeId ? `/showtimes/${booking.showtimeId}/seats` : '/', { replace: true })
  }

  if (!booking) {
    return <div className="container">{error ? <p className="alert-error">{error}</p> : 'Đang tải đơn đặt vé...'}</div>
  }

  const seats = (booking.tickets || []).map((t) => t.seatCode)
  const cancelled = booking.bookingStatus === 'CANCELLED'

  return (
    <div>
      <FlowHeader step={2} onBack={() => (cancelled ? navigate('/') : setLeaveOpen(true))} />
      <div className="flow-grid">
        <div style={{ maxWidth: 560, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div>
            <h2 className="page-title" style={{ marginBottom: 6 }}>Thanh toán</h2>
            <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
              Đây là thanh toán giả lập. Không có khoản tiền thật nào bị trừ.
            </p>
          </div>

          {cancelled ? (
            <p className="alert-error">Đơn này đã bị hủy, ghế đã được nhả. Vui lòng đặt lại.</p>
          ) : (
            <>
              <div style={{ display: 'flex', gap: 10 }}>
                {METHODS.map((m) => (
                  <button key={m.id} type="button" onClick={() => setMethod(m.id)}
                    className={'pay-method' + (method === m.id ? ' on' : '')}>
                    <Icon name={m.icon} size={18} />{m.label}
                  </button>
                ))}
              </div>
              <Input label="Tên chủ thẻ" defaultValue="NGUYEN VAN A" />
              <Input label="Số thẻ" iconLeft="credit-card" defaultValue="4242 4242 4242 4242" mono />
              <div className="grid-2">
                <Input label="Hết hạn" defaultValue="08 / 28" mono />
                <Input label="CVC" defaultValue="123" mono hint="3 số ở mặt sau thẻ" />
              </div>
              <Checkbox label="Tôi đồng ý với điều khoản đặt vé và hoàn tiền" checked={agree} onChange={setAgree} />
              <div className="muted" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Icon name="lock" size={14} />Ghế của bạn đang được giữ cho đơn này.
              </div>
            </>
          )}
          {error && <p className="alert-error">{error}</p>}
        </div>

        <BookingSummary
          style={{ position: 'sticky', top: 24 }}
          title={booking.movieTitle || 'Không rõ'}
          poster={<MoviePoster title={booking.movieTitle || ''} src={posterOf(booking)} width={72} showMeta={false} />}
          cinema={booking.cinemaName && `${booking.cinemaName} · ${booking.roomName}`}
          datetime={booking.startTime && `${formatLongDate(booking.startTime.slice(0, 10))} · ${formatTime(booking.startTime)}`}
          seats={seats}
          lines={[{ label: `${seats.length} vé`, value: formatMoney(booking.totalPrice) }]}
          total={formatMoney(booking.totalPrice)}
          ctaLabel={busy ? 'Đang xử lý...' : `Thanh toán ${formatMoney(booking.totalPrice)}`}
          ctaDisabled={!agree || busy || cancelled}
          onCta={handlePay}
        />
      </div>

      <Dialog open={leaveOpen} title="Nhả ghế đang giữ?" onClose={() => setLeaveOpen(false)}
        actions={<>
          <Button variant="ghost" onClick={() => setLeaveOpen(false)}>Giữ ghế</Button>
          <Button onClick={handleRelease}>Nhả ghế</Button>
        </>}>
        Ghế {seats.join(', ')} sẽ được hủy giữ để người khác có thể đặt.
      </Dialog>
    </div>
  )
}
