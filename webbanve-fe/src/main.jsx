// Entry point: gắn React App vào <div id="root"> trong index.html
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext.jsx'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* BrowserRouter: bật điều hướng theo URL cho toàn app */}
    <BrowserRouter>
      {/* AuthProvider: cho mọi component bên trong đọc được user đang đăng nhập */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
