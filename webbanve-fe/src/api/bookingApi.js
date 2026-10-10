// Gom các lời gọi API nhóm Booking (đặt vé). Tất cả cần đăng nhập (token tự gắn trong axiosClient).
// BookingResponse: { bookingId, bookingTime, bookingStatus, totalPrice, tickets: [{ id, price, seatCode, seat_id }],
//                    showtimeId, movieTitle, startTime, cinemaName, roomName }
import axiosClient from './axiosClient'

const bookingApi = {
  // body: { userId, showtimeId, seatIds: [..] } -> booking PENDING
  create: (body) => axiosClient.post('/bookings', body).then((res) => res.data),
  pay: (id) => axiosClient.patch(`/bookings/${id}/pay`).then((res) => res.data),
  cancel: (id) => axiosClient.patch(`/bookings/${id}/cancel`).then((res) => res.data),
  getById: (id) => axiosClient.get(`/bookings/${id}`).then((res) => res.data),
  getByUser: (userId) => axiosClient.get('/bookings', { params: { userId } }).then((res) => res.data),
}

export default bookingApi
