// Trợ lý AI. Cần đăng nhập (token tự gắn trong axiosClient).
// body: { messages: [{ role: 'user' | 'assistant', content }] }  -> lịch sử chat, tin cuối là của user
// trả về: { reply, movies: [{ id, title, posterUrl, genre, durationMinutes, rating, ageRating, status }] }
import axiosClient from './axiosClient'

const chatApi = {
  send: (messages) => axiosClient.post('/chat', { messages }).then((res) => res.data),
}

export default chatApi
