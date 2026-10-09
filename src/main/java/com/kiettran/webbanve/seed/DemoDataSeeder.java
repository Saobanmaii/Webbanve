package com.kiettran.webbanve.seed;

import com.kiettran.webbanve.entity.*;
import com.kiettran.webbanve.enums.*;
import com.kiettran.webbanve.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.support.TransactionTemplate;

import java.math.BigDecimal;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;

import static com.kiettran.webbanve.seed.TmdbClient.listOf;
import static com.kiettran.webbanve.seed.TmdbClient.mapOf;

/**
 * Seed du lieu demo cho web giong that: phim tu TMDB, rap/phong/ghe, suat chieu 7 ngay toi, user va don mau.
 * Chay moi lan khoi dong nhung chi them phan con thieu, khong sua/xoa du lieu da co.
 * Tat bang app.seed.demo=false.
 */
@Component
@Order(2)
public class DemoDataSeeder implements CommandLineRunner {
    private static final Logger log = LoggerFactory.getLogger(DemoDataSeeder.class);

    private static final int NOW_SHOWING_LIMIT = 20;
    private static final int COMING_SOON_LIMIT = 12;
    private static final int SCHEDULE_DAYS = 7;
    private static final String DEMO_PASSWORD = "123456";

    private final boolean enabled;
    private final TmdbClient tmdb;
    private final MovieRepository movieRepository;
    private final CinemaRepository cinemaRepository;
    private final RoomRepository roomRepository;
    private final SeatRepository seatRepository;
    private final ShowtimeRepository showtimeRepository;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final BookingRepository bookingRepository;
    private final TicketRepository ticketRepository;
    private final PasswordEncoder passwordEncoder;
    private final TransactionTemplate tx;
    private final Random rnd = new Random(2026);
    // showtimeId -> cac seatId da co ve
    private final Map<Long, Set<Long>> takenSeats = new HashMap<>();

    public DemoDataSeeder(@Value("${app.seed.demo:true}") boolean enabled, TmdbClient tmdb,
                          MovieRepository movieRepository, CinemaRepository cinemaRepository,
                          RoomRepository roomRepository, SeatRepository seatRepository,
                          ShowtimeRepository showtimeRepository, UserRepository userRepository,
                          RoleRepository roleRepository, BookingRepository bookingRepository,
                          TicketRepository ticketRepository, PasswordEncoder passwordEncoder,
                          PlatformTransactionManager transactionManager) {
        this.enabled = enabled;
        this.tmdb = tmdb;
        this.movieRepository = movieRepository;
        this.cinemaRepository = cinemaRepository;
        this.roomRepository = roomRepository;
        this.seatRepository = seatRepository;
        this.showtimeRepository = showtimeRepository;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.bookingRepository = bookingRepository;
        this.ticketRepository = ticketRepository;
        this.passwordEncoder = passwordEncoder;
        this.tx = new TransactionTemplate(transactionManager);
    }

    @Override
    public void run(String... args) {
        if (!enabled) return;
        // Loi seed khong duoc lam sap app
        try { seedMovies(); } catch (Exception e) { log.warn("[seed] Khong lay duoc phim tu TMDB: {}", e.toString()); }
        try {
            tx.executeWithoutResult(s -> seedCinemas());
            tx.executeWithoutResult(s -> seedShowtimes());
            tx.executeWithoutResult(s -> seedUsersAndBookings());
        } catch (Exception e) {
            log.warn("[seed] Loi khi seed du lieu demo", e);
        }
    }

    // ======================= PHIM (TMDB) =======================

    private void seedMovies() {
        if (!tmdb.isConfigured()) {
            log.warn("[seed] Chua cau hinh tmdb.api-key -> bo qua seed phim. Xem huong dan trong secrets.properties.example");
            return;
        }
        Map<Long, MovieStatus> wanted = new LinkedHashMap<>();
        fetchIds("now_playing", 2).stream().limit(NOW_SHOWING_LIMIT)
                .forEach(id -> wanted.put(id, MovieStatus.NOW_SHOWING));
        fetchIds("upcoming", 2).stream().filter(id -> !wanted.containsKey(id)).limit(COMING_SOON_LIMIT)
                .forEach(id -> wanted.put(id, MovieStatus.COMING_SOON));

        int created = 0;
        for (Map.Entry<Long, MovieStatus> e : wanted.entrySet()) {
            if (movieRepository.existsByTmdbId(e.getKey())) continue;
            try {
                movieRepository.save(toMovie(e.getKey(), e.getValue()));
                created++;
            } catch (Exception ex) {
                log.warn("[seed] Bo qua phim TMDB {}: {}", e.getKey(), ex.toString());
            }
        }
        log.info("[seed] Them {} phim tu TMDB", created);
    }

    /** Uu tien lich chieu o Viet Nam, neu trong thi lay toan cau. */
    private List<Long> fetchIds(String list, int pages) {
        for (String region : new String[]{"VN", null}) {
            List<Long> ids = new ArrayList<>();
            for (int p = 1; p <= pages; p++) {
                for (Long id : tmdb.listMovieIds(list, region, p)) if (!ids.contains(id)) ids.add(id);
            }
            if (ids.size() >= 5) return ids;
        }
        return List.of();
    }

    private Movie toMovie(long tmdbId, MovieStatus status) {
        Map<String, Object> d = tmdb.movieDetails(tmdbId, "vi-VN");
        Movie m = new Movie();
        m.setTmdbId(tmdbId);
        m.setStatus(status);

        String title = str(d.get("title"));
        m.setTitle(cut(title.isBlank() ? str(d.get("original_title")) : title, 255));

        String overview = str(d.get("overview"));
        if (overview.isBlank()) overview = str(tmdb.movieDetails(tmdbId, "en-US").get("overview"));
        m.setDescription(cut(overview.isBlank() ? "Nội dung phim đang được cập nhật." : overview, 4000));

        int runtime = d.get("runtime") instanceof Number n ? n.intValue() : 0;
        m.setDurationMinutes(runtime > 0 ? runtime : 110);

        String release = str(d.get("release_date"));
        m.setReleaseDate(release.isBlank() ? LocalDate.now().plusDays(14) : LocalDate.parse(release));

        m.setLanguage(languageName(str(d.get("original_language"))));
        String genres = listOf(d.get("genres")).stream()
                .map(g -> str(g.get("name")).replaceFirst("^Phim ", ""))
                .filter(s -> !s.isBlank())
                .collect(Collectors.joining(", "));
        m.setGenre(cut(genres.isBlank() ? "Khác" : genres, 255));
        m.setAgeRating(ageRating(d));

        String poster = str(d.get("poster_path"));
        if (!poster.isBlank()) m.setPosterUrl(TmdbClient.IMAGE_BASE + "w500" + poster);
        String backdrop = str(d.get("backdrop_path"));
        if (!backdrop.isBlank()) m.setBackdropUrl(TmdbClient.IMAGE_BASE + "w1280" + backdrop);
        m.setTrailerUrl(trailerUrl(d));

        Map<String, Object> credits = mapOf(d.get("credits"));
        String director = listOf(credits.get("crew")).stream()
                .filter(c -> "Director".equals(c.get("job")))
                .map(c -> str(c.get("name"))).distinct().limit(2)
                .collect(Collectors.joining(", "));
        m.setDirector(director.isBlank() ? null : cut(director, 255));
        String cast = listOf(credits.get("cast")).stream()
                .map(c -> str(c.get("name"))).limit(6)
                .collect(Collectors.joining(", "));
        m.setCast(cast.isBlank() ? null : cut(cast, 1000));

        if (d.get("vote_average") instanceof Number v && d.get("vote_count") instanceof Number c && c.intValue() > 0) {
            m.setRating(Math.round(v.doubleValue() * 10) / 10.0);
        }
        return m;
    }

    /** Chon trailer YouTube tot nhat: Trailer > Teaser, tieng Viet > tieng Anh, ban chinh thuc. */
    private String trailerUrl(Map<String, Object> d) {
        Map<String, Object> best = null;
        int bestScore = -1;
        for (Map<String, Object> v : listOf(mapOf(d.get("videos")).get("results"))) {
            if (!"YouTube".equals(v.get("site"))) continue;
            int score = 0;
            if ("Trailer".equals(v.get("type"))) score += 4;
            else if ("Teaser".equals(v.get("type"))) score += 2;
            else continue;
            if ("vi".equals(v.get("iso_639_1"))) score += 3;
            else if ("en".equals(v.get("iso_639_1"))) score += 1;
            if (Boolean.TRUE.equals(v.get("official"))) score += 1;
            if (score > bestScore) { bestScore = score; best = v; }
        }
        return best == null ? null : "https://www.youtube.com/watch?v=" + best.get("key");
    }

    /** Lay phan loai tuoi o VN (P/K/T13/T16/T18), khong co thi quy doi tu My (G/PG/PG-13/R/NC-17). */
    private AgeRating ageRating(Map<String, Object> d) {
        Map<String, String> certByCountry = new HashMap<>();
        for (Map<String, Object> r : listOf(mapOf(d.get("release_dates")).get("results"))) {
            listOf(r.get("release_dates")).stream()
                    .map(x -> str(x.get("certification")).trim().toUpperCase())
                    .filter(s -> !s.isBlank()).findFirst()
                    .ifPresent(c -> certByCountry.put(str(r.get("iso_3166_1")), c));
        }
        String vn = certByCountry.getOrDefault("VN", "");
        if (vn.matches("P|K")) return AgeRating.P;
        if (vn.matches("[TC]13")) return AgeRating.C13;
        if (vn.matches("[TC]16")) return AgeRating.C16;
        if (vn.matches("[TC]18")) return AgeRating.C18;
        switch (certByCountry.getOrDefault("US", "")) {
            case "G", "PG": return AgeRating.P;
            case "PG-13": return AgeRating.C13;
            case "R": return AgeRating.C16;
            case "NC-17": return AgeRating.C18;
            default: return Boolean.TRUE.equals(d.get("adult")) ? AgeRating.C18 : AgeRating.C13;
        }
    }

    private static String languageName(String code) {
        return switch (code) {
            case "vi" -> "Tiếng Việt";
            case "en" -> "Tiếng Anh";
            case "ko" -> "Tiếng Hàn";
            case "ja" -> "Tiếng Nhật";
            case "zh", "cn" -> "Tiếng Trung";
            case "th" -> "Tiếng Thái";
            case "fr" -> "Tiếng Pháp";
            case "es" -> "Tiếng Tây Ban Nha";
            case "hi" -> "Tiếng Hindi";
            case "id" -> "Tiếng Indonesia";
            default -> code.isBlank() ? "Khác" : code.toUpperCase();
        };
    }

    // ======================= RAP / PHONG / GHE =======================

    private record CinemaSeed(String name, String address, boolean hasImax) {}

    private static final List<CinemaSeed> CINEMAS = List.of(
            new CinemaSeed("CGV Vincom Bà Triệu", "Tầng 6, Vincom Center, 191 Bà Triệu, Hai Bà Trưng, Hà Nội", true),
            new CinemaSeed("CGV Aeon Mall Long Biên", "Tầng 4, Aeon Mall, 27 Cổ Linh, Long Biên, Hà Nội", false),
            new CinemaSeed("Lotte Cinema Keangnam", "Tầng 3, Keangnam Landmark 72, Phạm Hùng, Nam Từ Liêm, Hà Nội", false),
            new CinemaSeed("CGV Landmark 81", "Tầng B1, Vincom Center Landmark 81, 772 Điện Biên Phủ, Bình Thạnh, TP.HCM", true),
            new CinemaSeed("Galaxy Nguyễn Du", "116 Nguyễn Du, Bến Thành, Quận 1, TP.HCM", false),
            new CinemaSeed("BHD Star Bitexco", "Tầng 3 & 4, Bitexco Financial Tower, 2 Hải Triều, Quận 1, TP.HCM", false),
            new CinemaSeed("Lotte Cinema Đà Nẵng", "Tầng 5, Lotte Mart, 6 Nại Nam, Hải Châu, Đà Nẵng", false)
    );

    private void seedCinemas() {
        int created = 0;
        for (CinemaSeed cs : CINEMAS) {
            if (cinemaRepository.findByName(cs.name()).isPresent()) continue;
            Cinema c = new Cinema();
            c.setName(cs.name());
            c.setAddress(cs.address());
            cinemaRepository.save(c);

            createRoom(c, "Phòng 1", RoomType.TWO_D);
            createRoom(c, "Phòng 2", RoomType.TWO_D);
            createRoom(c, "Phòng 3", RoomType.THREE_D);
            createRoom(c, cs.hasImax() ? "Phòng IMAX" : "Phòng 4", cs.hasImax() ? RoomType.IMAX : RoomType.TWO_D);
            created++;
        }
        log.info("[seed] Them {} rap (kem phong va ghe)", created);
    }

    private void createRoom(Cinema cinema, String name, RoomType type) {
        Room room = new Room();
        room.setName(name);
        room.setRoomType(type);
        room.setCinema(cinema);
        roomRepository.save(room);

        // Bo cuc giong rap that: hang dau thuong, giua VIP, hang cuoi ghe doi
        boolean imax = type == RoomType.IMAX;
        int rows = imax ? 12 : 10;
        int cols = imax ? 16 : 12;
        List<Seat> seats = new ArrayList<>();
        for (int r = 0; r < rows; r++) {
            String label = String.valueOf((char) ('A' + r));
            boolean last = r == rows - 1;
            SeatType type2 = last ? SeatType.COUPLE
                    : (r >= 3 && r < rows - 2) ? SeatType.VIP : SeatType.STANDARD;
            int n = last ? cols / 2 : cols;
            for (int c = 1; c <= n; c++) {
                Seat s = new Seat();
                s.setRowLabel(label);
                s.setSeatNumber(c);
                s.setSeatType(type2);
                s.setRoom(room);
                seats.add(s);
            }
        }
        seatRepository.saveAll(seats);
    }

    // ======================= SUAT CHIEU =======================

    private void seedShowtimes() {
        // Chi dung phim tu TMDB (id tang dan = thu tu do hot luc seed). Neu chua co thi CHUA seed suat chieu,
        // tranh truong hop lich bi lap day bang phim test roi lan sau co phim TMDB cung khong chen vao duoc.
        List<Movie> movies = movieRepository.findByStatus(MovieStatus.NOW_SHOWING).stream()
                .filter(m -> m.getTmdbId() != null)
                .sorted(Comparator.comparing(Movie::getId))
                .toList();
        if (movies.isEmpty()) {
            log.warn("[seed] Chua co phim TMDB dang chieu -> bo qua seed suat chieu (kiem tra tmdb.api-key)");
            return;
        }
        LocalDateTime earliest = LocalDateTime.now().plusMinutes(30);
        int created = 0;
        for (CinemaSeed cs : CINEMAS) {
            Cinema cinema = cinemaRepository.findByName(cs.name()).orElse(null);
            if (cinema == null) continue;
            List<Room> rooms = roomRepository.findByCinemaId(cinema.getId());
            for (int day = 0; day < SCHEDULE_DAYS; day++) {
                LocalDate date = LocalDate.now().plusDays(day);
                for (int ri = 0; ri < rooms.size(); ri++) {
                    Room room = rooms.get(ri);
                    if (showtimeRepository.existsByRoomIdAndStartTimeBetween(room.getId(),
                            date.atStartOfDay(), date.atTime(LocalTime.MAX))) continue;

                    List<Showtime> list = new ArrayList<>();
                    LocalDateTime t = date.atTime(8, 30).plusMinutes(ri * 15L);
                    while (t.toLocalTime().isBefore(LocalTime.of(23, 0)) && t.toLocalDate().equals(date)) {
                        Movie movie = pickMovie(movies, room.getRoomType());
                        LocalDateTime start = roundUp5(t);
                        if (start.isAfter(earliest)) {
                            Showtime st = new Showtime();
                            st.setStartTime(start);
                            st.setMovie(movie);
                            st.setRoom(room);
                            st.setPrice(price(room.getRoomType(), start));
                            list.add(st);
                        }
                        // het phim + 15-25 phut don dep/quang cao
                        t = start.plusMinutes(movie.getDurationMinutes() + 15 + rnd.nextInt(3) * 5L);
                    }
                    showtimeRepository.saveAll(list);
                    created += list.size();
                }
            }
        }
        log.info("[seed] Them {} suat chieu cho {} ngay toi", created, SCHEDULE_DAYS);
    }

    /** Phim hot (dau danh sach) duoc chieu nhieu hon; phong IMAX chi chieu top phim. */
    private Movie pickMovie(List<Movie> movies, RoomType type) {
        int pool = type == RoomType.IMAX ? Math.min(4, movies.size()) : movies.size();
        int idx = (int) Math.min(pool - 1, Math.abs(rnd.nextGaussian()) * pool / 2.5);
        return movies.get(idx);
    }

    private static LocalDateTime roundUp5(LocalDateTime t) {
        int mod = t.getMinute() % 5;
        LocalDateTime r = t.withSecond(0).withNano(0);
        return mod == 0 ? r : r.plusMinutes(5 - mod);
    }

    /** Gia ve: theo loai phong, suat sang re hon, suat toi va cuoi tuan dat hon. */
    private static BigDecimal price(RoomType type, LocalDateTime start) {
        int p = switch (type) {
            case TWO_D -> 75000;
            case THREE_D -> 95000;
            case IMAX -> 150000;
        };
        int hour = start.getHour();
        if (hour < 12) p -= 10000;
        else if (hour >= 17) p += 15000;
        DayOfWeek dow = start.getDayOfWeek();
        if (dow == DayOfWeek.SATURDAY || dow == DayOfWeek.SUNDAY) p += 10000;
        return BigDecimal.valueOf(p);
    }

    // ======================= USER + DON MAU =======================

    private record UserSeed(String username, String fullName, String email) {}

    private static final List<UserSeed> USERS = List.of(
            new UserSeed("nguyenvanan", "Nguyễn Văn An", "an.nguyen@example.com"),
            new UserSeed("tranthibinh", "Trần Thị Bình", "binh.tran@example.com"),
            new UserSeed("leminhchau", "Lê Minh Châu", "chau.le@example.com"),
            new UserSeed("phamquocdung", "Phạm Quốc Dũng", "dung.pham@example.com"),
            new UserSeed("hoangthuha", "Hoàng Thu Hà", "ha.hoang@example.com")
    );
    // Gom cac don "lap day" ghe cho sinh dong, khong lam roi trang "Ve cua toi" cua user demo
    private static final UserSeed WALK_IN = new UserSeed("khachvanglai", "Khách vãng lai", "walkin@example.com");

    private void seedUsersAndBookings() {
        Role roleUser = roleRepository.findByName(RoleName.ROLE_USER).orElseThrow();
        List<User> demoUsers = new ArrayList<>();
        for (UserSeed us : USERS) demoUsers.add(getOrCreateUser(us, roleUser));
        User walkIn = getOrCreateUser(WALK_IN, roleUser);

        List<Showtime> upcoming = showtimeRepository.findByStartTimeAfter(LocalDateTime.now());
        if (upcoming.isEmpty()) return;
        Map<Long, List<Seat>> seatCache = new HashMap<>();
        int created = 0;

        // Moi user demo: 2 don PAID, 1 don PENDING, 1 don CANCELLED
        for (User u : demoUsers) {
            if (bookingRepository.existsByUser_Id(u.getId())) continue;
            BookingStatus[] statuses = {BookingStatus.PAID, BookingStatus.PAID, BookingStatus.PENDING, BookingStatus.CANCELLED};
            for (BookingStatus status : statuses) {
                Showtime st = upcoming.get(rnd.nextInt(upcoming.size()));
                if (createBooking(u, st, 1 + rnd.nextInt(3), status, seatCache)) created++;
            }
        }

        // Lap day 5-30% ghe cho cac suat hom nay va ngay mai -> so do ghe trong giong that
        if (!bookingRepository.existsByUser_Id(walkIn.getId())) {
            LocalDateTime limit = LocalDate.now().plusDays(2).atStartOfDay();
            for (Showtime st : upcoming) {
                if (st.getStartTime().isAfter(limit)) continue;
                int target = (int) (seats(st, seatCache).size() * (0.05 + rnd.nextDouble() * 0.25));
                int filled = 0;
                while (filled < target) {
                    int n = 1 + rnd.nextInt(4);
                    if (!createBooking(walkIn, st, n, BookingStatus.PAID, seatCache)) break;
                    filled += n;
                    created++;
                }
            }
        }
        log.info("[seed] Them {} don dat ve mau", created);
    }

    private User getOrCreateUser(UserSeed us, Role role) {
        return userRepository.findByUsername(us.username()).orElseGet(() -> {
            User u = new User();
            u.setUsername(us.username());
            u.setPassword(passwordEncoder.encode(DEMO_PASSWORD));
            u.setEmail(us.email());
            u.setFullName(us.fullName());
            u.setEnabled(true);
            u.setRoles(List.of(role));
            return userRepository.save(u);
        });
    }

    private List<Seat> seats(Showtime st, Map<Long, List<Seat>> cache) {
        return cache.computeIfAbsent(st.getRoom().getId(), seatRepository::findByRoomId);
    }

    /** Dat n ghe lien nhau cung hang. Tinh gia giong BookingServiceImpl. Tra ve false neu khong con cho. */
    private boolean createBooking(User user, Showtime st, int n, BookingStatus status, Map<Long, List<Seat>> cache) {
        Set<Long> taken = takenSeats.computeIfAbsent(st.getId(), id -> ticketRepository.findByShowtimeId(id).stream()
                .map(t -> t.getSeat().getId()).collect(Collectors.toCollection(HashSet::new)));
        Map<String, List<Seat>> byRow = seats(st, cache).stream()
                .sorted(Comparator.comparing(Seat::getSeatNumber))
                .collect(Collectors.groupingBy(Seat::getRowLabel, TreeMap::new, Collectors.toList()));
        List<String> rows = new ArrayList<>(byRow.keySet());
        Collections.shuffle(rows, rnd);

        List<Seat> chosen = null;
        for (String row : rows) {
            List<Seat> rowSeats = byRow.get(row);
            int size = rowSeats.get(0).getSeatType() == SeatType.COUPLE ? 1 : n;
            int startIdx = rnd.nextInt(rowSeats.size());
            for (int k = 0; k < rowSeats.size() && chosen == null; k++) {
                int i = (startIdx + k) % rowSeats.size();
                if (i + size > rowSeats.size()) continue;
                List<Seat> run = rowSeats.subList(i, i + size);
                if (run.stream().noneMatch(s -> taken.contains(s.getId()))) chosen = new ArrayList<>(run);
            }
            if (chosen != null) break;
        }
        if (chosen == null) return false;

        BigDecimal total = BigDecimal.ZERO;
        List<Ticket> tickets = new ArrayList<>();
        for (Seat seat : chosen) {
            BigDecimal surcharge = switch (seat.getSeatType()) {
                case STANDARD -> BigDecimal.ZERO;
                case VIP -> BigDecimal.valueOf(30000);
                case COUPLE -> BigDecimal.valueOf(50000);
            };
            BigDecimal p = st.getPrice().add(surcharge);
            total = total.add(p);
            Ticket t = new Ticket();
            t.setSeat(seat);
            t.setShowtime(st);
            t.setPrice(p);
            t.setSeatCode(seat.getRowLabel() + seat.getSeatNumber());
            tickets.add(t);
        }

        Booking b = new Booking();
        b.setUser(user);
        b.setShowtime(st);
        b.setBookingStatus(status);
        b.setTotalPrice(total);
        b.setBookingTime(LocalDateTime.now().minusMinutes(10 + rnd.nextInt(60 * 48)));
        bookingRepository.save(b);

        // Don da huy thi ve da bi xoa (giong cancelBooking)
        if (status != BookingStatus.CANCELLED) {
            for (Ticket t : tickets) t.setBooking(b);
            ticketRepository.saveAll(tickets);
            chosen.forEach(s -> taken.add(s.getId()));
        }
        return true;
    }

    // ======================= TIEN ICH =======================

    private static String str(Object o) {
        return o == null ? "" : o.toString();
    }

    private static String cut(String s, int max) {
        return s.length() <= max ? s : s.substring(0, max);
    }
}
