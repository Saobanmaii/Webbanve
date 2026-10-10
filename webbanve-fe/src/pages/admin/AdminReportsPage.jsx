// Báo cáo doanh thu — theo design ui_kits/admin/Showtimes.jsx (phần Reports)
// GET /reports/revenue-by-movie + /reports/revenue-by-cinema -> thẻ số liệu + biểu đồ thanh (BarList) + bảng
// Nút "Tải Excel" -> reportApi.downloadExcel (tải blob có kèm token)
import { useEffect, useState } from 'react'
import reportApi from '../../api/reportApi'
import { getErrorMessage } from '../../api/axiosClient'
import { PageHead, Panel, useFlash } from '../../components/admin/AdminUI'
import { BarList, Button, DataTable, StatCard } from '../../ds'
import { formatMoney } from '../../utils/format'

export default function AdminReportsPage() {
  const [byMovie, setByMovie] = useState([])
  const [byCinema, setByCinema] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [downloading, setDownloading] = useState(null)
  const [toast, flash] = useFlash()

  useEffect(() => {
    Promise.all([reportApi.revenueByMovie(), reportApi.revenueByCinema()])
      .then(([m, c]) => {
        // Sắp doanh thu cao nhất lên đầu
        setByMovie([...m].sort((a, b) => b.totalRevenue - a.totalRevenue))
        setByCinema([...c].sort((a, b) => b.totalRevenue - a.totalRevenue))
      })
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setLoading(false))
  }, [])

  async function download(type) {
    setDownloading(type)
    try {
      await reportApi.downloadExcel(type)
      flash('Đã tải file Excel')
    } catch (err) {
      flash('Không tải được file', getErrorMessage(err), 'warning')
    } finally {
      setDownloading(null)
    }
  }

  if (loading) return <p className="muted">Đang tải...</p>
  if (error) return <p className="alert-error">{error}</p>

  const totalRevenue = byMovie.reduce((s, r) => s + Number(r.totalRevenue), 0)
  const totalTickets = byMovie.reduce((s, r) => s + r.ticketsSold, 0)
  const top = byMovie[0]

  const excelButton = (type) => (
    <Button size="sm" variant="secondary" iconLeft="download" disabled={!!downloading} onClick={() => download(type)}>
      {downloading === type ? 'Đang tải...' : 'Tải Excel'}
    </Button>
  )

  // BarList cần { label, value, display }
  const bars = (rows, labelKey) =>
    rows.map((r) => ({ label: r[labelKey], value: Number(r.totalRevenue), display: formatMoney(r.totalRevenue) }))

  return (
    <div className="admin-page">
      <PageHead title="Doanh thu" sub="Doanh thu từ vé đã thanh toán" />

      <div className="stat-grid">
        <StatCard label="Tổng doanh thu" value={formatMoney(totalRevenue)} icon="banknote" />
        <StatCard label="Vé đã bán" value={totalTickets} icon="ticket" />
        <StatCard label="Giá vé trung bình" value={totalTickets ? formatMoney(Math.round(totalRevenue / totalTickets)) : '—'} icon="receipt" />
        <StatCard label="Phim dẫn đầu" value={top ? top.title : '—'} icon="trophy"
          caption={top && totalRevenue ? `${Math.round((top.totalRevenue / totalRevenue) * 100)}% doanh thu` : undefined} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 16, alignItems: 'start' }}>
        <Panel title="Theo phim" right={excelButton('movie')}>
          {byMovie.length === 0 ? <p className="muted">Chưa có doanh thu.</p> : <>
            <BarList items={bars(byMovie, 'title')} />
            <DataTable style={{ marginTop: 20 }} rowKey="movieId" rows={byMovie} columns={[
              { key: 'title', label: 'Phim', render: (r) => <b>{r.title}</b> },
              { key: 'ticketsSold', label: 'Vé', align: 'right', mono: true },
              { key: 'totalRevenue', label: 'Doanh thu', align: 'right', mono: true, render: (r) => formatMoney(r.totalRevenue) },
            ]} />
          </>}
        </Panel>

        <Panel title="Theo rạp" right={excelButton('cinema')}>
          {byCinema.length === 0 ? <p className="muted">Chưa có doanh thu.</p> : <>
            <BarList items={bars(byCinema, 'cinemaName')} color="var(--gold-500)" />
            <DataTable style={{ marginTop: 20 }} rowKey="cinemaId" rows={byCinema} columns={[
              { key: 'cinemaName', label: 'Rạp', render: (r) => <b>{r.cinemaName}</b> },
              { key: 'ticketsSold', label: 'Vé', align: 'right', mono: true },
              { key: 'totalRevenue', label: 'Doanh thu', align: 'right', mono: true, render: (r) => formatMoney(r.totalRevenue) },
            ]} />
          </>}
        </Panel>
      </div>

      {toast}
    </div>
  )
}
