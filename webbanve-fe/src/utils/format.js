// Các hàm định dạng hiển thị dùng chung + nhãn tiếng Việt cho enum của BE

// 270000 -> "270.000đ"
export const formatMoney = (n) => (n == null ? '' : Number(n).toLocaleString('vi-VN') + 'đ')

// "2026-09-01" -> "01/09/2026"
export const formatDate = (s) => (s ? s.slice(0, 10).split('-').reverse().join('/') : '')

// "2026-09-20T19:30:00" -> "19:30"
export const formatTime = (s) => (s ? s.slice(11, 16) : '')

// 143 -> "2h 23m"
export const formatDuration = (m) => (m ? `${Math.floor(m / 60)}h ${m % 60}m` : '')

// "2026-12-25" -> "T6" (thứ trong tuần, CN = Chủ nhật)
const WEEKDAYS = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']
export const weekdayOf = (date) => WEEKDAYS[new Date(date + 'T00:00:00').getDay()]

// "2026-12-25" -> "Thứ 6, 25/12/2026"
export const formatLongDate = (date) => {
  const w = weekdayOf(date)
  return `${w === 'CN' ? 'Chủ nhật' : 'Thứ ' + w.slice(1)}, ${formatDate(date)}`
}

// Phụ thu theo loại ghế (khớp với BE: VIP +30k, COUPLE +50k) — chỉ để hiện giá tạm tính,
// tổng tiền thật luôn lấy từ BE (totalPrice) sau khi đặt.
export const SEAT_SURCHARGE = { STANDARD: 0, VIP: 30000, COUPLE: 50000 }

// "Hành Động, Phiêu Lưu" -> ["Hành Động", "Phiêu Lưu"]  (BE lưu nhiều thể loại trong 1 chuỗi)
export const genresOf = (movie) => (movie?.genre ? movie.genre.split(',').map((g) => g.trim()).filter(Boolean) : [])

// Link YouTube "watch?v=KEY" / "youtu.be/KEY" -> link nhúng iframe "embed/KEY"
export const youtubeEmbed = (url) => {
  const key = url?.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{6,})/)?.[1]
  return key ? `https://www.youtube.com/embed/${key}?autoplay=1` : null
}

// Mã đặt vé hiển thị: 5 -> "MG-00005"
export const bookingRef = (id) => 'MG-' + String(id).padStart(5, '0')

export const MOVIE_STATUS = { NOW_SHOWING: 'Đang chiếu', COMING_SOON: 'Sắp chiếu', ENDED: 'Đã kết thúc' }
export const AGE_RATING = { P: 'P', C13: 'T13', C16: 'T16', C18: 'T18' }
export const ROOM_TYPE = { TWO_D: '2D', THREE_D: '3D', IMAX: 'IMAX' }
export const SEAT_TYPE = { STANDARD: 'Thường', VIP: 'VIP', COUPLE: 'Đôi' }
export const BOOKING_STATUS = { PENDING: 'Chờ thanh toán', PAID: 'Đã thanh toán', CANCELLED: 'Đã hủy' }
