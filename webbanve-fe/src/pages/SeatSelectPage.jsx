// Chọn ghế — theo design ui_kits/web/SeatSelect.jsx
// Luồng:
//   1. Tải: GET /showtimes/{id} -> movieId, roomId -> GET /movies, /rooms, /cinemas + GET /showtimes/{id}/seats
//   2. User bấm ghế -> thêm/bớt trong state `selected` (tối đa 8)
//   3. "Tiếp tục" -> chưa login thì sang /login (login xong quay lại đây)
//                 -> đã login: POST /bookings { userId, showtimeId, seatIds } -> booking PENDING
//                 -> chuyển sang /bookings/{bookingId}/pay
//   409 (ghế vừa bị người khác đặt) -> báo lỗi + tải lại sơ đồ ghế
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import showtimeApi from '../api/showtimeApi'
import movieApi from '../api/movieApi'
import roomApi from '../api/roomApi'
import cinemaApi from '../api/cinemaApi'
import bookingApi from '../api/bookingApi'
import { getErrorMessage } from '../api/axiosClient'
import { useAuth } from '../auth/AuthContext'
import FlowHeader from '../components/FlowHeader'
import SeatMap from '../components/SeatMap'
import { Badge, BookingSummary, MoviePoster, Toast } from '../ds'
import { ROOM_TYPE, SEAT_SURCHARGE, SEAT_TYPE, formatLongDate, formatMoney, formatTime } from '../utils/format'

const MAX_SEATS = 8

export default function SeatSelectPage() {
  const { id } = useParams() // showtimeId
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()

  const [info, setInfo] = useState(null) // { showtime, movie, room, cinema }
  const [seats, setSeats] = useState([])
  const [selected, setSelected] = useState([]) // mảng object ghế đang chọn
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const loadSeats = () => showtimeApi.getSeats(id).then(setSeats)

  useEffect(() => {
    async function load() {
      try {
        const showtime = await showtimeApi.getById(id)
        const [movie, room] = await Promise.all([movieApi.getById(showtime.movieId), roomApi.getById(showtime.roomId)])
        const cinema = await cinemaApi.getById(room.cinemaId)
        setInfo({ showtime, movie, room, cinema })
        await loadSeats()
      } catch (err) {
        setError(getErrorMessage(err))
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  function toggle(seat) {
    setError('')
    setSelected((cur) =>
      cur.some((s) => s.seatId === seat.seatId)
        ? cur.filter((s) => s.seatId !== seat.seatId) // bấm lại -> bỏ chọn
        : cur.length >= MAX_SEATS ? cur : [...cur, seat]
    )
  }

  async function handleContinue() {
    if (!user) {
      // Chưa đăng nhập: sang login, nhớ quay lại đúng trang này
      navigate('/login', { state: { from: location.pathname } })
      return
    }
    setSubmitting(true)
    setError('')
    try {
      const booking = await bookingApi.create({
        userId: user.userId,
        showtimeId: Number(id),
        seatIds: selected.map((s) => s.seatId),
      })
      navigate(`/bookings/${booking.bookingId}/pay`)
    } catch (err) {
      setError(getErrorMessage(err))
      if (err.response?.status === 409) {
        // Ghế đã bị người khác đặt -> bỏ chọn hết và tải lại sơ đồ
        setSelected([])
        loadSeats()
      }
    } finally {
      setSubmitting(false)
    }
  }

  const back = () => navigate(info ? `/movies/${info.movie.id}` : '/')

  if (loading) return <div className="container">Đang tải sơ đồ ghế...</div>
  if (!info) return <div className="container"><p className="alert-error">{error}</p></div>

  const { showtime, movie, room, cinema } = info
  const priceOf = (s) => Number(showtime.price) + SEAT_SURCHARGE[s.seatType]
  const total = selected.reduce((sum, s) => sum + priceOf(s), 0)

  // Dòng tạm tính theo loại ghế: "2 × VIP   240.000đ"
  const lines = Object.keys(SEAT_SURCHARGE)
    .map((type) => {
      const list = selected.filter((s) => s.seatType === type)
      return list.length && { label: `${list.length} × ${SEAT_TYPE[type]}`, value: formatMoney(list.reduce((t, s) => t + priceOf(s), 0)) }
    })
    .filter(Boolean)

  return (
    <div>
      <FlowHeader step={1} onBack={back} />
      <div className="flow-grid">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          {seats.length === 0 ? (
            <p className="muted">Phòng chiếu này chưa có sơ đồ ghế. Vui lòng chọn suất khác.</p>
          ) : (
            <SeatMap seats={seats} selectedIds={selected.map((s) => s.seatId)} onToggle={toggle} />
          )}
          {error && <p className="alert-error" style={{ alignSelf: 'stretch' }}>{error}</p>}
          <Toast tone="warning" title={`Tối đa ${MAX_SEATS} ghế mỗi lần đặt`}
            message={`Giá vé ${formatMoney(showtime.price)}. Ghế VIP +30.000đ, ghế đôi +50.000đ.`} />
        </div>

        <BookingSummary
          style={{ position: 'sticky', top: 24 }}
          title={movie.title}
          poster={<MoviePoster title={movie.title} src={movie.posterUrl} width={72} showMeta={false} />}
          format={<Badge tone="gold" variant="solid">{ROOM_TYPE[room.roomType]}</Badge>}
          cinema={`${cinema.name} · ${room.name}`}
          datetime={`${formatLongDate(showtime.startTime.slice(0, 10))} · ${formatTime(showtime.startTime)}`}
          seats={selected.map((s) => s.rowLabel + s.seatNumber)}
          lines={lines}
          total={formatMoney(total)}
          ctaLabel={submitting ? 'Đang giữ ghế...' : user ? 'Tiếp tục thanh toán' : 'Đăng nhập để đặt vé'}
          ctaDisabled={!selected.length || submitting}
          onCta={handleContinue}
        />
      </div>
    </div>
  )
}
