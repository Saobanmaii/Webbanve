import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { getErrorMessage } from '../api/axiosClient'
import { Button, Input } from '../ds'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  // state = dữ liệu của component; đổi state -> giao diện tự cập nhật
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Trả về hàm onChange cho từng ô: field('username') cập nhật form.username
  const field = (name) => (e) => setForm({ ...form, [name]: e.target.value })

  async function handleSubmit(e) {
    e.preventDefault() // chặn form reload trang
    setError('')
    setLoading(true)
    try {
      const u = await login(form.username, form.password)
      // Quay lại trang đang muốn vào trước khi bị bắt login; admin mặc định vào khu admin
      const from = location.state?.from
      navigate(from || (u.roles.includes('ROLE_ADMIN') ? '/admin' : '/'), { replace: true })
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Đăng nhập</h1>
        <p className="subtitle">Đăng nhập để đặt vé và xem vé của bạn.</p>
        <Input label="Tên đăng nhập" iconLeft="user" value={form.username} onChange={field('username')} />
        <Input label="Mật khẩu" iconLeft="lock" type="password" value={form.password} onChange={field('password')} />
        {error && <p className="alert-error">{error}</p>}
        <Button type="submit" size="lg" fullWidth disabled={loading || !form.username || !form.password}>
          {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </Button>
        <p className="switch">Chưa có tài khoản? <Link to="/register">Đăng ký</Link></p>
      </form>
    </div>
  )
}
