# MovieGo — Web đặt vé xem phim

Monorepo gồm Back-end và Front-end của hệ thống đặt vé xem phim (bài tập lớn).

| Thư mục | Nội dung | Công nghệ | Deploy |
|---|---|---|---|
| [`webbanve/`](webbanve) | Back-end REST API | Spring Boot 3, Java 17, Spring Security + JWT, JPA, MySQL | Render (Docker) |
| [`webbanve-fe/`](webbanve-fe) | Front-end | React + Vite, react-router, axios | Vercel |

## Kiến trúc
```
Trình duyệt ──HTTPS──> Vercel (FE tĩnh, CDN)
                         │ gọi REST API (VITE_API_URL)
                         ▼
                      Render (BE Spring Boot trong Docker) ──SSL──> MySQL (Aiven)

GitHub (main) ──push──> GitHub Actions CI (build FE, mvn verify BE)
               └──────> Vercel + Render tự deploy bản mới
```

## Chạy ở máy
1. **MySQL** chạy ở `localhost:3306`, tạo database `movie_ticket`.
2. **Back-end**
   ```bash
   cd webbanve
   cp secrets.properties.example secrets.properties   # điền TMDB key nếu muốn seed phim thật
   ./mvnw spring-boot:run                             # http://localhost:8080
   ```
3. **Front-end**
   ```bash
   cd webbanve-fe
   npm install
   npm run dev                                        # http://localhost:5173
   ```

Tài khoản: admin `admin` / `admin123`; user demo (mật khẩu `123456`): `nguyenvanan`, `tranthibinh`, ...

## Biến môi trường
| Nơi đặt | Biến | Ý nghĩa |
|---|---|---|
| Vercel (FE) | `VITE_API_URL` | URL Back-end, vd `https://webbanve-api.onrender.com` |
| Render (BE) | `DB_URL`, `DB_USERNAME`, `DB_PASSWORD` | Kết nối MySQL |
| Render (BE) | `JWT_SECRET` | Khóa ký JWT (chuỗi ngẫu nhiên ≥ 64 ký tự) |
| Render (BE) | `CORS_ALLOWED_ORIGINS` | Domain FE, vd `https://moviego.vercel.app` |
| Render (BE) | `TMDB_API_KEY`, `SEED_DEMO` | Seed dữ liệu demo |

Không commit file chứa bí mật: `secrets.properties`, `.env*` đã nằm trong `.gitignore`.

Tài liệu chi tiết: [`webbanve/API_SPEC.md`](webbanve/API_SPEC.md) · [`webbanve-fe/README.md`](webbanve-fe/README.md) · [`webbanve-fe/ROADMAP.md`](webbanve-fe/ROADMAP.md)
