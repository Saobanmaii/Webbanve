// Bọc quanh trang cần đăng nhập. <ProtectedRoute adminOnly> = chỉ ADMIN.
// Chưa login -> đẩy về /login (nhớ trang đang muốn vào để login xong quay lại).
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './AuthContext'
import EmptyState from '../components/EmptyState'

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, isAdmin } = useAuth()
  const location = useLocation()

  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  if (adminOnly && !isAdmin) {
    return <EmptyState icon="lock" code="Lỗi 403" title="Bạn không có quyền vào trang này"
      message="Trang này chỉ dành cho quản trị viên." />
  }
  return children
}

// Ngược lại: trang chỉ dành cho người CHƯA đăng nhập (login, register).
// Đã đăng nhập mà vào /login -> chuyển về trang chủ (admin -> khu admin).
export function GuestRoute({ children }) {
  const { user, isAdmin } = useAuth()
  if (user) return <Navigate to={isAdmin ? '/admin' : '/'} replace />
  return children
}
