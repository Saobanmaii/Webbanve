// Quản lý suất chiếu — theo design ui_kits/admin/Showtimes.jsx
// Dữ liệu demo có ~1000 suất -> KHÔNG tải hết. Mỗi lần chỉ xem 1 ngày tại 1 rạp:
//   GET /showtimes/search?date=&cinemaId=&movieId=   -> suất cần hiện
//   GET /showtimes/{id}/seats cho từng suất đó       -> % ghế đã đặt (vài chục request, chạy song song)
//   GET /movies, /rooms, /cinemas 1 lần lúc mở trang -> tra tên phim/phòng/rạp
// CRUD: POST /showtimes · PATCH /showtimes/{id} · DELETE /showtimes/{id}
//   409 = phòng đã có suất trùng giờ;  400 = giờ chiếu phải ở tương lai (@Future)
import { useEffect, useRef, useState } from 'react'
import showtimeApi from '../../api/showtimeApi'
import movieApi from '../../api/movieApi'
import roomApi from '../../api/roomApi'
import cinemaApi from '../../api/cinemaApi'
import { getErrorMessage } from '../../api/axiosClient'
import { PageHead, useFlash } from '../../components/admin/AdminUI'
import { Badge, Button, DataTable, DateStrip, Dialog, IconButton, Input, Select } from '../../ds'
import { ROOM_TYPE, formatDate, formatLongDate, formatMoney, formatTime, weekdayOf } from '../../utils/format'

const EMPTY = { movieId: '', cinemaId: '', roomId: '', startTime: '', price: 90000 }

// Date -> "yyyy-MM-dd" theo giờ máy (không dùng toISOString vì bị lệch sang giờ UTC)
const toISODate = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

// Dải ngày: 3 ngày trước -> 10 ngày tới
const DAYS = Array.from({ length: 14 }, (_, i) => {
  const d = new Date()
  d.setDate(d.getDate() + i - 3)
  const id = toISODate(d)
  return { id, weekday: weekdayOf(id), day: id.slice(8, 10) }
})

export default function AdminShowtimesPage() {
  // Dữ liệu tra cứu (tải 1 lần)
  const [movies, setMovies] = useState([])
  const [rooms, setRooms] = useState([])
  const [cinemas, setCinemas] = useState([])
  // Suất đang xem + tỉ lệ lấp đầy
  const [rows, setRows] = useState([])
  const [occupancy, setOccupancy] = useState({}) // { showtimeId: { booked, total } }
  const [loadingRows, setLoadingRows] = useState(false)
  const [error, setError] = useState('')
  const [toast, flash] = useFlash()

  // Bộ lọc — ngày và rạp luôn có giá trị để mỗi lần chỉ tải ít suất
  const [day, setDay] = useState(DAYS[3].id) // hôm nay
  const [cinemaFilter, setCinemaFilter] = useState('')
  const [movieFilter, setMovieFilter] = useState('')

  // Form
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [formError, setFormError] = useState('')
  const [saving, setSaving] = useState(false)
  const [toDelete, setToDelete] = useState(null)

  // 1) Tải dữ liệu tra cứu; chọn sẵn rạp có suất hôm nay (không có thì rạp đầu tiên)
  useEffect(() => {
    Promise.all([movieApi.getAll(0, 200), roomApi.getAll(0, 200), cinemaApi.getAll(0, 100), showtimeApi.search({ date: DAYS[3].id })])
      .then(([m, r, c, today]) => {
        setMovies(m.content)
        setRooms(r.content)
        setCinemas(c.content)
        const busyCinemaId = r.content.find((room) => room.id === today[0]?.roomId)?.cinemaId
        const first = busyCinemaId ?? c.content[0]?.id
        if (first != null) setCinemaFilter(String(first))
      })
      .catch((err) => setError(getErrorMessage(err)))
  }, [])

  // 2) Mỗi khi đổi ngày / rạp / phim -> tải lại suất
  // Đánh số mỗi lần tải: đổi lọc liên tục thì chỉ lấy kết quả của lần tải MỚI NHẤT
  const requestNo = useRef(0)
  async function loadRows() {
    if (!cinemaFilter) return
    const myNo = ++requestNo.current
    setLoadingRows(true)
    try {
      const list = await showtimeApi.search({ date: day, cinemaId: cinemaFilter, movieId: movieFilter || undefined })
      if (myNo !== requestNo.current) return
      list.sort((a, b) => a.startTime.localeCompare(b.startTime) || a.roomId - b.roomId)
      setRows(list)
      setOccupancy({})
      const seatLists = await Promise.all(list.map((s) => showtimeApi.getSeats(s.id).catch(() => [])))
      if (myNo !== requestNo.current) return
      setOccupancy(Object.fromEntries(list.map((s, i) => [
        s.id, { booked: seatLists[i].filter((x) => x.booked).length, total: seatLists[i].length },
      ])))
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      if (myNo === requestNo.current) setLoadingRows(false)
    }
  }
  useEffect(() => { loadRows() }, [day, cinemaFilter, movieFilter])

  // Tra nhanh theo id
  const movieOf = (id) => movies.find((m) => m.id === id)
  const roomOf = (id) => rooms.find((r) => r.id === id)
  const cinemaOf = (id) => cinemas.find((c) => c.id === id)

  function openForm(s) {
    setEditing(s || {})
    setForm(s
      ? { movieId: s.movieId, cinemaId: roomOf(s.roomId)?.cinemaId ?? '', roomId: s.roomId, startTime: s.startTime.slice(0, 16), price: s.price }
      : { ...EMPTY, cinemaId: cinemaFilter, movieId: movieFilter })
    setFormError('')
  }
  const field = (name) => (e) => setForm({ ...form, [name]: e.target.value })

  async function handleSave() {
    setSaving(true)
    setFormError('')
    const body = {
      movieId: form.movieId ? Number(form.movieId) : null,
      roomId: form.roomId ? Number(form.roomId) : null,
      // <input type="datetime-local"> trả "2026-12-25T19:30" -> BE cần thêm giây
      startTime: form.startTime ? form.startTime + ':00' : null,
      price: form.price === '' ? null : Number(form.price),
    }
    try {
      if (editing.id) await showtimeApi.update(editing.id, body)
      else await showtimeApi.create(body)
      flash(editing.id ? 'Đã cập nhật suất chiếu' : 'Đã tạo suất chiếu')
      setEditing(null)
      loadRows()
    } catch (err) {
      setFormError(getErrorMessage(err)) // vd 409 "Phòng này đã có suất chiếu trùng giờ"
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    try {
      await showtimeApi.remove(toDelete.id)
      flash('Đã xóa suất chiếu')
      loadRows()
    } catch (err) {
      flash('Không xóa được suất chiếu', getErrorMessage(err), 'warning')
    }
    setToDelete(null)
  }

  const opt = (list, label) => list.map((x) => ({ value: String(x.id), label: label(x) }))
  const roomsOfForm = rooms.filter((r) => r.cinemaId === Number(form.cinemaId))
  const cinema = cinemaOf(Number(cinemaFilter))

  return (
    <div className="admin-page">
      <PageHead title="Suất chiếu"
        sub={`${cinema?.name ?? ''} · ${formatLongDate(day)} · ${rows.length} suất`}
        actions={<Button iconLeft="calendar-plus" onClick={() => openForm(null)}>Tạo suất chiếu</Button>} />
      {error && <p className="alert-error">{error}</p>}

      <div style={{ display: 'flex', gap: 16, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <DateStrip days={DAYS} value={day} onChange={setDay} style={{ maxWidth: '100%' }} />
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <Select value={cinemaFilter} onChange={(e) => setCinemaFilter(e.target.value)} options={opt(cinemas, (c) => c.name)} />
          <Select value={movieFilter} onChange={(e) => setMovieFilter(e.target.value)}
            options={[{ value: '', label: 'Tất cả phim' }, ...opt(movies, (m) => m.title)]} />
        </div>
      </div>

      <DataTable rows={rows} columns={[
        { key: 'time', label: 'Giờ', mono: true, render: (s) => formatTime(s.startTime) },
        { key: 'movie', label: 'Phim', render: (s) => <span style={{ fontWeight: 600 }}>{movieOf(s.movieId)?.title}</span> },
        { key: 'room', label: 'Phòng', muted: true, render: (s) => roomOf(s.roomId)?.name ?? '?' },
        { key: 'type', label: 'Loại', render: (s) => {
          const t = roomOf(s.roomId)?.roomType
          return <Badge tone={t === 'IMAX' ? 'gold' : 'neutral'} variant={t === 'IMAX' ? 'solid' : 'soft'}>{ROOM_TYPE[t]}</Badge>
        } },
        { key: 'price', label: 'Giá', mono: true, align: 'right', render: (s) => formatMoney(s.price) },
        { key: 'occ', label: 'Đã đặt', width: 190, render: (s) => {
          const o = occupancy[s.id]
          if (!o) return <span className="muted">...</span>
          if (!o.total) return <span className="muted">Phòng chưa có ghế</span>
          const p = Math.round((o.booked / o.total) * 100)
          return (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ flex: 1, height: 6, borderRadius: 3, background: 'var(--ink-700)' }}>
                <span style={{ display: 'block', height: '100%', width: p + '%', borderRadius: 3, background: p > 90 ? 'var(--warning)' : 'var(--accent)' }} />
              </span>
              <span style={{ font: '500 12px var(--font-mono)', color: 'var(--text-secondary)', width: 56, textAlign: 'right' }}>{o.booked}/{o.total}</span>
            </div>
          )
        } },
        { key: 'x', label: '', align: 'right', width: 90, render: (s) => (
          <span style={{ display: 'inline-flex', gap: 4 }}>
            <IconButton icon="pencil" label="Sửa" variant="ghost" size={32} onClick={() => openForm(s)} />
            <IconButton icon="trash-2" label="Xóa" variant="ghost" size={32} onClick={() => setToDelete(s)} />
          </span>
        ) },
      ]} />
      {loadingRows && <p className="muted">Đang tải suất chiếu...</p>}
      {!loadingRows && rows.length === 0 && <p className="muted">Không có suất chiếu nào trong ngày này.</p>}

      <Dialog open={!!editing} title={editing?.id ? 'Sửa suất chiếu' : 'Tạo suất chiếu'} width={520} onClose={() => setEditing(null)}
        actions={<>
          <Button variant="ghost" onClick={() => setEditing(null)}>Hủy</Button>
          <Button onClick={handleSave} disabled={saving}>{saving ? 'Đang lưu...' : 'Lưu'}</Button>
        </>}>
        <div className="form-grid">
          <Select label="Phim" value={String(form.movieId)} onChange={field('movieId')} style={{ gridColumn: 'span 2' }}
            options={[{ value: '', label: '-- Chọn phim --' }, ...opt(movies, (m) => m.title)]} />
          {/* Chọn rạp trước -> danh sách phòng lọc theo rạp */}
          <Select label="Rạp" value={String(form.cinemaId)} onChange={(e) => setForm({ ...form, cinemaId: e.target.value, roomId: '' })}
            options={[{ value: '', label: '-- Chọn rạp --' }, ...opt(cinemas, (c) => c.name)]} />
          <Select label="Phòng" value={String(form.roomId)} onChange={field('roomId')}
            options={[{ value: '', label: form.cinemaId ? '-- Chọn phòng --' : 'Chọn rạp trước' },
              ...opt(roomsOfForm, (r) => `${r.name} (${ROOM_TYPE[r.roomType]})`)]} />
          <Input label="Giờ chiếu" type="datetime-local" mono value={form.startTime} onChange={field('startTime')} />
          <Input label="Giá vé (đ)" type="number" mono value={form.price} onChange={field('price')} hint="Ghế VIP +30.000đ, đôi +50.000đ" />
          {formError && <p className="alert-error" style={{ gridColumn: 'span 2' }}>{formError}</p>}
        </div>
      </Dialog>

      <Dialog open={!!toDelete} title="Xóa suất chiếu?" onClose={() => setToDelete(null)}
        actions={<>
          <Button variant="ghost" onClick={() => setToDelete(null)}>Giữ lại</Button>
          <Button onClick={handleDelete}>Xóa suất</Button>
        </>}>
        {toDelete && <>Suất {movieOf(toDelete.movieId)?.title} lúc {formatTime(toDelete.startTime)} ngày {formatDate(toDelete.startTime)} sẽ bị xóa. Suất đã có người đặt vé có thể không xóa được.</>}
      </Dialog>

      {toast}
    </div>
  )
}
