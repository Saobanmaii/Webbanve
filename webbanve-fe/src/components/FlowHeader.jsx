// Header của luồng đặt vé (thay cho Navbar): nút quay lại + thanh các bước.
// Theo design ui_kits/web/SeatSelect.jsx (FlowHeader).
import { IconButton, Stepper } from '../ds'

const STEPS = ['Suất chiếu', 'Chọn ghế', 'Thanh toán', 'Hoàn tất']

export default function FlowHeader({ step, onBack }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24, padding: '24px var(--gutter)', borderBottom: '1px solid var(--border-subtle)' }}>
      {onBack && <IconButton icon="arrow-left" label="Quay lại" onClick={onBack} />}
      <Stepper steps={STEPS} current={step} style={{ flex: 1, maxWidth: 640 }} />
    </div>
  )
}
