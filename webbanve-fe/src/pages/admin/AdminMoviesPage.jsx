// Quản lý phim — theo design ui_kits/admin/Movies.jsx
// Luồng CRUD:
//   Tải: GET /movies -> bảng (lọc tên + trạng thái trên FE)
//   Thêm: Dialog form -> POST /movies       Sửa: Dialog form (điền sẵn) -> PATCH /movies/{id}
//   Xóa: Dialog xác nhận -> DELETE /movies/{id}
//   Xong mỗi thao tác -> tải lại bảng + hiện Toast. Lỗi 400 (validation) hiện ngay trong form.
import { useEffect, useState } from 'react'
import movieApi from '../../api/movieApi'
import { getErrorMessage } from '../../api/axiosClient'
import { PageHead, useFlash } from '../../components/admin/AdminUI'
import { Badge, Button, DataTable, Dialog, IconButton, Input, Rating, Select } from '../../ds'
import { AGE_RATING, MOVIE_STATUS, formatDate, formatDuration } from '../../utils/format'

const STATUS_TONE = { NOW_SHOWING: 'success', COMING_SOON: 'info', ENDED: 'neutral' }
const toOptions = (map) => Object.entries(map).map(([value, label]) => ({ value, label }))

const EMPTY = {
  title: '', description: '', durationMinutes: '', releaseDate: '', language: 'Tiếng Việt',
  genre: '', ageRating: 'P', status: 'COMING_SOON', posterUrl: '',
  backdropUrl: '', trailerUrl: '', director: '', cast: '', rating: '',
}
// Field tùy chọn: để trống thì gửi null
const OPTIONAL = ['posterUrl', 'backdropUrl', 'trailerUrl', 'director', 'cast']

export default function AdminMoviesPage() {
  const [movies, setMovies] = useState([])
  const [q, setQ] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [editing, setEditing] = useState(null) // null = đóng form; {} = thêm mới; {id..} = sửa
  const [form, setForm] = useState(EMPTY)
  const [formError, setFormError] = useState('')
  const [saving, setSaving] = useState(false)
  const [toDelete, setToDelete] = useState(null)
  const [error, setError] = useState('')
  const [toast, flash] = useFlash()

  const load = () => movieApi.getAll().then((p) => setMovies(p.content)).catch((e) => setError(getErrorMessage(e)))
  useEffect(() => { load() }, [])

  function openForm(movie) {
    setEditing(movie || {})
    // Sửa: lấy dữ liệu phim điền vào form (null -> '' để ô input không lỗi)
    setForm(movie ? { ...EMPTY, ...Object.fromEntries(Object.entries(movie).map(([k, v]) => [k, v ?? ''])) } : EMPTY)
    setFormError('')
  }

  const field = (name) => (e) => setForm({ ...form, [name]: e.target.value })

  async function handleSave() {
    setSaving(true)
    setFormError('')
    const body = {
      ...form,
      durationMinutes: form.durationMinutes === '' ? null : Number(form.durationMinutes),
      releaseDate: form.releaseDate || null,
      rating: form.rating === '' ? null : Number(form.rating),
    }
    OPTIONAL.forEach((k) => { body[k] = String(form[k]).trim() || null })
    delete body.id
    try {
      if (editing.id) await movieApi.update(editing.id, body)
      else await movieApi.create(body)
      flash(editing.id ? `Đã cập nhật "${form.title}"` : `Đã thêm "${form.title}"`,
        editing.id ? undefined : 'Tạo suất chiếu để mở bán vé.')
      setEditing(null)
      load()
    } catch (err) {
      setFormError(getErrorMessage(err))
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    try {
      await movieApi.remove(toDelete.id)
      flash(`Đã xóa "${toDelete.title}"`)
      load()
    } catch (err) {
      flash('Không xóa được phim', getErrorMessage(err), 'warning')
    }
    setToDelete(null)
  }

  const rows = movies.filter(
    (m) => m.title.toLowerCase().includes(q.trim().toLowerCase()) && (!statusFilter || m.status === statusFilter)
  )

  return (
    <div className="admin-page">
      <PageHead title="Phim" sub={`${movies.length} phim trong danh mục`}
        actions={<Button iconLeft="plus" onClick={() => openForm(null)}>Thêm phim</Button>} />
      {error && <p className="alert-error">{error}</p>}

      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
        <Input iconLeft="search" placeholder="Tìm tên phim" value={q} onChange={(e) => setQ(e.target.value)} style={{ width: 320 }} />
        <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
          options={[{ value: '', label: 'Tất cả trạng thái' }, ...toOptions(MOVIE_STATUS)]} />
      </div>

      <DataTable rows={rows} columns={[
        { key: 'id', label: 'ID', mono: true, muted: true, width: 60 },
        { key: 'title', label: 'Tên phim', render: (m) => <span style={{ fontWeight: 600 }}>{m.title}</span> },
        { key: 'genre', label: 'Thể loại', muted: true },
        { key: 'rating', label: 'Điểm', mono: true, render: (m) => (m.rating != null ? <Rating value={m.rating} size="sm" /> : '—') },
        { key: 'durationMinutes', label: 'Thời lượng', mono: true, muted: true, render: (m) => formatDuration(m.durationMinutes) },
        { key: 'releaseDate', label: 'Khởi chiếu', mono: true, muted: true, render: (m) => formatDate(m.releaseDate) },
        { key: 'ageRating', label: 'Nhãn', render: (m) => <Badge variant="outline">{AGE_RATING[m.ageRating]}</Badge> },
        { key: 'status', label: 'Trạng thái', render: (m) => <Badge tone={STATUS_TONE[m.status]}>{MOVIE_STATUS[m.status]}</Badge> },
        { key: 'x', label: '', align: 'right', width: 90, render: (m) => (
          <span style={{ display: 'inline-flex', gap: 4 }}>
            <IconButton icon="pencil" label="Sửa" variant="ghost" size={32} onClick={() => openForm(m)} />
            <IconButton icon="trash-2" label="Xóa" variant="ghost" size={32} onClick={() => setToDelete(m)} />
          </span>
        ) },
      ]} />

      {/* Form thêm / sửa */}
      <Dialog open={!!editing} title={editing?.id ? 'Sửa phim' : 'Thêm phim'} width={560} onClose={() => setEditing(null)}
        actions={<>
          <Button variant="ghost" onClick={() => setEditing(null)}>Hủy</Button>
          <Button onClick={handleSave} disabled={saving}>{saving ? 'Đang lưu...' : editing?.id ? 'Lưu thay đổi' : 'Thêm phim'}</Button>
        </>}>
        <div className="form-grid">
          <Input label="Tên phim" value={form.title} onChange={field('title')} style={{ gridColumn: 'span 2' }} />
          <Input label="Mô tả" value={form.description} onChange={field('description')} style={{ gridColumn: 'span 2' }} />
          <Input label="Thể loại" placeholder="Hành động" value={form.genre} onChange={field('genre')} />
          <Input label="Ngôn ngữ" value={form.language} onChange={field('language')} />
          <Input label="Thời lượng (phút)" type="number" mono value={form.durationMinutes} onChange={field('durationMinutes')} />
          <Input label="Ngày khởi chiếu" type="date" mono value={form.releaseDate} onChange={field('releaseDate')} />
          <Select label="Nhãn tuổi" value={form.ageRating} onChange={field('ageRating')} options={toOptions(AGE_RATING)} />
          <Select label="Trạng thái" value={form.status} onChange={field('status')} options={toOptions(MOVIE_STATUS)} />
          <Input label="Đạo diễn" value={form.director} onChange={field('director')} />
          <Input label="Điểm (0–10)" type="number" mono value={form.rating} onChange={field('rating')} />
          <Input label="Diễn viên (cách nhau bằng dấu phẩy)" value={form.cast} onChange={field('cast')} style={{ gridColumn: 'span 2' }} />
          <Input label="Link poster — ảnh dọc (không bắt buộc)" placeholder="https://..." value={form.posterUrl} onChange={field('posterUrl')} style={{ gridColumn: 'span 2' }} />
          <Input label="Link ảnh ngang 16:9 cho banner (không bắt buộc)" placeholder="https://..." value={form.backdropUrl} onChange={field('backdropUrl')} style={{ gridColumn: 'span 2' }} />
          <Input label="Link trailer YouTube (không bắt buộc)" placeholder="https://www.youtube.com/watch?v=..." value={form.trailerUrl} onChange={field('trailerUrl')} style={{ gridColumn: 'span 2' }} />
          {formError && <p className="alert-error" style={{ gridColumn: 'span 2' }}>{formError}</p>}
        </div>
      </Dialog>

      {/* Xác nhận xóa */}
      <Dialog open={!!toDelete} title="Xóa phim?" onClose={() => setToDelete(null)}
        actions={<>
          <Button variant="ghost" onClick={() => setToDelete(null)}>Giữ lại</Button>
          <Button onClick={handleDelete}>Xóa phim</Button>
        </>}>
        Phim "{toDelete?.title}" sẽ bị xóa khỏi danh mục. Phim đã có suất chiếu có thể không xóa được.
      </Dialog>

      {toast}
    </div>
  )
}
