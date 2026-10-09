# API SPEC — Website đặt vé xem phim (Back-end)

Tài liệu bàn giao cho người làm Front-end. Liệt kê toàn bộ API + các màn hình & luồng.

## 0. Thông tin chung

- **Base URL:** `http://localhost:8080`
- **Định dạng:** JSON (trừ endpoint xuất Excel trả file `.xlsx`).
- **Xác thực:** JWT. Sau khi login, client nhận 1 token và đính kèm vào MỌI request cần quyền:
  ```
  Authorization: Bearer <token>
  ```
- **Phân quyền (DỰ KIẾN — đang làm ở C10):**
  - `public` = ai cũng gọi được (không cần đăng nhập).
  - `USER` = phải đăng nhập.
  - `ADMIN` = phải đăng nhập + là admin.
- **Đa ngôn ngữ:** gửi header `Accept-Language: vi` hoặc `en` → câu lỗi đổi theo ngôn ngữ.
- **Phân trang:** các endpoint dạng danh sách trả về object `Page` của Spring: `{ content: [...], totalElements, totalPages, number, size }`.

### Mã lỗi hay gặp
| Status | Ý nghĩa |
|---|---|
| 200 / 201 / 204 | Thành công / Tạo mới / Xóa (không có body) |
| 400 | Dữ liệu gửi lên sai (validation) |
| 401 / 403 | Chưa đăng nhập / Không đủ quyền |
| 404 | Không tìm thấy tài nguyên |
| 409 | Xung đột (vd ghế đã đặt, suất trùng giờ, booking đã thanh toán) |

### Enum tham chiếu
| Enum | Giá trị |
|---|---|
| `MovieStatus` | `COMING_SOON`, `NOW_SHOWING`, `ENDED` |
| `AgeRating` | `P`, `C13`, `C16`, `C18` |
| `RoomType` | `TWO_D`, `THREE_D`, `IMAX` |
| `SeatType` | `STANDARD`, `VIP`, `COUPLE` |
| `BookingStatus` | `PENDING`, `PAID`, `CANCELLED` |

---

## 1. Auth (sẽ có ở C10)

| Method | Path | Quyền | Mô tả |
|---|---|---|---|
| POST | `/auth/register` | public | Đăng ký tài khoản (gán sẵn ROLE_USER) |
| POST | `/auth/login` | public | Đăng nhập → trả JWT |

**POST /auth/register** — body:
```json
{ "username": "kiet", "password": "123456", "email": "a@gmail.com", "fullName": "Tran Kiet" }
```
**POST /auth/login** — body:
```json
{ "username": "kiet", "password": "123456" }
```
→ trả về:
```json
{ "token": "eyJhbGciOi...", "username": "kiet", "userId": 5, "roles": ["ROLE_USER"] }
```
> Chi tiết chính xác sẽ cập nhật khi làm xong C10.

---

## 2. Movies (`/movies`)

| Method | Path | Quyền | Mô tả |
|---|---|---|---|
| GET | `/movies/{id}` | public | Chi tiết 1 phim |
| GET | `/movies?page=0&size=10` | public | Danh sách phim (phân trang) |
| GET | `/movies/search` | public | Tìm phim theo bộ lọc tùy chọn |
| POST | `/movies` | ADMIN | Tạo phim → 201 |
| PATCH | `/movies/{id}` | ADMIN | Sửa 1 phần phim |
| DELETE | `/movies/{id}` | ADMIN | Xóa phim → 204 |

**GET /movies/search** — query param (đều tùy chọn): `title` (LIKE), `status` (enum), `genre`, `minDuration` (số phút ≥), `ageRating` (enum). Vd: `/movies/search?status=NOW_SHOWING&minDuration=120`.

**MovieRequestDto (POST body) / MovieResponseDto:**
```json
{
  "id": 1,
  "title": "Avengers",
  "description": "...",
  "durationMinutes": 143,
  "releaseDate": "2026-09-01",
  "language": "English",
  "genre": "Hành động",
  "ageRating": "C13",
  "status": "NOW_SHOWING"
}
```
(POST không gửi `id`. PATCH chỉ gửi field muốn đổi.)

---

## 3. Cinemas (`/cinemas`)

| Method | Path | Quyền | Mô tả |
|---|---|---|---|
| GET | `/cinemas/{id}` | public | Chi tiết rạp |
| GET | `/cinemas?page=0&size=10` | public | Danh sách rạp |
| POST | `/cinemas` | ADMIN | Tạo rạp → 201 |
| PATCH | `/cinemas/{id}` | ADMIN | Sửa rạp |
| DELETE | `/cinemas/{id}` | ADMIN | Xóa rạp → 204 |

**CinemaRequestDto / CinemaResponseDto:**
```json
{ "id": 1, "name": "CGV Vincom", "address": "123 Lê Lợi" }
```

---

## 4. Rooms (`/rooms`)

| Method | Path | Quyền | Mô tả |
|---|---|---|---|
| GET | `/rooms/{id}` | public | Chi tiết phòng |
| GET | `/rooms?page=0&size=10` | ADMIN | Danh sách phòng |
| POST | `/rooms` | ADMIN | Tạo phòng → 201 |
| PATCH | `/rooms/{id}` | ADMIN | Sửa phòng |
| DELETE | `/rooms/{id}` | ADMIN | Xóa phòng → 204 |

**RoomRequestDto / RoomResponseDto:**
```json
{ "id": 1, "name": "Phòng 1", "roomType": "IMAX", "cinemaId": 1 }
```

---

## 5. Seats (`/seats`)

| Method | Path | Quyền | Mô tả |
|---|---|---|---|
| POST | `/seats/room/{roomId}/seats/generate?rows=10&columns=10` | ADMIN | Sinh sơ đồ ghế hàng loạt cho phòng → 201 |

→ Trả về `{ "roomId": 1, "created": 100 }`. Ghế sinh ra: hàng A,B,C... × số cột, loại mặc định `STANDARD`. Gọi lần 2 cho cùng phòng → 409 (đã có ghế).

---

## 6. Showtimes (`/showtimes`)

| Method | Path | Quyền | Mô tả |
|---|---|---|---|
| GET | `/showtimes/{id}` | public | Chi tiết 1 suất |
| GET | `/showtimes?page=0&size=10` | public | Danh sách suất (phân trang) |
| GET | `/showtimes/by-movie?movieId=1&date=2026-09-20` | public | Lịch chiếu của 1 phim trong 1 ngày |
| GET | `/showtimes/by-cinema?cinemaId=1&date=2026-09-20` | public | Lịch chiếu ở 1 rạp trong 1 ngày |
| GET | `/showtimes/search?movieId=&cinemaId=&date=` | public | Tìm suất theo bộ lọc tùy chọn |
| GET | `/showtimes/{showtimeId}/seats` | public | **Sơ đồ ghế của 1 suất** (trống/đã đặt) |
| POST | `/showtimes` | ADMIN | Tạo suất → 201 (chặn trùng giờ cùng phòng → 409) |
| PATCH | `/showtimes/{id}` | ADMIN | Sửa suất |
| DELETE | `/showtimes/{id}` | ADMIN | Xóa suất → 204 |

**ShowtimeRequestDto / ShowtimeResponseDto:**
```json
{ "id": 1, "startTime": "2026-09-20T19:30:00", "price": 90000, "movieId": 1, "roomId": 1 }
```
`date` trong query là định dạng `yyyy-MM-dd`.

**GET /showtimes/{showtimeId}/seats** → mảng ghế (dùng để vẽ sơ đồ):
```json
[
  { "seatId": 13, "rowLabel": "A", "seatNumber": 1, "seatType": "STANDARD", "booked": false },
  { "seatId": 14, "rowLabel": "A", "seatNumber": 2, "seatType": "VIP", "booked": true }
]
```
> `booked=true` = ghế đã có người đặt cho suất này (hiện màu khác, không cho chọn).

---

## 7. Bookings (`/bookings`)

| Method | Path | Quyền | Mô tả |
|---|---|---|---|
| POST | `/bookings` | USER | Đặt vé (chọn nhiều ghế) → 201 |
| PATCH | `/bookings/{id}/pay` | USER | Thanh toán → PAID (409 nếu không PENDING) |
| PATCH | `/bookings/{id}/cancel` | USER | Hủy → CANCELLED, giải phóng ghế |
| GET | `/bookings/{id}` | USER | Chi tiết 1 đơn |
| GET | `/bookings?userId=1` | USER | Danh sách đơn của 1 user |

**POST /bookings** — body:
```json
{ "userId": 1, "showtimeId": 1, "seatIds": [13, 14, 15] }
```
→ **BookingResponseDto:**
```json
{
  "bookingId": 5,
  "bookingTime": "2026-10-06T20:15:00",
  "bookingStatus": "PENDING",
  "totalPrice": 270000,
  "tickets": [
    { "id": 10, "price": 90000, "seatCode": "A1", "seat_id": 13 }
  ]
}
```
> Đặt ghế đã có người đặt → **409**. Giá tự tính theo loại ghế (VIP +30k, COUPLE +50k). Đặt xong ở trạng thái `PENDING`, gọi `/pay` mới thành `PAID`.

---

## 8. Reports (`/reports`) — ADMIN

| Method | Path | Mô tả |
|---|---|---|
| GET | `/reports/revenue-by-movie` | Doanh thu theo phim (JSON) |
| GET | `/reports/revenue-by-cinema` | Doanh thu theo rạp (JSON) |
| GET | `/reports/revenue-by-movie/excel` | Tải file `.xlsx` doanh thu theo phim |
| GET | `/reports/revenue-by-cinema/excel` | Tải file `.xlsx` doanh thu theo rạp |

**revenue-by-movie** →
```json
[ { "movieId": 1, "title": "Avengers", "totalRevenue": 270000, "ticketsSold": 3 } ]
```
**revenue-by-cinema** →
```json
[ { "cinemaId": 1, "cinemaName": "CGV Vincom", "totalRevenue": 450000, "ticketsSold": 5 } ]
```
> Endpoint `/excel` trả về **file tải xuống** (header `Content-Disposition: attachment`), không phải JSON.

---

## 9. Màn hình & luồng (cho người làm UI)

### A. Luồng USER (đặt vé)
1. **Đăng ký / Đăng nhập** → lưu JWT, sau đó mọi request gắn `Authorization: Bearer`.
2. **Trang chủ / Danh sách phim** — `GET /movies` (hoặc `/movies/search` khi lọc). Hiện poster/tên/thể loại/nhãn tuổi.
3. **Chi tiết phim** — `GET /movies/{id}` + danh sách suất `GET /showtimes/by-movie?movieId=&date=`. Chọn ngày + suất.
4. **Chọn ghế** — `GET /showtimes/{showtimeId}/seats` → vẽ sơ đồ; ghế `booked=true` khóa lại; màu khác theo `seatType`. User tick các ghế muốn.
5. **Đặt vé** — `POST /bookings` với `seatIds` đã chọn → nhận `bookingId`, trạng thái `PENDING`.
6. **Thanh toán (giả lập)** — `PATCH /bookings/{id}/pay` → `PAID`.
7. **Vé của tôi** — `GET /bookings?userId=` (danh sách) + `GET /bookings/{id}` (chi tiết). Có thể **Hủy** → `PATCH /bookings/{id}/cancel`.

### B. Luồng ADMIN (quản lý)
1. **Đăng nhập admin.**
2. **Quản lý phim** — bảng + nút Thêm/Sửa/Xóa (`/movies` POST/PATCH/DELETE).
3. **Quản lý rạp / phòng** — `/cinemas`, `/rooms` CRUD.
4. **Sinh ghế cho phòng** — `POST /seats/room/{roomId}/seats/generate?rows=&columns=`.
5. **Quản lý suất chiếu** — `/showtimes` CRUD (báo lỗi 409 khi trùng giờ cùng phòng).
6. **Thống kê doanh thu** — bảng từ `/reports/revenue-by-movie` + `/reports/revenue-by-cinema`, nút **Tải Excel** gọi 2 endpoint `/excel`.

### Phân quyền UI
- Chưa đăng nhập: chỉ xem phim/lịch/sơ đồ ghế; bấm "Đặt" → bắt đăng nhập.
- USER: thêm được luồng đặt/trả/hủy/xem vé.
- ADMIN: thêm toàn bộ trang quản lý + báo cáo. Ẩn menu admin với USER thường.

---

## 10. Lưu ý kỹ thuật cho FE
- **CORS:** BE sẽ bật CORS cho origin của FE (vd `http://localhost:5173`) ở C10.
- **Ngày giờ:** `LocalDate` = `yyyy-MM-dd`; `LocalDateTime` = `yyyy-MM-ddTHH:mm:ss`.
- **Tiền:** số (BigDecimal) — format hiển thị ở FE (vd `270.000đ`).
- **Lỗi:** đọc `status` để xử lý (401 → về trang login; 409 → báo "ghế đã được đặt"; 400 → hiện lỗi validation).
