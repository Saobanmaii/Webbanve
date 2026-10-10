// Màn hình thông báo giữa trang (404, 403...) theo style design: icon tròn + tiêu đề + mô tả + nút
import { useNavigate } from 'react-router-dom'
import { Button, Icon } from '../ds'

export default function EmptyState({ icon = 'film', code, title, message, actionLabel = 'Về trang chủ', actionTo = '/' }) {
  const navigate = useNavigate()
  return (
    <div className="empty-state">
      <div className="empty-icon"><Icon name={icon} size={28} color="var(--accent)" /></div>
      {code && <div className="overline" style={{ color: 'var(--text-tertiary)' }}>{code}</div>}
      <h1 className="confirm-title" style={{ fontSize: 32 }}>{title}</h1>
      {message && <p style={{ margin: 0, color: 'var(--text-secondary)', maxWidth: 420 }}>{message}</p>}
      <Button iconLeft="arrow-left" onClick={() => navigate(actionTo)}>{actionLabel}</Button>
    </div>
  )
}
