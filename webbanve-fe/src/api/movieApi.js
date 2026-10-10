// Gom các lời gọi API nhóm Movie. Mỗi hàm trả về data (bỏ lớp response của axios).
import axiosClient from './axiosClient'

const movieApi = {
  // Danh sách phân trang -> { content: [...], totalElements, totalPages, number, size }
  getAll: (page = 0, size = 100) =>
    axiosClient.get('/movies', { params: { page, size } }).then((res) => res.data),

  getById: (id) => axiosClient.get(`/movies/${id}`).then((res) => res.data),

  // Lọc tùy chọn: { title, status, genre, minDuration, ageRating }
  search: (params) => axiosClient.get('/movies/search', { params }).then((res) => res.data),

  // ADMIN
  create: (body) => axiosClient.post('/movies', body).then((res) => res.data),
  update: (id, body) => axiosClient.patch(`/movies/${id}`, body).then((res) => res.data),
  remove: (id) => axiosClient.delete(`/movies/${id}`),
}

export default movieApi
