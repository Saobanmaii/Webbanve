# Front-end — Website đặt vé xem phim (React)

> File context cho phiên Claude Code làm **Front-end**. Back-end (Spring Boot) đã xong 100%.
> Nhiệm vụ của project này: dựng giao diện React gọi sang BE qua REST API.
> **API chi tiết nằm ở file `API_SPEC.md`** cùng thư mục — ĐỌC NÓ TRƯỚC khi code bất cứ màn hình nào.

## 1. Bối cảnh & mục tiêu
- Bài tập lớn: **web đặt vé xem phim** (user đặt vé + admin quản lý). Gồm 2 phần: BE (đã xong), FE (project này).
- **Deadline: nộp cả FE + BE trong tuần này** (kể từ 2026-10-09). Cần làm nhanh, ưu tiên chạy được end-to-end.
- Phạm vi FE: **đầy đủ luồng USER + ADMIN** (xem danh mục, đặt vé, thanh toán giả lập, xem vé; admin CRUD phim/rạp/phòng/ghế/suất + báo cáo doanh thu).

## 2. Người làm & cách làm việc (QUAN TRỌNG)
- Giao tiếp **tiếng Việt**. Người làm biết **Java/Spring (BE)** và **React cơ bản**, nhưng sẽ **dùng AI là chính** để dựng FE — **không gõ tay nhiều**.
- Người làm muốn **HIỂU cấu trúc & luồng** (routing, gọi API, quản lý token, phân quyền UI), không chỉ copy mù.
- Khi viết code: **giải thích ngắn gọn bản chất** (component này làm gì, data chảy thế nào), đi **từng bước nhỏ**, giữ app **luôn chạy được** trước khi thêm tính năng.
- Báo lỗi theo kiểu: người làm bấm chạy (`npm run dev`) + copy log lỗi gửi lại.

## 3. Stack & công cụ (đã chốt)
- **React + Vite** (JavaScript). Dev server chạy ở **cổng 5173**.
- **axios** — gọi API. **react-router-dom** — điều hướng trang. (Đã `npm install` 2 cái này.)
- IDE: IntelliJ Ultimate (mở `webbanve-fe` như project riêng, tách khỏi BE).
- Chạy: `npm run dev` → mở `http://localhost:5173`.

## 4. Kết nối Back-end
- **Base URL:** `http://localhost:8080` (chạy BE Spring ở một cửa sổ riêng cùng lúc).
- **CORS:** BE đã mở sẵn cho `http://localhost:5173` — FE gọi được ngay, không cần chỉnh gì.
- **Xác thực: JWT.** Login xong nhận `token` → lưu lại (localStorage) → đính vào **mọi** request cần quyền:
  ```
  Authorization: Bearer <token>
  ```
- **Tài khoản admin có sẵn (seed trong DB):** username `admin` / password `admin123` (role `ROLE_ADMIN`).
- User thường: tự đăng ký qua `POST /auth/register` (được gán `ROLE_USER`).
- Response login:
  ```json
  { "token": "eyJ...", "username": "kiet", "roles": ["ROLE_USER"] }
  ```
  → Dựa vào `roles` để quyết định hiện/ẩn menu admin.

## 5. Cấu trúc FE đề xuất
```
src/
  main.jsx              # entry, bọc <BrowserRouter>
  App.jsx               # khai báo <Routes> (các đường dẫn)
  api/
    axiosClient.js      # tạo axios instance: baseURL=8080 + interceptor tự gắn Bearer token
    authApi.js, movieApi.js, showtimeApi.js, bookingApi.js, ... # gom lời gọi API theo nhóm
  auth/
    AuthContext.jsx     # lưu user + token toàn cục (React Context)
    ProtectedRoute.jsx  # chặn route cần đăng nhập / cần ADMIN
  pages/
    LoginPage.jsx, RegisterPage.jsx
    HomePage.jsx            # danh sách phim
    MovieDetailPage.jsx     # chi tiết phim + chọn suất
    SeatSelectPage.jsx      # sơ đồ ghế + đặt vé
    MyBookingsPage.jsx      # vé của tôi
    admin/                  # trang quản lý (chỉ ADMIN)
      AdminMoviesPage.jsx, AdminCinemasPage.jsx, AdminRoomsPage.jsx,
      AdminShowtimesPage.jsx, AdminReportsPage.jsx
  components/
    Navbar.jsx, MovieCard.jsx, SeatMap.jsx, ...
```

## 6. Những điểm kỹ thuật FE phải nắm
- **Interceptor axios:** tạo 1 `axiosClient` có `baseURL = http://localhost:8080`; request interceptor đọc token từ localStorage và set header `Authorization`. Response interceptor: gặp **401 → xóa token + chuyển về /login**.
- **Lưu token:** `localStorage.setItem('token', ...)`. Khi F5 vẫn còn đăng nhập. (Đơn giản, đủ cho bài tập.)
- **Phân quyền UI:** `ProtectedRoute` kiểm tra có token chưa; route admin kiểm tra `roles` có `ROLE_ADMIN` không → nếu không thì chặn.
- **Sơ đồ ghế:** `GET /showtimes/{id}/seats` trả mảng ghế có `booked` + `seatType`; vẽ lưới, ghế `booked=true` khóa lại, màu khác theo loại ghế; user tick → gom `seatIds` → `POST /bookings`.
- **Định dạng:** ngày `yyyy-MM-dd`; ngày giờ `yyyy-MM-ddTHH:mm:ss`; tiền là số → format hiển thị (vd `270.000đ`).
- **Xử lý lỗi theo status:** `400` = lỗi validation (hiện message); `401` = về login; `403` = không đủ quyền; `404` = không tìm thấy; `409` = xung đột (vd "ghế đã được đặt", "suất trùng giờ").
- **Phân trang:** endpoint danh sách trả object `Page`: `{ content:[...], totalElements, totalPages, number, size }`.

## 7. Luồng chính (chi tiết ở API_SPEC.md mục 9)
- **USER:** Đăng nhập → danh sách phim → chi tiết phim + chọn suất → chọn ghế → `POST /bookings` (PENDING) → `PATCH /bookings/{id}/pay` (PAID) → xem/hủy vé.
- **ADMIN:** Đăng nhập admin → CRUD phim/rạp/phòng → sinh ghế cho phòng → CRUD suất chiếu → xem báo cáo doanh thu + tải Excel.

## 8. Thứ tự làm đề xuất (để luôn có bản chạy được)
1. `axiosClient` + `AuthContext` + trang **Login/Register** → đăng nhập được, lưu token.
2. **HomePage** (danh sách phim) — việc đọc public, không cần token, dễ kiểm tra kết nối BE.
3. **MovieDetail → chọn suất → SeatSelect → đặt vé → thanh toán** (luồng USER lõi).
4. **MyBookings** (xem/hủy vé).
5. **Khu admin**: phim → rạp → phòng → ghế → suất → báo cáo.
6. Polish UI, xử lý lỗi, loading state.

---
**Nhắc lại:** đọc `API_SPEC.md` để biết chính xác path/method/body/response của từng endpoint. BE đang chạy ở `localhost:8080`, FE ở `localhost:5173`.
