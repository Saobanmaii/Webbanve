// Gom các lời gọi API nhóm Room (phòng chiếu) + sinh ghế
import axiosClient from './axiosClient'

const roomApi = {
  getById: (id) => axiosClient.get(`/rooms/${id}`).then((res) => res.data), // public

  // ADMIN
  getAll: (page = 0, size = 100) =>
    axiosClient.get('/rooms', { params: { page, size } }).then((res) => res.data),
  create: (body) => axiosClient.post('/rooms', body).then((res) => res.data),
  update: (id, body) => axiosClient.patch(`/rooms/${id}`, body).then((res) => res.data),
  remove: (id) => axiosClient.delete(`/rooms/${id}`),
  generateSeats: (roomId, rows, columns) =>
    axiosClient
      .post(`/seats/room/${roomId}/seats/generate`, null, { params: { rows, columns } })
      .then((res) => res.data),
}

export default roomApi
