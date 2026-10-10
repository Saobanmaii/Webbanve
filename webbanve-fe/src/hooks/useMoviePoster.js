// Hook tra poster cho đơn đặt vé.
// Đơn đặt vé (BookingResponse) có thể chưa có `posterUrl` -> tải danh sách phim 1 lần rồi tra theo tên phim.
// Dùng: const posterOf = useMoviePoster();  posterOf(booking) -> link ảnh hoặc undefined
import { useEffect, useState } from 'react'
import movieApi from '../api/movieApi'

// Cache ở cấp module: nhiều trang/nhiều lần gọi hook cũng chỉ gọi GET /movies đúng 1 lần
let cachePromise = null
const loadPosters = () =>
  (cachePromise ||= movieApi
    .getAll(0, 500)
    .then((page) => Object.fromEntries(page.content.map((m) => [m.title, m.posterUrl])))
    .catch(() => {
      cachePromise = null // lỗi thì lần sau thử lại
      return {}
    }))

export default function useMoviePoster() {
  const [byTitle, setByTitle] = useState({})

  useEffect(() => {
    loadPosters().then(setByTitle)
  }, [])

  // Ưu tiên posterUrl BE trả trong đơn; không có thì tra theo tên phim
  return (booking) => booking?.posterUrl || byTitle[booking?.movieTitle] || undefined
}
