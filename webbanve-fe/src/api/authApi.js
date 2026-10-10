// Gom các lời gọi API nhóm Auth. Trả về data luôn (bỏ lớp response của axios).
import axiosClient from './axiosClient'

const authApi = {
  // body: { username, password } -> { token, userId, username, roles }
  login: (body) => axiosClient.post('/auth/login', body).then((res) => res.data),

  // body: { username, password, email, fullName } -> giống login
  register: (body) => axiosClient.post('/auth/register', body).then((res) => res.data),
}

export default authApi
