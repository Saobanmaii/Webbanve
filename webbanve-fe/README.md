# MovieGo — Front-end web đặt vé xem phim

Giao diện React cho hệ thống đặt vé xem phim. Gọi REST API sang Back-end Spring Boot (`../webbanve`).

## Công nghệ
- **React 19 + Vite** (JavaScript)
- **react-router-dom** — điều hướng trang, route lồng nhau cho khu admin
- **axios** — gọi API, interceptor tự gắn JWT và xử lý 401
- **Design System MovieGo** (thiết kế trên Claude Design) — màu, font, component trong `src/ds/`
- **lucide** — bộ icon

## Cách chạy
Yêu cầu: Node.js 18+, Back-end đang chạy ở `http://localhost:8080`.

```bash
npm install
npm run dev        # mở http://localhost:5173
```
Build bản production: `npm run build` (kết quả ở `dist/`).

## Tài khoản
| Vai trò | Username | Password |
|---|---|---|
| Admin | `admin` | `admin123` |
| User | tự đăng ký ở trang **Đăng ký** | |

## Chức năng
**Người dùng**
- Xem danh sách phim (đang chiếu / sắp chiếu), lọc thể loại, tìm theo tên
- Xem chi tiết phim, chọn ngày và suất chiếu (nhóm theo rạp)
- Chọn ghế trên sơ đồ (ghế thường / VIP / đôi, ghế đã đặt bị khóa), tối đa 8 ghế
- Đặt vé (PENDING) → thanh toán giả lập (PAID) → nhận vé có mã đặt vé
- Vé của tôi: xem theo tab, thanh toán tiếp đơn đang chờ, hủy vé (nhả ghế)

**Quản trị viên**
- Tổng quan số liệu
- CRUD phim (kèm link poster)
- CRUD rạp, phòng chiếu; sinh sơ đồ ghế cho phòng
- CRUD suất chiếu (chặn trùng giờ cùng phòng), xem % ghế đã đặt
- Báo cáo doanh thu theo phim / theo rạp, tải file Excel

## Cấu trúc thư mục
```
src/
  main.jsx               entry: BrowserRouter + AuthProvider
  App.jsx                khai báo toàn bộ route
  api/                   axiosClient + mỗi nhóm API 1 file (movie, showtime, booking, ...)
  auth/                  AuthContext (user + token), ProtectedRoute / GuestRoute
  pages/                 các trang người dùng
  pages/admin/           các trang quản trị
  components/            Navbar, SeatMap, FlowHeader, Backdrop, EmptyState, admin/...
  ds/                    Design System MovieGo (tokens CSS + component)
  utils/format.js        định dạng tiền, ngày giờ, nhãn tiếng Việt cho enum
design/                  bản export gốc từ Claude Design (tham khảo)
```

Giải thích luồng dữ liệu từng màn hình: xem **`ROADMAP.md`** (phần 2).
Đặc tả API Back-end: xem **`API_SPEC.md`**.
