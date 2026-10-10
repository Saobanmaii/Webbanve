# Hướng dẫn deploy

Thứ tự: **Database → Back-end → Front-end → nối CORS**. Đăng nhập tất cả bằng tài khoản GitHub `Saobanmaii` cho nhanh.

```
Aiven MySQL  <──  Render (webbanve/, Docker)  <──  Vercel (webbanve-fe/)
```

---

## 1. Database — Aiven for MySQL (free)
1. Vào https://console.aiven.io → **Sign up** bằng GitHub.
2. **Create service** → chọn **MySQL** → plan **Free** → chọn region gần nhất (vd Singapore nếu có) → **Create**.
3. Chờ trạng thái **Running** (~3–5 phút). Ở tab **Overview** ghi lại:
   - **Host**, **Port**
   - **User** (`avnadmin`), **Password**
   - **Database name** (`defaultdb`)
4. Ghép thành `DB_URL` (thay HOST, PORT):
   ```
   jdbc:mysql://HOST:PORT/defaultdb?sslMode=REQUIRED&serverTimezone=Asia/Ho_Chi_Minh
   ```

## 2. Back-end — Render (Docker, free)
1. Vào https://render.com → **Sign in with GitHub** → cho phép truy cập repo `Webbanve`.
2. **New +** → **Web Service** → chọn repo **Webbanve**.
3. Cấu hình:
   | Mục | Giá trị |
   |---|---|
   | Name | `webbanve-api` (URL sẽ là `https://webbanve-api.onrender.com`) |
   | Region | Singapore |
   | Branch | `main` |
   | **Root Directory** | `webbanve` |
   | Runtime | **Docker** (tự nhận `Dockerfile`) |
   | Instance Type | **Free** |
4. **Environment Variables** (Add Environment Variable):
   | Key | Value |
   |---|---|
   | `DB_URL` | chuỗi ở bước 1.4 |
   | `DB_USERNAME` | `avnadmin` |
   | `DB_PASSWORD` | mật khẩu Aiven |
   | `JWT_SECRET` | chuỗi ngẫu nhiên dài (lệnh tạo ở dưới) |
   | `CORS_ALLOWED_ORIGINS` | tạm để `http://localhost:5173` (bước 4 sửa lại) |
   | `TMDB_API_KEY` | key TMDB (trong `webbanve/secrets.properties` ở máy) |
   | `SEED_DEMO` | `true` |
   | `SHOW_SQL` | `false` |

   Tạo `JWT_SECRET` bằng PowerShell:
   ```powershell
   [Convert]::ToBase64String((1..64 | ForEach-Object { Get-Random -Maximum 256 }))
   ```
5. **Advanced → Health Check Path**: `/movies?page=0&size=1`
6. **Create Web Service** → xem tab **Logs**: build Docker (~5–8 phút lần đầu) → `Started WebbanveApplication` → seed dữ liệu.
7. Kiểm tra: mở `https://webbanve-api.onrender.com/movies?page=0&size=1` → thấy JSON là được.

> Gói free **ngủ sau 15 phút** không có request; lần đầu vào lại chờ ~50 giây (FE đã đặt timeout 90 giây và báo "máy chủ đang khởi động").

## 3. Front-end — Vercel (free)
1. Vào https://vercel.com → **Continue with GitHub**.
2. **Add New… → Project** → **Import** repo **Webbanve**.
3. Cấu hình:
   | Mục | Giá trị |
   |---|---|
   | **Root Directory** | `webbanve-fe` (bấm Edit để chọn) |
   | Framework Preset | **Vite** (tự nhận) |
   | Build / Output | để mặc định (`npm run build` / `dist`) |
4. **Environment Variables**: `VITE_API_URL` = `https://webbanve-api.onrender.com` (không có `/` cuối).
5. **Deploy** → nhận URL dạng `https://webbanve-xxx.vercel.app`.

## 4. Nối CORS (bắt buộc)
BE chỉ cho phép các domain nằm trong `CORS_ALLOWED_ORIGINS` gọi API.
1. Render → service `webbanve-api` → **Environment** → sửa `CORS_ALLOWED_ORIGINS`:
   ```
   https://webbanve-xxx.vercel.app,http://localhost:5173
   ```
2. **Save Changes** → Render tự deploy lại (~2 phút).
3. Mở URL Vercel → đăng nhập `admin` / `admin123` → thử đặt vé.

---

## Quy trình làm việc sau khi deploy
```
git checkout -b feature/ten-tinh-nang      # làm trên nhánh riêng
... code, commit ...
git push -u origin feature/ten-tinh-nang   # mở Pull Request trên GitHub
  → GitHub Actions chạy CI (build FE, test BE)
  → Vercel tạo link Preview riêng cho PR
merge PR vào main
  → Vercel + Render tự deploy bản mới (Continuous Deployment)
```
Lưu ý: link Preview của Vercel có domain khác → BE sẽ chặn CORS; muốn test preview đầy đủ thì thêm domain đó vào `CORS_ALLOWED_ORIGINS`.

## Xử lý sự cố
| Hiện tượng | Nguyên nhân thường gặp |
|---|---|
| FE báo "Không kết nối được server" | Sai `VITE_API_URL` (nhớ deploy lại FE sau khi đổi biến) hoặc BE đang ngủ/khởi động |
| Console trình duyệt báo lỗi **CORS** | Chưa thêm đúng domain Vercel vào `CORS_ALLOWED_ORIGINS` (có `https://`, không có `/` cuối) |
| F5 ở `/movies/3` ra 404 | Thiếu `webbanve-fe/vercel.json` (rewrite về `index.html`) |
| Render log `Communications link failure` | Sai `DB_URL` / Aiven chưa Running / thiếu `sslMode=REQUIRED` |
| Render log `OutOfMemoryError` | Gói free 512MB — tắt `SEED_DEMO` sau lần seed đầu |
