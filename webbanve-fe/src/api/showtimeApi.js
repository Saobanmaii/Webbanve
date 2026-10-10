// Gom các lời gọi API nhóm Showtime (suất chiếu)
import axiosClient from './axiosClient'

const showtimeApi = {
  getAll: (page = 0, size = 100) =>
    axiosClient.get('/showtimes', { params: { page, size } }).then((res) => res.data),

  getById: (id) => axiosClient.get(`/showtimes/${id}`).then((res) => res.data),

  // Lọc tùy chọn { movieId, cinemaId, date: 'yyyy-MM-dd' } -> mảng suất (không phân trang)
  search: (params) => axiosClient.get('/showtimes/search', { params }).then((res) => res.data),

  // Sơ đồ ghế của 1 suất: [{ seatId, rowLabel, seatNumber, seatType, booked }]
  getSeats: (id) => axiosClient.get(`/showtimes/${id}/seats`).then((res) => res.data),

  // ADMIN
  create: (body) => axiosClient.post('/showtimes', body).then((res) => res.data),
  update: (id, body) => axiosClient.patch(`/showtimes/${id}`, body).then((res) => res.data),
  remove: (id) => axiosClient.delete(`/showtimes/${id}`),
}

export default showtimeApi
