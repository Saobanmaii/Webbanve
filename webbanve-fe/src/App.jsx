// App: khung chung (Navbar) + bảng định tuyến URL -> trang
import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import ProtectedRoute, { GuestRoute } from './auth/ProtectedRoute.jsx'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import MovieDetailPage from './pages/MovieDetailPage.jsx'
import SeatSelectPage from './pages/SeatSelectPage.jsx'
import PaymentPage from './pages/PaymentPage.jsx'
import ConfirmationPage from './pages/ConfirmationPage.jsx'
import MyBookingsPage from './pages/MyBookingsPage.jsx'
import AdminLayout from './components/admin/AdminLayout.jsx'
import AdminDashboardPage from './pages/admin/AdminDashboardPage.jsx'
import AdminMoviesPage from './pages/admin/AdminMoviesPage.jsx'
import AdminCinemasPage from './pages/admin/AdminCinemasPage.jsx'
import AdminShowtimesPage from './pages/admin/AdminShowtimesPage.jsx'
import AdminReportsPage from './pages/admin/AdminReportsPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

// Các trang luồng đặt vé (có FlowHeader) và khu admin (có sidebar) không dùng Navbar
const hideNavbar = (path) => /^\/showtimes\/\d+\/seats|^\/bookings\/\d+\/(pay|done)|^\/admin/.test(path)

export default function App() {
  const { pathname } = useLocation()

  // Đổi trang -> cuộn lên đầu (react-router không tự làm việc này)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      {!hideNavbar(pathname) && <Navbar />}
      {/* Mỗi trang tự bọc <div className="container"> nếu cần (trang login thì full màn hình) */}
      <main>
        <Routes>
          {/* Public */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
          <Route path="/register" element={<GuestRoute><RegisterPage /></GuestRoute>} />
          {/* :id là tham số động, trang đọc bằng useParams() */}
          <Route path="/movies/:id" element={<MovieDetailPage />} />
          {/* Xem sơ đồ ghế không cần login; bấm đặt mới bắt login */}
          <Route path="/showtimes/:id/seats" element={<SeatSelectPage />} />

          {/* Cần đăng nhập */}
          <Route path="/bookings/:id/pay" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
          <Route path="/bookings/:id/done" element={<ProtectedRoute><ConfirmationPage /></ProtectedRoute>} />
          <Route path="/my-bookings" element={<ProtectedRoute><MyBookingsPage /></ProtectedRoute>} />

          {/* Chỉ ADMIN */}
          {/* Route lồng nhau: AdminLayout (sidebar) bọc ngoài, trang con hiện ở <Outlet /> */}
          <Route path="/admin" element={<ProtectedRoute adminOnly><AdminLayout /></ProtectedRoute>}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="movies" element={<AdminMoviesPage />} />
            <Route path="cinemas" element={<AdminCinemasPage />} />
            <Route path="showtimes" element={<AdminShowtimesPage />} />
            <Route path="reports" element={<AdminReportsPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  )
}
