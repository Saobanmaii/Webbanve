import EmptyState from '../components/EmptyState'

export default function NotFoundPage() {
  return (
    <EmptyState icon="clapperboard" code="Lỗi 404" title="Không tìm thấy trang"
      message="Đường dẫn này không tồn tại hoặc đã bị gỡ. Quay lại để xem các phim đang chiếu." />
  )
}
