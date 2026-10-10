// Quản lý rạp + phòng + sinh ghế (design không có mẫu riêng -> dựng từ DataTable/Panel/Dialog của design)
// Bố cục 2 cột: trái = bảng rạp (bấm chọn 1 rạp), phải = các phòng của rạp đó.
// API:
//   Rạp:   GET /cinemas · POST /cinemas · PATCH /cinemas/{id} · DELETE /cinemas/{id}
//   Phòng: GET /rooms (ADMIN, lọc theo cinemaId trên FE) · POST/PATCH/DELETE /rooms
//   Ghế:   POST /seats/room/{roomId}/seats/generate?rows=&columns=   (409 nếu phòng đã có ghế)
import { useEffect, useState } from 'react'
import cinemaApi from '../../api/cinemaApi'
import roomApi from '../../api/roomApi'
import { getErrorMessage } from '../../api/axiosClient'
import { PageHead, Panel, useFlash } from '../../components/admin/AdminUI'
import { Badge, Button, DataTable, Dialog, IconButton, Input, Select } from '../../ds'
import { ROOM_TYPE } from '../../utils/format'

const ROOM_OPTIONS = Object.entries(ROOM_TYPE).map(([value, label]) => ({ value, label }))

export default function AdminCinemasPage() {
  const [cinemas, setCinemas] = useState([])
  const [rooms, setRooms] = useState([])
  const [selectedId, setSelectedId] = useState(null) // rạp đang chọn
  const [error, setError] = useState('')
  const [toast, flash] = useFlash()

  // Dialog dùng chung: { kind: 'cinema' | 'room' | 'seats' | 'delete', data, ... }
  const [dialog, setDialog] = useState(null)
  const [form, setForm] = useState({})
  const [formError, setFormError] = useState('')
  const [saving, setSaving] = useState(false)

  async function load() {
    try {
      const [c, r] = await Promise.all([cinemaApi.getAll(), roomApi.getAll()])
      setCinemas(c.content)
      setRooms(r.content)
      setSelectedId((cur) => cur ?? c.content[0]?.id ?? null)
    } catch (err) {
      setError(getErrorMessage(err))
    }
  }
  useEffect(() => { load() }, [])

  const selected = cinemas.find((c) => c.id === selectedId)
  const roomsOfSelected = rooms.filter((r) => r.cinemaId === selectedId)
  const field = (name) => (e) => setForm({ ...form, [name]: e.target.value })

  function open(kind, data, initialForm) {
    setDialog({ kind, data })
    setForm(initialForm)
    setFormError('')
  }

  // Lưu cho cả 3 loại form; mỗi loại gọi API khác nhau
  async function handleSave() {
    setSaving(true)
    setFormError('')
    const { kind, data } = dialog
    try {
      if (kind === 'cinema') {
        if (data) await cinemaApi.update(data.id, form)
        else {
          const created = await cinemaApi.create(form)
          setSelectedId(created.id)
        }
        flash(data ? 'Đã cập nhật rạp' : `Đã thêm rạp "${form.name}"`)
      } else if (kind === 'room') {
        const body = { ...form, cinemaId: selectedId }
        if (data) await roomApi.update(data.id, body)
        else await roomApi.create(body)
        flash(data ? 'Đã cập nhật phòng' : `Đã thêm "${form.name}"`, data ? undefined : 'Nhớ sinh ghế cho phòng mới.')
      } else if (kind === 'seats') {
        const res = await roomApi.generateSeats(data.id, Number(form.rows), Number(form.columns))
        flash(`Đã sinh ${res.created} ghế cho ${data.name}`)
      }
      setDialog(null)
      load()
    } catch (err) {
      setFormError(getErrorMessage(err)) // vd 409 "Phòng đã có ghế"
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    const { data } = dialog
    try {
      if (data.kind === 'cinema') {
        await cinemaApi.remove(data.item.id)
        setSelectedId(null)
      } else {
        await roomApi.remove(data.item.id)
      }
      flash(`Đã xóa "${data.item.name}"`)
      load()
    } catch (err) {
      flash('Không xóa được', getErrorMessage(err), 'warning')
    }
    setDialog(null)
  }

  const actions = (onEdit, onDelete, extra) => (
    <span style={{ display: 'inline-flex', gap: 4 }} onClick={(e) => e.stopPropagation()}>
      {extra}
      <IconButton icon="pencil" label="Sửa" variant="ghost" size={32} onClick={onEdit} />
      <IconButton icon="trash-2" label="Xóa" variant="ghost" size={32} onClick={onDelete} />
    </span>
  )

  return (
    <div className="admin-page">
      <PageHead title="Rạp & phòng" sub={`${cinemas.length} rạp · ${rooms.length} phòng chiếu`}
        actions={<Button iconLeft="plus" onClick={() => open('cinema', null, { name: '', address: '' })}>Thêm rạp</Button>} />
      {error && <p className="alert-error">{error}</p>}

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.2fr)', gap: 16, alignItems: 'start' }}>
        <Panel title="Rạp">
          <DataTable style={{ border: 0, margin: '-4px -20px -20px' }} rows={cinemas}
            onRowClick={(c) => setSelectedId(c.id)}
            columns={[
              { key: 'name', label: 'Tên rạp', render: (c) => (
                <span style={{ fontWeight: 600, color: c.id === selectedId ? 'var(--accent-hover)' : undefined }}>{c.name}</span>
              ) },
              { key: 'address', label: 'Địa chỉ', muted: true },
              { key: 'x', label: '', align: 'right', width: 80, render: (c) => actions(
                () => open('cinema', c, { name: c.name, address: c.address }),
                () => setDialog({ kind: 'delete', data: { kind: 'cinema', item: c } })
              ) },
            ]} />
        </Panel>

        <Panel title={selected ? `Phòng của ${selected.name}` : 'Phòng chiếu'}
          right={selected && (
            <Button size="sm" iconLeft="plus" onClick={() => open('room', null, { name: '', roomType: 'TWO_D' })}>Thêm phòng</Button>
          )}>
          {!selected ? (
            <p className="muted">Chọn một rạp bên trái để xem phòng.</p>
          ) : roomsOfSelected.length === 0 ? (
            <p className="muted">Rạp này chưa có phòng nào.</p>
          ) : (
            <DataTable style={{ border: 0, margin: '-4px -20px -20px' }} rows={roomsOfSelected}
              columns={[
                { key: 'id', label: 'ID', mono: true, muted: true, width: 50 },
                { key: 'name', label: 'Tên phòng', render: (r) => <b>{r.name}</b> },
                { key: 'roomType', label: 'Loại', render: (r) => (
                  <Badge tone={r.roomType === 'IMAX' ? 'gold' : 'neutral'} variant={r.roomType === 'IMAX' ? 'solid' : 'soft'}>{ROOM_TYPE[r.roomType]}</Badge>
                ) },
                { key: 'x', label: '', align: 'right', width: 170, render: (r) => actions(
                  () => open('room', r, { name: r.name, roomType: r.roomType }),
                  () => setDialog({ kind: 'delete', data: { kind: 'room', item: r } }),
                  <Button size="sm" variant="outline" iconLeft="armchair" onClick={() => open('seats', r, { rows: 8, columns: 12 })}>Sinh ghế</Button>
                ) },
              ]} />
          )}
        </Panel>
      </div>

      {/* Form rạp / phòng / sinh ghế — chung 1 Dialog, nội dung đổi theo kind */}
      <Dialog open={!!dialog && dialog.kind !== 'delete'} width={460} onClose={() => setDialog(null)}
        title={{
          cinema: dialog?.data ? 'Sửa rạp' : 'Thêm rạp',
          room: dialog?.data ? 'Sửa phòng' : `Thêm phòng cho ${selected?.name}`,
          seats: `Sinh ghế cho ${dialog?.data?.name}`,
        }[dialog?.kind]}
        actions={<>
          <Button variant="ghost" onClick={() => setDialog(null)}>Hủy</Button>
          <Button onClick={handleSave} disabled={saving}>{saving ? 'Đang lưu...' : dialog?.kind === 'seats' ? 'Sinh ghế' : 'Lưu'}</Button>
        </>}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 8 }}>
          {dialog?.kind === 'cinema' && <>
            <Input label="Tên rạp" value={form.name} onChange={field('name')} />
            <Input label="Địa chỉ" value={form.address} onChange={field('address')} />
          </>}
          {dialog?.kind === 'room' && <>
            <Input label="Tên phòng" placeholder="Phòng 1" value={form.name} onChange={field('name')} />
            <Select label="Loại phòng" value={form.roomType} onChange={field('roomType')} options={ROOM_OPTIONS} />
          </>}
          {dialog?.kind === 'seats' && <>
            <div className="grid-2">
              <Input label="Số hàng (A, B, C...)" type="number" mono value={form.rows} onChange={field('rows')} />
              <Input label="Số ghế mỗi hàng" type="number" mono value={form.columns} onChange={field('columns')} />
            </div>
            <p className="muted" style={{ margin: 0 }}>
              Sẽ tạo {Number(form.rows) * Number(form.columns) || 0} ghế loại Thường. Mỗi phòng chỉ sinh ghế được 1 lần.
            </p>
          </>}
          {formError && <p className="alert-error">{formError}</p>}
        </div>
      </Dialog>

      <Dialog open={dialog?.kind === 'delete'} title="Xác nhận xóa" onClose={() => setDialog(null)}
        actions={<>
          <Button variant="ghost" onClick={() => setDialog(null)}>Giữ lại</Button>
          <Button onClick={handleDelete}>Xóa</Button>
        </>}>
        {dialog?.kind === 'delete' && <>
          {dialog.data.kind === 'cinema' ? 'Rạp' : 'Phòng'} "{dialog.data.item.name}" sẽ bị xóa.
          Nếu còn phòng / suất chiếu liên quan thì có thể không xóa được.
        </>}
      </Dialog>

      {toast}
    </div>
  )
}
