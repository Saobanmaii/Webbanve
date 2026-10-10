# ROADMAP — FE web đặt vé xem phim

> Cập nhật sau mỗi bước. ✅ xong · 🔄 đang làm · ⬜ chưa làm
> Chạy: `npm run dev` → http://localhost:5173 (BE phải chạy ở :8080)

---

## PHẦN 1 — Roadmap code

| # | Bước | Trạng thái | Kiểm tra bằng cách |
|---|---|---|---|
| 0 | Chuyển project sang React, cài axios + router, dựng khung thư mục | ✅ | Mở 5173 thấy Navbar + "React đã chạy" |
| 1 | `axiosClient` + `AuthContext` + Login/Register + `ProtectedRoute` (đã theo style MovieGo) | ✅ | Login `admin/admin123` → Navbar hiện tên + menu "Quản trị" |
| 1b | Nối Design System MovieGo vào `src/ds/` (màu, font, component) | ✅ | Nền đen, nút đỏ, font Archivo/DM Sans |
| 2 | HomePage: hero + danh sách phim + tab Đang/Sắp chiếu + lọc thể loại + tìm tên | ✅ | Thấy phim từ BE, bấm poster sang /movies/:id |
| 3 | Chi tiết phim → chọn ngày → chọn suất (nhóm theo rạp) | ✅ | Thấy suất chiếu theo ngày |
| 4 | Sơ đồ ghế → đặt vé (PENDING) → thanh toán (PAID) → trang hoàn tất | ✅ | Đặt xong, ghế đó bị khóa |
| 5 | Vé của tôi (tab Tất cả/Sắp chiếu/Đã qua/Đã hủy) + thanh toán tiếp + hủy vé | ✅ | Thấy vé, hủy được |
| 6 | Admin: sidebar + tổng quan + CRUD phim + CRUD rạp/phòng + sinh ghế | ✅ | Thêm/sửa/xóa chạy |
| 7 | Admin: CRUD suất chiếu (lọc ngày/rạp/phim, % lấp đầy) + báo cáo doanh thu + tải Excel | ✅ | Tải được file .xlsx |
| 8 | Polish: cuộn lên đầu khi đổi trang, màn hình nhỏ, trang 404/403, chặn /login khi đã đăng nhập, README | 🔄 code xong, chờ chạy thử | Thu nhỏ cửa sổ trình duyệt vẫn dùng được |

### Việc phối hợp với BE
- ✅ BE đã thêm `userId` vào login/register, `posterUrl` cho Movie, thông tin suất (movieTitle, startTime, cinemaName, roomName) vào Booking.
- ✅ BE đổi câu lỗi sang tiếng Việt có dấu (FE gửi `Accept-Language: vi`).
- ✅ BE vá lỗ hổng booking: user chỉ xem/trả/hủy được đơn của mình (403 nếu không), `userId` lấy từ token.
- ⚠️ Vé cũ đã hủy: các field suất = `null`, `tickets` = `null`/`[]` → FE hiện "Không rõ".

---

## PHẦN 2 — Roadmap hiểu (luồng chạy)

### Bước 0 — React chạy thế nào
```
index.html (<div id="root">)
  └─ src/main.jsx     gắn React vào #root, bọc BrowserRouter + AuthProvider
      └─ src/App.jsx  Navbar (luôn hiện) + <Routes>: URL nào → trang nào
```
- **Component** = hàm JS trả về giao diện (JSX).
- **`<Routes>`** ≈ `@RequestMapping` bên Spring: map URL → trang.
- **`<Link to="...">`** đổi trang không reload cả web.

### Bước 1 — Đăng nhập & token đi đâu
```
LoginPage ──login()──> AuthContext ──> authApi.login ──> axiosClient ──POST /auth/login──> BE
                            │
                            └─ lưu token + user vào localStorage, setUser(...)
                                  → Navbar tự vẽ lại (hiện tên, menu admin)

Mọi request sau:  axiosClient (request interceptor) tự gắn  Authorization: Bearer <token>
Gặp 401:          axiosClient (response interceptor) xóa token → về /login
```
| File | Vai trò | So với Spring |
|---|---|---|
| `api/axiosClient.js` | Máy gọi API chung, gắn token, xử lý 401 | giống RestTemplate + Filter |
| `api/authApi.js` | Hàm gọi `/auth/login`, `/auth/register` | giống 1 Service gọi REST |
| `auth/AuthContext.jsx` | Lưu user đang đăng nhập, dùng `useAuth()` ở đâu cũng được | giống SecurityContextHolder |
| `auth/ProtectedRoute.jsx` | Chặn trang khi chưa login / không phải admin | giống `@PreAuthorize` |
| `pages/LoginPage.jsx`, `RegisterPage.jsx` | Form, gọi `login()`/`register()`, hiện lỗi | View |

- **`useState`**: dữ liệu của component; gọi `setXxx` → giao diện tự cập nhật.
- **F5 vẫn đăng nhập** vì `AuthContext` đọc lại user từ `localStorage` khi khởi động.
- **Lỗi BE** có dạng `{ message, fieldErrors }` → `getErrorMessage()` đổi thành chữ để hiện.

### Design System MovieGo — giao diện lấy từ đâu
```
design/MovieGo Design System/     ← bản gốc export từ Claude Design (chỉ để tham khảo, không import)
  ui_kits/web/*.jsx               ← mẫu từng màn hình user (Home, MovieDetail, SeatSelect, Payment...)
  ui_kits/admin/*.jsx             ← mẫu màn hình admin
src/ds/                           ← bản copy dùng thật trong app
  styles.css + tokens/*.css       ← biến màu/font/khoảng cách: var(--accent), var(--surface-1)...
  components/**                   ← Button, Input, NavBar, MoviePoster, SeatMap, DataTable...
  index.js                        ← import { Button, Input } from '../ds'
```
- **Component DS chỉ lo giao diện** (nhận props, gọi `onClick`/`onChange`). **Page lo dữ liệu** (gọi API, giữ state) rồi truyền vào component.
  Ví dụ `Navbar.jsx`: quyết định hiện link nào theo `useAuth()`, còn `NavBar` của DS chỉ vẽ.
- **Font tiếng Việt**: font gốc của design chỉ có bộ Latin → chữ Ộ, Ữ, Ả bị lỗi font. Đã thay bằng font cài qua npm `@fontsource` (có bộ `vietnamese`): Archivo (tiêu đề), **Be Vietnam Pro** (chữ thường, thay DM Sans vốn không hỗ trợ tiếng Việt), JetBrains Mono (số, mã). Khai báo trong `src/ds/tokens/fonts.css` + `typography.css`.
- Icon: tên kebab-case của [Lucide](https://lucide.dev/icons) — `<Icon name="ticket" />`, `<Button iconLeft="log-out">`.

### Bước 2 — Trang chủ: gọi API khi mở trang
```
HomePage mở
  └─ useEffect(() => movieApi.getAll(), [])   ← [] = chạy đúng 1 lần khi trang mở
        └─ GET /movies?page=0&size=100  →  { content: [phim...] }
              └─ setMovies(content)   → React vẽ lại: hero + lưới MoviePoster
Người dùng bấm tab / chip thể loại / gõ tìm kiếm
  └─ đổi state tab / genre / keyword → lọc lại `movies` ngay trên FE (không gọi lại BE)
Bấm poster → navigate('/movies/' + id) → MovieDetailPage đọc id bằng useParams()
```
| File | Vai trò |
|---|---|
| `api/movieApi.js` | Gom mọi lời gọi `/movies` (getAll, getById, search, create, update, remove) |
| `utils/format.js` | Đổi dữ liệu BE → chữ hiển thị: `270.000đ`, `01/09/2026`, `2h 23m`, enum → tiếng Việt |
| `components/Backdrop.jsx` | Ảnh nền hero; không có `posterUrl` thì tự sinh màu theo tên phim |
| `pages/HomePage.jsx` | Gọi API, giữ state, lọc, truyền dữ liệu vào `MoviePoster`, `Tabs`, `Chip` của DS |

- 3 trạng thái màn hình hay gặp: **loading** (đang tải) → **error** (lỗi) → **data** (vẽ). Trang nào gọi API cũng theo khuôn này.
- `useMemo` = nhớ kết quả tính toán, chỉ tính lại khi dữ liệu đầu vào đổi.

### Bước 3 — Chi tiết phim: ghép dữ liệu từ nhiều API
```
URL /movies/1  → useParams() lấy id = "1"
useEffect([id]):
  ├─ Promise.all (gọi song song):
  │    GET /movies/1                      → movie
  │    GET /showtimes/search?movieId=1    → [suất...]  → bỏ suất đã qua, sắp xếp theo giờ
  ├─ suất chỉ có roomId → GET /rooms/{roomId}     → biết cinemaId, tên phòng, loại phòng
  └─                     GET /cinemas/{cinemaId} → tên rạp, địa chỉ
Tính toán từ state (useMemo):
  days   = các ngày có suất           → DateStrip
  groups = suất của ngày đang chọn, nhóm theo rạp → mỗi rạp 1 hàng ShowtimeChip
Bấm suất → setPick(s) → thanh dưới hiện → "Chọn ghế" → /showtimes/{id}/seats (bước 4)
```
- **`Promise.all([...])`**: chạy nhiều request cùng lúc, chờ tất cả xong. Nhanh hơn gọi lần lượt.
- **Vì sao gọi /rooms, /cinemas?** BE trả suất chỉ có `roomId`, muốn hiện tên rạp phải tra thêm. Mỗi phòng/rạp chỉ gọi 1 lần (`new Set` lọc trùng).
- `useEffect(..., [id])`: chạy lại khi `id` trên URL đổi (ví dụ chuyển từ phim 1 sang phim 3).

### Bước 4 — Luồng đặt vé (phần quan trọng nhất)
```
/showtimes/1/seats   SeatSelectPage   (xem được khi chưa login)
  ├─ GET /showtimes/1 → movieId, roomId → GET /movies, /rooms, /cinemas  (thông tin tóm tắt)
  ├─ GET /showtimes/1/seats → [{ seatId, rowLabel, seatNumber, seatType, booked }]
  │     └─ SeatMap gom theo hàng A,B,C...; booked=true → khóa; VIP viền vàng, đôi viền xanh
  ├─ bấm ghế → state `selected` (tối đa 8) → BookingSummary tính tiền tạm
  └─ "Tiếp tục thanh toán"
        ├─ chưa login → /login (state.from = trang này → login xong quay lại)
        └─ POST /bookings { userId, showtimeId, seatIds } → { bookingId, PENDING }
              ├─ 409 ghế vừa bị người khác đặt → báo lỗi, bỏ chọn, tải lại sơ đồ
              └─ OK → /bookings/{bookingId}/pay

/bookings/5/pay      PaymentPage   (cần login)
  ├─ GET /bookings/5 → tóm tắt (movieTitle, cinemaName, roomName, startTime, tickets, totalPrice)
  ├─ "Thanh toán" → PATCH /bookings/5/pay → PAID → /bookings/5/done
  └─ nút ← → Dialog "Nhả ghế?" → PATCH /bookings/5/cancel → về trang chọn ghế

/bookings/5/done     ConfirmationPage → GET /bookings/5 → vé dạng cuống vé + mã MG-00005
```
| File | Vai trò |
|---|---|
| `api/bookingApi.js` | create / pay / cancel / getById / getByUser |
| `components/SeatMap.jsx` | Vẽ lưới ghế từ dữ liệu BE, dùng `<Seat>` của design |
| `components/FlowHeader.jsx` | Header luồng đặt vé: nút quay lại + Stepper 4 bước (thay Navbar) |
| `pages/SeatSelectPage.jsx`, `PaymentPage.jsx`, `ConfirmationPage.jsx` | 3 màn của luồng |

- **Giá tạm tính** ở FE = giá suất + phụ thu loại ghế (VIP +30k, đôi +50k). **Tổng tiền thật** luôn lấy `totalPrice` từ BE.
- **`userId`** lấy từ `useAuth().user` (BE trả khi login, lưu trong localStorage).
- `App.jsx` ẩn Navbar ở các trang luồng đặt vé (`isFlowPage`) giống design.

### Bước 5 — Vé của tôi
```
/my-bookings (cần login)
  GET /bookings?userId={user.userId} → [đơn...] → sắp xếp mới nhất trước
  Tab lọc trên FE:  Sắp chiếu = chưa hủy & giờ chiếu > bây giờ · Đã qua · Đã hủy
  Mỗi đơn — nút tùy trạng thái:
    PENDING  → "Thanh toán" (/bookings/{id}/pay) · "Hủy"
    PAID     → "Xem vé" (/bookings/{id}/done) · "Hủy vé" (nếu chưa chiếu)
    CANCELLED→ "Đặt lại"
  Hủy → Dialog xác nhận → PATCH /bookings/{id}/cancel → gọi lại GET để cập nhật danh sách
```
- **Hiển thị theo trạng thái**: cùng 1 component, đổi nút/màu badge theo `bookingStatus` — kiểu `if/else` trong JSX bằng `{điều_kiện && <Nút/>}`.
- Đơn cũ đã hủy thiếu thông tin suất (BE trả `null`) → hiện "Không rõ".

### Bước 6 — Khu admin: route lồng nhau + CRUD
```
/admin  → ProtectedRoute adminOnly → AdminLayout (sidebar + <Outlet/>)
            ├─ index        AdminDashboardPage   (đếm phim/rạp/phòng/suất)
            ├─ movies       AdminMoviesPage
            ├─ cinemas      AdminCinemasPage     (rạp + phòng + sinh ghế)
            ├─ showtimes    (bước 7)
            └─ reports      (bước 7)
```
**Khuôn CRUD dùng cho mọi trang quản lý:**
```
load()  = GET danh sách → setRows
Thêm    → openForm(null)  → Dialog form trống  → POST   → load() + Toast
Sửa     → openForm(row)   → Dialog form điền sẵn → PATCH → load() + Toast
Xóa     → Dialog xác nhận → DELETE → load() + Toast
Lỗi 400/409 → hiện ngay trong form (getErrorMessage)
```
- **Route lồng nhau**: `<Route path="/admin" element={<AdminLayout/>}>` chứa các `<Route>` con; layout vẽ sidebar 1 lần, trang con đổi ở `<Outlet/>`.
- **`NavLink`** = `Link` nhưng biết mình đang active → tô sáng mục sidebar.
- **Rạp & phòng**: bảng rạp bên trái, bấm 1 rạp → bên phải lọc phòng có `cinemaId` = rạp đó. Nút "Sinh ghế" gọi `POST /seats/room/{id}/seats/generate?rows=&columns=` (409 nếu phòng đã có ghế).
- `useFlash()` (trong `components/admin/AdminUI.jsx`) = hook tự viết để hiện Toast 3 giây.

### Bước 7 — Suất chiếu & doanh thu
**Suất chiếu** (`AdminShowtimesPage`) — cùng khuôn CRUD bước 6, thêm:
```
Tải: GET /showtimes + /movies + /rooms + /cinemas  (suất chỉ có id → tra tên)
     + GET /showtimes/{id}/seats cho từng suất → đếm booked / tổng → thanh % lấp đầy
Form: chọn Rạp → danh sách Phòng tự lọc theo rạp (select phụ thuộc)
      <input type="datetime-local"> trả "2026-12-25T19:30" → thêm ":00" cho đúng định dạng BE
Lỗi: 409 trùng giờ cùng phòng · 400 giờ chiếu phải ở tương lai
```
**Doanh thu** (`AdminReportsPage`):
```
GET /reports/revenue-by-movie + /revenue-by-cinema → StatCard tổng + BarList + bảng
"Tải Excel" → axios GET .../excel  { responseType: 'blob' }
           → URL.createObjectURL(blob) → tạo <a download> tạm → click() → trình duyệt lưu file
```
- **Vì sao không dùng `<a href=".../excel">`?** Link thường không gửi header `Authorization` → BE trả 401. Phải tải qua axios (có interceptor gắn token) rồi tự lưu file.

### Bước 8 — Hoàn thiện
- **Cuộn lên đầu khi đổi trang**: `useEffect(() => window.scrollTo(0, 0), [pathname])` trong `App.jsx`.
- **`GuestRoute`** (trong `auth/ProtectedRoute.jsx`): ngược với ProtectedRoute — đã đăng nhập mà vào /login, /register thì chuyển đi.
- **`EmptyState`**: 1 component dùng cho cả 404 và 403.
- **Màn hình nhỏ**: `@media (max-width: ...)` cuối `index.css` — lưới 2 cột thành 1 cột, khung tóm tắt vé xuống dưới sơ đồ ghế, sidebar admin thành thanh ngang. Component design viết style inline nên đôi chỗ phải dùng `!important` để ghi đè.

### Bước 8b — Dữ liệu demo thật từ BE (TMDB)
BE thêm field Movie: `backdropUrl` (ảnh ngang), `trailerUrl` (YouTube), `director`, `cast`, `rating` (0–10); `genre` có thể nhiều giá trị `"A, B"`.
- **Trang chủ**: hero tự chuyển 5 phim điểm cao (`setInterval` trong `useEffect`, `return () => clearInterval(...)` để dọn khi rời trang) · nút **Xem trailer** (`TrailerDialog` nhúng iframe YouTube, link `watch?v=` → `embed/`) · điểm sao trên poster · sắp xếp Điểm cao / Mới nhất / A–Z.
- **Thể loại nhiều giá trị**: `genresOf(movie)` tách chuỗi theo dấu phẩy → chip lọc dùng `includes`.
- **Chi tiết phim**: nền dùng `backdropUrl`, hiện điểm, các thể loại, đạo diễn, diễn viên, trailer.
- **Admin phim**: form thêm 5 field mới. Dialog dài → cho cuộn (`[role=dialog] { max-height; overflow-y: auto }`).
- **Admin suất chiếu — dữ liệu lớn (~1200 suất)**: KHÔNG tải hết nữa. Mỗi lần chỉ tải **1 ngày × 1 rạp** qua `GET /showtimes/search?date=&cinemaId=`, rồi mới gọi sơ đồ ghế cho vài chục suất đó.
  Đổi lọc liên tục → dùng `useRef` đánh số request, chỉ nhận kết quả của lần mới nhất (tránh kết quả cũ về sau đè kết quả mới).
- **Tổng quan admin**: số suất lấy từ `totalElements` (`size=1`) + suất hôm nay, thêm doanh thu top 5.

---

## Bản đồ toàn bộ route
| URL | Trang | Quyền |
|---|---|---|
| `/` | HomePage | public |
| `/login`, `/register` | LoginPage, RegisterPage | chưa đăng nhập |
| `/movies/:id` | MovieDetailPage | public |
| `/showtimes/:id/seats` | SeatSelectPage | public (đặt thì cần login) |
| `/bookings/:id/pay` | PaymentPage | USER |
| `/bookings/:id/done` | ConfirmationPage | USER |
| `/my-bookings` | MyBookingsPage | USER |
| `/admin` (+ `movies`, `cinemas`, `showtimes`, `reports`) | AdminLayout + trang con | ADMIN |
| `*` | NotFoundPage | — |
