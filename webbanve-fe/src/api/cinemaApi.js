// Gom các lời gọi API nhóm Cinema (rạp)
import axiosClient from './axiosClient'

const cinemaApi = {
  getAll: (page = 0, size = 100) =>
    axiosClient.get('/cinemas', { params: { page, size } }).then((res) => res.data),
  getById: (id) => axiosClient.get(`/cinemas/${id}`).then((res) => res.data),

  // ADMIN
  create: (body) => axiosClient.post('/cinemas', body).then((res) => res.data),
  update: (id, body) => axiosClient.patch(`/cinemas/${id}`, body).then((res) => res.data),
  remove: (id) => axiosClient.delete(`/cinemas/${id}`),
}

export default cinemaApi
