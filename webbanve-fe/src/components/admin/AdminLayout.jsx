// Khung khu admin: sidebar trái + nội dung bên phải — theo design ui_kits/admin/Sidebar.jsx
// <Outlet /> = chỗ react-router chèn trang con (/admin/movies, /admin/cinemas...)
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { Icon } from '../../ds'

const ITEMS = [
  ['/admin', 'layout-dashboard', 'Tổng quan'],
  ['/admin/movies', 'film', 'Phim'],
  ['/admin/cinemas', 'building-2', 'Rạp & phòng'],
  ['/admin/showtimes', 'clock', 'Suất chiếu'],
  ['/admin/reports', 'bar-chart-3', 'Doanh thu'],
]

export default function AdminLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="admin-shell" style={{ display: 'flex', minHeight: '100vh' }}>
      <aside className="admin-sidebar">
        <div style={{ padding: '0 10px', display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{ font: '800 22px/1 var(--font-display)', letterSpacing: '-0.02em' }}>
            Movie<span style={{ color: 'var(--accent)' }}>Go</span>
          </span>
          <span className="overline" style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>ADMIN</span>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {ITEMS.map(([to, icon, label]) => (
            // NavLink tự biết đang ở trang nào -> isActive. `end` để /admin không sáng khi ở /admin/movies
            <NavLink key={to} to={to} end={to === '/admin'} className={({ isActive }) => 'admin-nav' + (isActive ? ' on' : '')}>
              {({ isActive }) => (
                <>
                  {isActive && <span className="admin-nav-bar" />}
                  <Icon name={icon} size={18} color={isActive ? 'var(--accent)' : 'currentColor'} />
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="admin-user">
          <span className="avatar">{user.username.slice(0, 2).toUpperCase()}</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ font: '600 13px var(--font-body)' }}>{user.username}</div>
            <div style={{ display: 'flex', gap: 10, marginTop: 4, fontSize: 12 }}>
              <a onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Trang khách</a>
              <a onClick={() => { logout(); navigate('/login') }} style={{ cursor: 'pointer' }}>Đăng xuất</a>
            </div>
          </div>
        </div>
      </aside>

      <main className="admin-main" style={{ flex: 1, minWidth: 0, padding: '32px 40px 64px' }}>
        <Outlet />
      </main>
    </div>
  )
}
