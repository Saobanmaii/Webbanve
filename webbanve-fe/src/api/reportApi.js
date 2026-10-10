// Gom các lời gọi API nhóm Report (chỉ ADMIN)
import axiosClient from './axiosClient'

const reportApi = {
  // [{ movieId, title, totalRevenue, ticketsSold }]
  revenueByMovie: () => axiosClient.get('/reports/revenue-by-movie').then((res) => res.data),
  // [{ cinemaId, cinemaName, totalRevenue, ticketsSold }]
  revenueByCinema: () => axiosClient.get('/reports/revenue-by-cinema').then((res) => res.data),

  // Tải file Excel. Không dùng <a href> được vì endpoint cần header Authorization,
  // nên tải bằng axios dạng blob (dữ liệu nhị phân) rồi tạo link tạm để trình duyệt lưu file.
  downloadExcel: async (type /* 'movie' | 'cinema' */) => {
    const res = await axiosClient.get(`/reports/revenue-by-${type}/excel`, { responseType: 'blob' })
    const url = URL.createObjectURL(res.data)
    const a = document.createElement('a')
    a.href = url
    a.download = `doanh-thu-theo-${type === 'movie' ? 'phim' : 'rap'}.xlsx`
    a.click()
    URL.revokeObjectURL(url)
  },
}

export default reportApi
