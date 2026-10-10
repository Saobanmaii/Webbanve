// Tổng quan admin — theo design ui_kits/admin/Dashboard.jsx
// Số liệu nhanh: phim, rạp/phòng (totalElements của Page), suất hôm nay (/showtimes/search?date=), doanh thu (/reports).
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import movieApi from '../../api/movieApi'
import cinemaApi from '../../api/cinemaApi'
import roomApi from '../../api/roomApi'
import showtimeApi from '../../api/showtimeApi'
import reportApi from '../../api/reportApi'
import { getErrorMessage } from '../../api/axiosClient'
import { PageHead, Panel } from '../../components/admin/AdminUI'
import { Badge, BarList, Button, DataTable, StatCard } from '../../ds'
import { MOVIE_STATUS, formatDate, formatMoney } from '../../utils/format'

const STATUS_TONE = { NOW_SHOWING: 'success', COMING_SOON: 'info', ENDED: 'neutral' }

export default function AdminDashboardPage() {
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const d = new Date()
    const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    Promise.all([
      movieApi.getAll(0, 200), cinemaApi.getAll(), roomApi.getAll(),
      showtimeApi.getAll(0, 1), // chỉ cần totalElements
      showtimeApi.search({ date: today }),
      reportApi.revenueByMovie(),
    ])
      .then(([movies, cinemas, rooms, allShowtimes, todayShowtimes, revenue]) => {
        setData({
          movies: movies.content,
          cinemas: cinemas.totalElements,
          rooms: rooms.totalElements,
          totalShowtimes: allShowtimes.totalElements,
          todayShowtimes: todayShowtimes.length,
          revenue: [...revenue].sort((a, b) => b.totalRevenue - a.totalRevenue),
        })
      })
      .catch((err) => setError(getErrorMessage(err)))
  }, [])

  if (error) return <p className="alert-error">{error}</p>
  if (!data) return <p className="muted">Đang tải...</p>

  return (
    <div className="admin-page">
      <PageHead title="Tổng quan" sub="Toàn bộ hệ thống rạp" />
      <div className="stat-grid">
        <StatCard label="Phim" value={data.movies.length} icon="film"
          caption={`${data.movies.filter((m) => m.status === 'NOW_SHOWING').length} đang chiếu`} />
        <StatCard label="Rạp" value={data.cinemas} icon="building-2" caption={`${data.rooms} phòng chiếu`} />
        <StatCard label="Suất hôm nay" value={data.todayShowtimes} icon="clock" caption={`${data.totalShowtimes} suất tổng cộng`} />
        <StatCard label="Doanh thu" icon="banknote"
          value={formatMoney(data.revenue.reduce((s, r) => s + Number(r.totalRevenue), 0))}
          caption={`${data.revenue.reduce((s, r) => s + r.ticketsSold, 0)} vé đã bán`} />
      </div>
      <Panel title="Doanh thu theo phim (top 5)"
        right={<Button size="sm" variant="ghost" iconRight="arrow-right" onClick={() => navigate('/admin/reports')}>Báo cáo đầy đủ</Button>}>
        {data.revenue.length === 0 ? <p className="muted">Chưa có doanh thu.</p> : (
          <BarList items={data.revenue.slice(0, 5).map((r) => ({ label: r.title, value: Number(r.totalRevenue), display: formatMoney(r.totalRevenue) }))} />
        )}
      </Panel>
      <Panel title="Phim mới nhất"
        right={<Button size="sm" variant="ghost" iconRight="arrow-right" onClick={() => navigate('/admin/movies')}>Quản lý phim</Button>}>
        <DataTable style={{ border: 0, margin: '-4px -20px -20px' }}
          columns={[
            { key: 'title', label: 'Tên phim', render: (m) => <b>{m.title}</b> },
            { key: 'genre', label: 'Thể loại', muted: true },
            { key: 'releaseDate', label: 'Khởi chiếu', mono: true, render: (m) => formatDate(m.releaseDate) },
            { key: 'status', label: 'Trạng thái', render: (m) => <Badge tone={STATUS_TONE[m.status]}>{MOVIE_STATUS[m.status]}</Badge> },
          ]}
          rows={[...data.movies].sort((a, b) => b.id - a.id).slice(0, 5)} />
      </Panel>
    </div>
  )
}
