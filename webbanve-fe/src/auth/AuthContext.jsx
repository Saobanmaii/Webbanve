// AuthContext: "kho" chứa thông tin đăng nhập, component nào cũng đọc được
// (giống SecurityContextHolder bên Spring). Dùng: const { user, login, logout } = useAuth()
import { createContext, useContext, useState } from 'react'
import authApi from '../api/authApi'

const AuthContext = createContext(null)

// Khi F5, đọc lại user từ localStorage để vẫn giữ đăng nhập
function loadUser() {
  try {
    return JSON.parse(localStorage.getItem('user'))
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadUser) // { userId, username, roles } hoặc null

  // Lưu kết quả login/register vào localStorage + state
  function saveSession(data) {
    const u = { userId: data.userId, username: data.username, roles: data.roles }
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(u))
    setUser(u) // đổi state -> mọi component dùng useAuth() tự vẽ lại
    return u
  }

  async function login(username, password) {
    return saveSession(await authApi.login({ username, password }))
  }

  async function register(form) {
    return saveSession(await authApi.register(form))
  }

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  const isAdmin = !!user?.roles?.includes('ROLE_ADMIN')

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
