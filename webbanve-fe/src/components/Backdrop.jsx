// Ảnh nền lớn (hero) — lấy từ design ui_kits/web/Backdrop.jsx.
// Có src -> dùng ảnh thật; không có -> nền màu sinh từ tên phim (mỗi phim 1 màu riêng).
export default function Backdrop({ seed = '', src, height = 560, children, style }) {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) % 360
  const bg = src
    ? `center / cover no-repeat url("${src}")`
    : `radial-gradient(70% 90% at 72% 40%, oklch(0.34 0.06 ${h}), oklch(0.12 0.02 ${h}) 70%)`
  return (
    <div style={{ position: 'relative', height, overflow: 'hidden', background: bg, ...style }}>
      {/* Lớp phủ đen bên trái + dưới để chữ trắng dễ đọc */}
      <div style={{ position: 'absolute', inset: 0, background: 'var(--scrim-hero)' }} />
      <div style={{ position: 'relative', height: '100%' }}>{children}</div>
    </div>
  )
}
