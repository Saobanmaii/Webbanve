# DỰ ÁN: Website bán vé xem phim (Back-end)

> File này là "kim chỉ nam" của dự án — ghi lại mục tiêu, roadmap, kiến thức cần học và tiến độ.
> Cập nhật file này mỗi khi xong một chặng.

## 1. Mục tiêu & cách làm việc
- **Mục đích:** vừa thực hành vừa học lý thuyết Spring Boot / JPA (Java 17, Maven, MySQL, Hibernate, Lombok).
- **Cách học:** tự viết code → nhờ review (chỉ lỗi + giải thích bản chất). Đi từng bước nhỏ, không nhảy cóc.
- **Thứ tự:** làm BACK-END trước, front-end sau. Làm xong CRUD cơ bản mới tới API khó.

## 2. Đề bài
Đặt vé xem phim trực tuyến.
- Xem lịch chiếu theo rạp / phim / suất chiếu.
- Chọn ghế ngồi từ sơ đồ ghế.
- Đặt vé và thanh toán giả lập.
- Admin quản lý phim, lịch chiếu, rạp.
- Thống kê doanh thu theo phim.

**Tech:** Spring Boot + MySQL, RESTful API, có xác thực/phân quyền.
**DB:** CODE-FIRST — tự thiết kế entity, Hibernate tự sinh bảng (`ddl-auto=update`), chỉ tạo 1 database rỗng `movie_ticket`.

## 3. Kiến thức cần học (lồng vào từng chặng)
1. Thiết kế mô hình entity + quan hệ (1-N, N-N, `@Enumerated`).
2. Validation nâng cao: `@NotBlank/@Size/@Positive/@Future`, custom validator (`@Constraint`), class-level validation, validate ở tầng service (business rule).
3. `@Query` (JPQL) + Derived Query.
4. Transaction + chống double-booking (unique constraint, concurrency).
5. ⭐ Search API động bằng NATIVE SQL với `EntityManager` (`createNativeQuery`, `setParameter`, ghép SQL động, map sang DTO) — PHẦN MUỐN HỌC NHẤT, cần nhiều bài tập nhỏ. Kèm Specification + `JpaSpecificationExecutor`.
6. Report/thống kê bằng native SQL (SUM/GROUP BY/JOIN) → DTO.
7. Xuất Excel `.xlsx` bằng Apache POI.
8. i18n đa ngôn ngữ (`MessageSource`, `messages.properties`, `Accept-Language`).
9. Spring Security + JWT: đăng ký/đăng nhập, phân quyền USER vs ADMIN (`@PreAuthorize`), BCrypt, JWT filter.

## 4. Roadmap (đã review)
- [x] **C0** — Tạo project + DB rỗng + `ddl-auto=update` (code-first).
- [x] **C1** — Thiết kế entity + quan hệ: Movie, Cinema, Room, Seat, Showtime, Booking, Ticket, User, Role. → học (1). Đã viết đủ 9 entity + 6 enum, quan hệ @ManyToOne/@ManyToMany nối đúng, compile SUCCESS.
- [~] **C2** — CRUD nền (Movie/Cinema/Room): DTO/mapper/exception/pagination + Validation nâng cao. → học (2)
  - [x] Movie CRUD: Request/Response/Update DTO + Mapper + Repository + Service + Controller (POST→201, DELETE→204, PATCH partial update) + GlobalExceptionHandler toàn cục (404 + validation fieldErrors + 500 catch-all) + phân trang. Test thật GET 404 / POST 201 / validation 400 OK.
  - [x] Cinema CRUD (luyện lại pattern, không quan hệ).
  - [x] Room CRUD — học **khóa ngoại chuẩn**: Request/Response DTO chỉ trao đổi `cinemaId` (Long), service tự `findById` cinema (ra 404 nếu không có) rồi `setCinema`; mapper KHÔNG chạm DB. Compile SUCCESS.
  - [ ] Validation nâng cao: custom @Constraint, class-level, business rule ở service (sẽ lồng vào C3 khi có ngữ cảnh — suất chiếu có nhiều rule tự nhiên).
- [x] **C3** — Suất chiếu + lịch chiếu (xem theo phim/rạp/ngày). → học (3)
  - [x] CRUD suất chiếu (2 FK movieId + roomId), startTime `@Future`, giá `@PositiveOrZero`.
  - [x] Chống trùng giờ cùng phòng (create + update): windowed derived query `findByRoomIdAndStartTimeBetween` + công thức overlap `aStart<bEnd && bStart<aEnd` (isBefore, ranh giới chạm không tính); update phải loại chính nó (`ex.getId().equals(id)`); nguồn sự thật khi update là entity đã cập nhật, KHÔNG phải dto (dto partial, field null).
  - [x] Xem lịch chiếu theo phim/rạp/ngày: `GET /showtimes/by-movie` + `/by-cinema` (Derived Query date-range nửa-mở `[00:00 ngày, 00:00 ngày kế)`, nested property `Room_CinemaId`, sort theo giờ). → ĐỦ cho roadmap.
  - [ ] (TÙY CHỌN, để sau) Lịch chiếu hiển thị TÊN phim/rạp thay vì id: JOIN + projection (interface/DTO) + `@Query`. Đây là polish, không chặn tiến độ. Đã học nền: native `@Query`, JOIN, interface projection.
- [x] **C4** — Sơ đồ ghế + trạng thái ghế trống/đã đặt của 1 suất.
  - [x] Sinh ghế hàng loạt cho phòng: `POST /seats/room/{roomId}/seats/generate?rows&columns` → tạo A1.. (dùng `(char)('A'+i)`), loại STANDARD; chống gen 2 lần (`existsByRoomId`→409); `saveAll` + `@Transactional`. Trả `SeatGenerationResuldDto(roomId, created)`.
  - [x] Xem sơ đồ ghế 1 suất: `GET /showtimes/{showtimeId}/seats` → showtime→room→`findByRoomId` + tickets qua `findByShowtimeId` → `SeatStatusDto(seatId,rowLabel,seatNumber,seatType,booked)`; `booked` suy từ Ticket (giờ chưa có vé nên toàn `false`). Test 12 ghế OK.
- [x] **C5** — Đặt vé + thanh toán giả lập trong 1 transaction, chống đặt trùng ghế. → học (4)
  - [x] **C5.1 Tạo booking**: `POST /bookings` (userId, showtimeId, seatIds) → Booking(PENDING) + Ticket từng ghế; giá = `showtime.price` + phụ thu theo `SeatType` (VIP +30k, COUPLE +50k) snapshot vào `Ticket.price` + `Booking.totalPrice`; validate user/showtime/seat (404), ghế đúng phòng. **Chống đặt trùng 2 lớp**: (1) service `findByShowtimeIdAndSeatIdIn` → 409; (2) DB `UNIQUE(showtime_id, seat_id)` trên `ticket` (chốt race condition). Toàn bộ trong `@Transactional` (all-or-nothing). Test 201/409/rollback OK.
  - [x] C5.2 Thanh toán: `PATCH /bookings/{id}/pay` → PENDING→PAID; chặn nếu `!= PENDING` (409). Test 200/409/404 OK.
  - [x] C5.3 Hủy vé: `PATCH /bookings/{id}/cancel` → set CANCELLED + xóa Ticket (giải phóng ghế) trong `@Transactional`; chặn nếu đã CANCELLED (`== CANCELLED` → 409). Ghế thả ra đặt lại được. Test khép kín OK.
  - [x] C5.4 Xem booking: chi tiết 1 đơn (`GET /bookings/{id}`) + danh sách đơn của user (`GET /bookings?userId=`, derived `findAllByUser_Id`). Test 200/404 OK.
- [x] **C6** — Search động bằng native SQL + `EntityManager`. → học (5)
  - [x] Search phim (1 bảng): `GET /movies/search` với 5 filter tùy chọn (title/status/genre/minDuration/ageRating). Công thức `WHERE 1=1` + `if` nối AND động + `setParameter` (value qua param, chống SQL injection); enum-STRING phải `.name()` vì native bỏ qua mapping.
  - [x] Search suất chiếu (nhiều bảng): `GET /showtimes/search` (movieId/cinemaId/date) — JOIN showtime→room→cinema, alias, `SELECT st.*` (chỉ cột bảng chính khi map về entity), `DATE(start_time)=:date`. Bẫy đã gặp: nối chuỗi quên space (`JOINmovie`), thiếu `st.*`.
- [x] **C7** — Thống kê doanh thu theo phim bằng native SQL. → học (6)
  - [x] `GET /reports/revenue`: `SUM(t.price)` + `COUNT` + `GROUP BY m.id,m.title`, JOIN ticket→booking→showtime→movie, lọc `booking_status='PAID'` (chỉ đã trả tiền mới là doanh thu). Học map kết quả KHÔNG-phải-entity: `createNativeQuery(sql)` (không class) → `List<Object[]>` → dựng DTO tay; ép kiểu vs `.longValue()` (dùng `(Number).longValue()` cho id/count tránh Long/BigInteger, giữ `BigDecimal` cho tiền).
- [ ] **C8** — Xuất Excel doanh thu (Apache POI). → học (7)
- [ ] **C9** — i18n đa ngôn ngữ. → học (8)
- [ ] **C10** — Spring Security + JWT + phân quyền USER/ADMIN. → học (9)

## 4b. Thiết kế entity (chốt C1)

Quan hệ (FK luôn ở phía N):
- Cinema 1—N Room (FK cinema_id ở Room)
- Room 1—N Seat (FK room_id ở Seat)
- Room 1—N Showtime (FK room_id ở Showtime)
- Movie 1—N Showtime (FK movie_id ở Showtime)
- User 1—N Booking (FK user_id ở Booking)
- Booking 1—N Ticket (FK booking_id ở Ticket)
- Seat 1—N Ticket (FK seat_id ở Ticket)
- Showtime 1—N Ticket (FK showtime_id ở Ticket)
- User N—N Role → bảng trung gian user_roles(user_id, role_id)

→ `Ticket` giữ 3 FK (booking_id, seat_id, showtime_id) = trung tâm nối mọi thứ.

Field từng entity (bỏ id + FK):
- **Movie:** title, description, durationMinutes(Integer), releaseDate(LocalDate), language, ageRating(enum P/C13/C16/C18), status(enum COMING_SOON/NOW_SHOWING/ENDED), genre(String tạm)
- **Cinema:** name, address
- **Room:** name, roomType(enum TWO_D/THREE_D/IMAX)
- **Seat:** rowLabel, seatNumber(Integer), seatType(enum STANDARD/VIP/COUPLE) — unique (room_id, rowLabel, seatNumber)
- **Showtime:** startTime(LocalDateTime), price(BigDecimal)
- **Booking:** bookingTime(LocalDateTime), status(enum PENDING/PAID/CANCELLED), totalPrice(BigDecimal snapshot)
- **Ticket:** price(BigDecimal snapshot), seatCode(String tùy chọn)
- **User:** username(unique), password(hashed), email, fullName, enabled(Boolean)
- **Role:** name(enum ROLE_USER/ROLE_ADMIN)

Nguyên tắc field:
1. Tiền = `BigDecimal`, KHÔNG double/float.
2. `LocalDate` cho ngày, `LocalDateTime` cho ngày+giờ. Không lưu dạng String.
3. Snapshot giá (totalPrice, Ticket.price) = chốt giá lúc mua, không tính lại.
4. Dữ liệu dẫn xuất thì đừng lưu (sức chứa phòng, endTime, doanh thu).
5. 6 enum dùng `@Enumerated(EnumType.STRING)`, không để mặc định ORDINAL.

## 5. Quyết định thiết kế quan trọng (ghi để không vấp)
- **Trạng thái ghế "đã đặt" KHÔNG nằm ở `Seat`.** `Seat` là ghế vật lý, dùng lại cho mọi suất chiếu. Trạng thái đặt thuộc về quan hệ *(suất chiếu × ghế)* → nằm ở `Ticket`.
- **Chống double-booking:** unique constraint trên `(showtime_id, seat_id)` ở bảng `Ticket` → 2 người không thể đặt cùng 1 ghế trong cùng 1 suất.
- **`Booking` tham chiếu `User` ngay từ C1**, dù C10 mới làm Security (tránh phải sửa schema về sau).
- **`ddl-auto=update`** chỉ thêm bảng/cột mới, không sửa/xóa cột cũ. Đổi kiểu dữ liệu cột cũ → drop DB tạo lại.

## 5b. Nghiệp vụ CỐT LÕI phải có (mục tiêu: ra sản phẩm rạp phim chạy thật)
Mỗi chặng phải gắn 1 miếng nghiệp vụ thật, không chỉ CRUD cho có. Cuối cùng demo được trọn luồng:
admin tạo phim → tạo suất → user xem lịch → chọn ghế → đặt vé → thanh toán giả lập → admin xem doanh thu.
- **C3 Suất chiếu:** chống trùng giờ cùng phòng (dùng `movie.durationMinutes` tính giờ kết thúc, không cho đè); startTime tương lai; xem lịch theo phim/rạp/ngày.
- **C4 Ghế:** sinh sơ đồ ghế hàng loạt cho phòng (hàng A–J × số ghế); xem ghế trống/đã đặt của 1 suất (dựa vào Ticket).
- **C5 Đặt vé (⭐ trái tim):** chọn ghế → (tùy chọn: giữ chỗ) → thanh toán giả lập; chống 2 người đặt trùng ghế; hủy vé giải phóng ghế; **giá theo loại ghế** (VIP/COUPLE cộng phụ phí, snapshot vào `Ticket.price`); trạng thái Booking PENDING→PAID→CANCELLED.
- **C6 Search động / C7 Doanh thu / C8 Excel / C9 i18n / C10 Security** như roadmap.
- Phân loại: **Core (bắt buộc)** = tất cả trên trừ "giữ ghế TTL". **Polish (nếu còn hứng)** = giữ ghế có hạn, Genre riêng, bỏng nước (xem mục 6).

## 6. Mở rộng tương lai (tùy chọn — KHÔNG làm bây giờ)
Ghi lại để không quên, làm sau khi xong lõi (sau C10) nếu còn hứng. Đều là kiểu "thêm entity mới" nên ghép vào sau rất dễ:
- **Genre riêng + N-N với Movie:** thay `Movie.genre` (String) bằng entity `Genre`, quan hệ N-N (bảng movie_genre). Lọc/tìm phim theo thể loại đẹp hơn. Dự tính nâng cấp quanh C6.
- **Dịch vụ bỏng nước (concession):** thêm `Product` (combo bỏng/nước) + `BookingItem`. Lúc đó `Booking` thành "đơn hàng" chứa cả vé lẫn đồ ăn, tổng tiền = tiền vé + tiền đồ ăn.

## 7. Tiến độ hiện tại
- Đã xong: **C0 + C1 + C2 + C3 + C4 + C5 + C6 + C7** (CRUD Movie/Cinema/Room; Showtime + chống trùng giờ + xem lịch; Ghế: sinh + sơ đồ; Đặt vé: tạo/thanh toán/hủy/xem, chống trùng 2 lớp, transaction all-or-nothing; Search động native SQL 1 bảng + nhiều bảng JOIN; Report doanh thu SUM/GROUP BY). Compile SUCCESS.
- Còn nợ (chủ động để sau, "sai rồi sửa mới nhớ"):
  - `unique=true` cho `User.username`/`email`/`Role.name`; đổi `List`→`Set` ở 2 chỗ @ManyToMany.
  - Trong `GlobalExceptionHandler.handleAll` (500): chưa `log.error(ex)` (sẽ mù khi có bug) + đang `setMessage(ex.getMessage())` (lộ nội bộ). Sửa khi gặp.
  - Chưa có handler `HttpMessageNotReadableException` → JSON hỏng/enum sai hiện ra **500** thay vì 400.
  - Endpoint xem sơ đồ ghế đang **lặp tiền tố**: `@GetMapping("/showtimes/{id}/seats")` trong class `@RequestMapping("/showtimes")` → URL thật `/showtimes/showtimes/{id}/seats`. Sửa method mapping thành `/{showtimeId}/seats`.
- Việc tiếp theo: **C8 — Xuất Excel doanh thu (.xlsx) bằng Apache POI**. Kế hoạch 4 ngày nộp: C6✓ C7✓ → C8 (Excel) → C9 (i18n) + dọn dẹp. C10 Security để sau khi nộp.
- Đã học thêm ngoài roadmap (nền cho C6, chưa bắt buộc dùng): native `@Query`, JOIN, interface projection, console DB. Polish "lịch chiếu hiện tên" để dành.
