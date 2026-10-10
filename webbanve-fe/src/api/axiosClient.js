// Một "máy gọi API" dùng chung cho cả app.
// Mọi file api/*.js đều import cái này thay vì gọi axios trực tiếp.
import axios from 'axios'

const axiosClient = axios.create({
  // Khi deploy: đặt biến VITE_API_URL = URL backend (vd https://webbanve-api.onrender.com)
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  // Server miễn phí "ngủ" khi không ai dùng, lần đầu có thể mất ~60s để khởi động
  timeout: 90000,
  headers: { 'Content-Type': 'application/json', 'Accept-Language': 'vi' },
})

// Request interceptor: chạy TRƯỚC mỗi request -> tự gắn token nếu đã đăng nhập
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Response interceptor: chạy SAU mỗi response lỗi
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    const isAuthCall = error.config?.url?.startsWith('/auth/')
    // 401 = token hết hạn/sai -> xóa phiên, về trang login.
    // Bỏ qua chính request login/register (sai mật khẩu cũng là 401, để trang tự báo lỗi).
    if (status === 401 && !isAuthCall) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Tên field BE -> nhãn tiếng Việt để hiện trong lỗi validation
const FIELD_LABELS = {
  username: 'Tên đăng nhập', password: 'Mật khẩu', email: 'Email', fullName: 'Họ tên',
  title: 'Tên phim', description: 'Mô tả', durationMinutes: 'Thời lượng', releaseDate: 'Ngày khởi chiếu',
  language: 'Ngôn ngữ', genre: 'Thể loại', ageRating: 'Nhãn tuổi', status: 'Trạng thái', posterUrl: 'Poster',
  name: 'Tên', address: 'Địa chỉ', roomType: 'Loại phòng', cinemaId: 'Rạp', roomId: 'Phòng', movieId: 'Phim',
  startTime: 'Giờ chiếu', price: 'Giá vé', showtimeId: 'Suất chiếu', seatIds: 'Ghế',
}

// Lấy câu báo lỗi dễ đọc từ response BE: { message, fieldErrors: { field: "lỗi" } }
export function getErrorMessage(error) {
  const data = error.response?.data
  if (error.code === 'ECONNABORTED') return 'Máy chủ phản hồi quá lâu (có thể đang khởi động), vui lòng thử lại sau ít giây.'
  if (!error.response) return 'Không kết nối được server (BE đã chạy chưa?)'
  if (data?.fieldErrors) {
    return Object.entries(data.fieldErrors)
      .map(([field, msg]) => `${FIELD_LABELS[field] || field}: ${msg}`)
      .join('\n')
  }
  return data?.message || `Lỗi ${error.response.status}`
}

export default axiosClient
