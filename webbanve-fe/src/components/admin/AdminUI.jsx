// Mấy khối giao diện dùng chung cho các trang admin — theo design ui_kits/admin/Sidebar.jsx
import { useRef, useState } from 'react'
import { Toast } from '../../ds'

// Tiêu đề trang + nút hành động bên phải
export function PageHead({ title, sub, actions }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20 }}>
      <div>
        <h1 style={{ margin: 0, font: '700 30px/1.15 var(--font-display)', letterSpacing: '-0.01em' }}>{title}</h1>
        {sub && <p style={{ margin: '6px 0 0', color: 'var(--text-secondary)' }}>{sub}</p>}
      </div>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>{actions}</div>
    </div>
  )
}

// Khung thẻ có tiêu đề
export function Panel({ title, right, children, style }) {
  return (
    <section style={{ background: 'var(--surface-1)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 20, ...style }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
        <h2 style={{ margin: 0, font: '700 16px var(--font-display)' }}>{title}</h2>
        {right}
      </div>
      {children}
    </section>
  )
}

// Thông báo nổi góc phải dưới, tự tắt sau 3 giây.
// Dùng: const [toast, flash] = useFlash();  flash('Đã lưu');  ... {toast}
export function useFlash() {
  const [msg, setMsg] = useState(null)
  const timer = useRef()
  function flash(title, message, tone = 'success') {
    setMsg({ title, message, tone })
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setMsg(null), 3000)
  }
  const toast = msg && (
    <Toast tone={msg.tone} title={msg.title} message={msg.message} onClose={() => setMsg(null)}
      style={{ position: 'fixed', right: 24, bottom: 24, zIndex: 200 }} />
  )
  return [toast, flash]
}
