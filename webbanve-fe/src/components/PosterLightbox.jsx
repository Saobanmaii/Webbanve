// Xem poster phóng to giữa màn hình (lightbox). Đóng bằng: bấm ra ngoài, nút X, hoặc phím Esc.
import { useEffect } from 'react'
import { IconButton } from '../ds'

// Ảnh TMDB có nhiều cỡ trong URL (/w500/, /w780/...). Đổi sang /original/ để xem nét nhất.
const hiRes = (url) => url?.replace(/\/t\/p\/w\d+\//, '/t/p/original/')

export default function PosterLightbox({ src, title, onClose }) {
  // Lắng nghe phím Esc khi đang mở; return = gỡ listener khi đóng
  useEffect(() => {
    if (!src) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [src, onClose])

  if (!src) return null

  return (
    <div className="lightbox" onClick={onClose}>
      <IconButton icon="x" label="Đóng" onClick={onClose} style={{ position: 'absolute', top: 20, right: 20 }} />
      {/* stopPropagation: bấm vào chính ảnh thì không đóng */}
      <img src={hiRes(src)} alt={title} onClick={(e) => e.stopPropagation()} />
      {title && <div className="lightbox-title">{title}</div>}
    </div>
  )
}
