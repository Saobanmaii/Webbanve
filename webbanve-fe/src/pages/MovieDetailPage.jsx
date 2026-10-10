// Chi tiết phim + chọn ngày + chọn suất — theo design ui_kits/web/MovieDetail.jsx
// Luồng dữ liệu:
//   1. GET /movies/{id}                        -> thông tin phim
//   2. GET /showtimes/search?movieId={id}      -> mọi suất của phim (bỏ suất đã qua)
//   3. Suất chỉ có roomId -> GET /rooms/{id} -> cinemaId -> GET /cinemas/{id}  (để nhóm suất theo rạp)
//   4. Chọn ngày -> lọc suất theo ngày; chọn suất -> thanh dưới hiện nút "Chọn ghế"
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import movieApi from '../api/movieApi'
import showtimeApi from '../api/showtimeApi'
import roomApi from '../api/roomApi'
import cinemaApi from '../api/cinemaApi'
import { getErrorMessage } from '../api/axiosClient'
import Backdrop from '../components/Backdrop'
import TrailerDialog from '../components/TrailerDialog'
import PosterLightbox from '../components/PosterLightbox'
import { Badge, Button, DateStrip, Icon, MoviePoster, Rating, ShowtimeChip } from '../ds'
import {
  AGE_RATING, ROOM_TYPE, formatDate, formatDuration, formatLongDate, formatMoney, formatTime, genresOf, weekdayOf,
} from '../utils/format'

export default function MovieDetailPage() {
  const { id } = useParams() // lấy :id từ URL /movies/:id
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [showtimes, setShowtimes] = useState([])
  const [rooms, setRooms] = useState({}) // { roomId: room }
  const [cinemas, setCinemas] = useState({}) // { cinemaId: cinema }
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [day, setDay] = useState(null) // 'yyyy-MM-dd'
  const [pick, setPick] = useState(null) // suất đang chọn
  const [showTrailer, setShowTrailer] = useState(false)
  const [zoomPoster, setZoomPoster] = useState(false)
  // useCallback: giữ nguyên hàm giữa các lần vẽ, để useEffect (phím Esc) trong PosterLightbox không gắn lại liên tục
  const closeZoom = useCallback(() => setZoomPoster(false), [])

  // [id] = chạy lại khi id trên URL đổi
  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        // Gọi song song 2 API cho nhanh
        const [m, list] = await Promise.all([movieApi.getById(id), showtimeApi.search({ movieId: id })])
        const now = new Date()
        const upcoming = list
          .filter((s) => new Date(s.startTime) > now)
          .sort((a, b) => a.startTime.localeCompare(b.startTime))

        // Tra phòng -> rạp cho các suất (mỗi phòng/rạp chỉ gọi 1 lần)
        const roomIds = [...new Set(upcoming.map((s) => s.roomId))]
        const roomList = await Promise.all(roomIds.map((r) => roomApi.getById(r)))
        const cinemaIds = [...new Set(roomList.map((r) => r.cinemaId))]
        const cinemaList = await Promise.all(cinemaIds.map((c) => cinemaApi.getById(c)))

        setMovie(m)
        setShowtimes(upcoming)
        setRooms(Object.fromEntries(roomList.map((r) => [r.id, r])))
        setCinemas(Object.fromEntries(cinemaList.map((c) => [c.id, c])))
        setDay(upcoming[0]?.startTime.slice(0, 10) ?? null) // mặc định chọn ngày gần nhất
      } catch (err) {
        setError(getErrorMessage(err))
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  // Các ngày có suất -> dữ liệu cho DateStrip
  const days = useMemo(() => {
    const dates = [...new Set(showtimes.map((s) => s.startTime.slice(0, 10)))]
    return dates.map((d) => ({ id: d, weekday: weekdayOf(d), day: d.slice(8, 10) }))
  }, [showtimes])

  // Suất trong ngày đang chọn, nhóm theo rạp: [{ cinema, items: [suất...] }]
  const groups = useMemo(() => {
    const map = {}
    showtimes
      .filter((s) => s.startTime.startsWith(day))
      .forEach((s) => {
        const cinemaId = rooms[s.roomId]?.cinemaId
        ;(map[cinemaId] ||= { cinema: cinemas[cinemaId], items: [] }).items.push(s)
      })
    return Object.values(map)
  }, [showtimes, day, rooms, cinemas])

  if (loading) return <div className="container">Đang tải...</div>
  if (error) return <div className="container"><p className="alert-error">{error}</p></div>

  const pickRoom = pick && rooms[pick.roomId]
  const pickCinema = pickRoom && cinemas[pickRoom.cinemaId]

  return (
    <div>
      <Backdrop seed={movie.title} src={movie.backdropUrl} height={500}>
        <div className="detail-hero">
          {/* Có ảnh poster thật thì bấm để phóng to */}
          <MoviePoster title={movie.title} src={movie.posterUrl} width={200} showMeta={false}
            onClick={movie.posterUrl ? () => setZoomPoster(true) : undefined}
            style={{ cursor: movie.posterUrl ? 'zoom-in' : 'default' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 680 }}>
            <Link to="/" className="back-link"><Icon name="arrow-left" size={15} />Tất cả phim</Link>
            <h1 className="detail-title">{movie.title}</h1>
            <div className="hero-meta" style={{ alignItems: 'center', flexWrap: 'wrap' }}>
              {movie.rating != null && <Rating value={movie.rating} />}
              <Badge variant="outline">{AGE_RATING[movie.ageRating]}</Badge>
              <span>{formatDuration(movie.durationMinutes)}</span>
              <span>{formatDate(movie.releaseDate)}</span>
              <span>{movie.language}</span>
            </div>
            <div className="chip-row">
              {genresOf(movie).map((g) => <Badge key={g}>{g}</Badge>)}
            </div>
            {movie.description && <p className="hero-desc clamp-3" style={{ fontSize: 15 }}>{movie.description}</p>}
            {(movie.director || movie.cast) && (
              <div className="credits">
                {movie.director && <div><span>Đạo diễn</span>{movie.director}</div>}
                {movie.cast && <div><span>Diễn viên</span>{movie.cast}</div>}
              </div>
            )}
            {movie.trailerUrl && (
              <div><Button variant="secondary" iconLeft="play" onClick={() => setShowTrailer(true)}>Xem trailer</Button></div>
            )}
          </div>
        </div>
      </Backdrop>
      <TrailerDialog movie={showTrailer ? movie : null} onClose={() => setShowTrailer(false)} />
      <PosterLightbox src={zoomPoster ? movie.posterUrl : null} title={movie.title} onClose={closeZoom} />

      <section className="detail-body">
        <div className="detail-head">
          <div>
            <h2 className="section-title">Chọn suất chiếu</h2>
            {day && <div className="muted">{formatLongDate(day)}</div>}
          </div>
          <DateStrip days={days} value={day} onChange={(d) => { setDay(d); setPick(null) }} />
        </div>

        {groups.length === 0 && <p className="muted">Phim này hiện chưa có suất chiếu sắp tới.</p>}

        {groups.map(({ cinema, items }) => (
          <div key={cinema?.id} className="cinema-row">
            <div>
              <div style={{ font: '600 16px var(--font-body)' }}>{cinema?.name}</div>
              <div className="muted cinema-addr"><Icon name="map-pin" size={14} />{cinema?.address}</div>
            </div>
            <div className="chip-row" style={{ gap: 10 }}>
              {items.map((s) => {
                const room = rooms[s.roomId]
                return (
                  <ShowtimeChip key={s.id} time={formatTime(s.startTime)}
                    format={`${ROOM_TYPE[room?.roomType] || ''} · ${room?.name || ''}`}
                    selected={pick?.id === s.id} onClick={() => setPick(s)} />
                )
              })}
            </div>
          </div>
        ))}
      </section>

      {/* Thanh dưới cùng: chỉ hiện khi đã chọn suất */}
      {pick && (
        <div className="continue-bar">
          <div style={{ flex: 1 }}>
            <div style={{ font: '600 15px var(--font-body)' }}>
              {movie.title} · {ROOM_TYPE[pickRoom?.roomType]}
            </div>
            <div className="muted" style={{ marginTop: 2 }}>
              {pickCinema?.name} · {pickRoom?.name} · {formatLongDate(day)} ·{' '}
              <span style={{ fontFamily: 'var(--font-mono)' }}>{formatTime(pick.startTime)}</span> ·{' '}
              từ {formatMoney(pick.price)}
            </div>
          </div>
          <Button size="lg" iconRight="arrow-right" onClick={() => navigate(`/showtimes/${pick.id}/seats`)}>
            Chọn ghế
          </Button>
        </div>
      )}
    </div>
  )
}
