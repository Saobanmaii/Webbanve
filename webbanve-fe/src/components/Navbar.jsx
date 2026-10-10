// Thanh menu trên cùng = NavBar của Design System + logic đăng nhập/phân quyền.
// NavBar chỉ lo giao diện; ở đây ta quyết định hiện link nào và đổi trang bằng navigate().
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { NavBar, Button } from '../ds'

// id của link -> đường dẫn URL
const PATHS = { home: '/', movies: '/', bookings: '/my-bookings', admin: '/admin' }

export default function Navbar() {
  const { user, isAdmin, logout } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const links = [{ id: 'movies', label: 'Phim' }]
  if (user) links.push({ id: 'bookings', label: 'Vé của tôi' })
  if (isAdmin) links.push({ id: 'admin', label: 'Quản trị' })

  // Link nào đang active (có chấm đỏ) — dựa theo URL hiện tại
  const active = pathname.startsWith('/admin') ? 'admin'
    : pathname.startsWith('/my-bookings') ? 'bookings'
    : 'movies'

  function handleLogout() {
    logout()
    navigate('/login')
  }

  const right = user ? (
    <>
      <span className="nav-greeting" style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
        Xin chào, <b style={{ color: 'var(--text-primary)' }}>{user.username}</b>
      </span>
      <Button variant="outline" size="sm" iconLeft="log-out" onClick={handleLogout}>Đăng xuất</Button>
    </>
  ) : (
    <>
      <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>Đăng nhập</Button>
      <Button size="sm" onClick={() => navigate('/register')}>Đăng ký</Button>
    </>
  )

  return (
    <div className="app-header">
      <NavBar links={links} active={active} right={right} onNavigate={(id) => navigate(PATHS[id] || '/')} />
    </div>
  )
}
