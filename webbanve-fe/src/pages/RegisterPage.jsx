import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { getErrorMessage } from '../api/axiosClient'
import { Button, Input } from '../ds'

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '', email: '', fullName: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const field = (name) => (e) => setForm({ ...form, [name]: e.target.value })

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await register(form) // BE trả token luôn -> đăng ký xong là đã đăng nhập
      navigate('/', { replace: true })
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Tạo tài khoản</h1>
        <p className="subtitle">Chỉ mất một phút để bắt đầu đặt vé.</p>
        <Input label="Họ tên" iconLeft="user" value={form.fullName} onChange={field('fullName')} />
        <Input label="Email" iconLeft="mail" type="email" value={form.email} onChange={field('email')} />
        <Input label="Tên đăng nhập" iconLeft="at-sign" value={form.username} onChange={field('username')} />
        <Input label="Mật khẩu" iconLeft="lock" type="password" value={form.password} onChange={field('password')} />
        {error && <p className="alert-error">{error}</p>}
        <Button type="submit" size="lg" fullWidth disabled={loading}>
          {loading ? 'Đang xử lý...' : 'Tạo tài khoản'}
        </Button>
        <p className="switch">Đã có tài khoản? <Link to="/login">Đăng nhập</Link></p>
      </form>
    </div>
  )
}
