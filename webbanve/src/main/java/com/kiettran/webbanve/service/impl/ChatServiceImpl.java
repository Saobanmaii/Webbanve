package com.kiettran.webbanve.service.impl;

import com.kiettran.webbanve.ai.GeminiClient;
import com.kiettran.webbanve.dto.chat.ChatMessageDto;
import com.kiettran.webbanve.dto.chat.ChatRequestDto;
import com.kiettran.webbanve.dto.chat.ChatResponseDto;
import com.kiettran.webbanve.dto.chat.MovieSuggestionDto;
import com.kiettran.webbanve.entity.Movie;
import com.kiettran.webbanve.enums.MovieStatus;
import com.kiettran.webbanve.exception.ChatException;
import com.kiettran.webbanve.repository.MovieRepository;
import com.kiettran.webbanve.repository.ShowtimeRepository;
import com.kiettran.webbanve.service.ChatService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestClientResponseException;
import tools.jackson.databind.json.JsonMapper;

import java.math.BigDecimal;
import java.text.NumberFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

/**
 * Tro ly AI cua MovieGo.
 * Luong: lay danh sach phim + so suat tu DB -> ghep vao system prompt -> gui kem lich su chat cho Gemini
 *        -> Gemini tra JSON { reply, movieIds } -> doi movieIds thanh thong tin phim that trong DB -> tra ve FE.
 */
@Service
public class ChatServiceImpl implements ChatService {
    private static final Logger log = LoggerFactory.getLogger(ChatServiceImpl.class);

    private static final int MAX_HISTORY = 10;     // chi gui 10 tin gan nhat cho AI (do ton luot / token)
    private static final int MAX_SUGGESTIONS = 4;  // toi da 4 the phim moi cau tra loi
    private static final int MAX_DESCRIPTION = 220;
    private static final DateTimeFormatter DATE = DateTimeFormatter.ofPattern("dd/MM/yyyy");
    private static final DateTimeFormatter TIME = DateTimeFormatter.ofPattern("HH:mm");
    private static final String[] WEEKDAYS = {"Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"};
    private static final JsonMapper JSON = JsonMapper.builder().build();

    // Gemini bat buoc tra ve dung khung JSON nay
    private static final Map<String, Object> RESPONSE_SCHEMA = Map.of(
            "type", "object",
            "properties", Map.of(
                    "reply", Map.of("type", "string",
                            "description", "Câu trả lời gửi người dùng, tiếng Việt, văn bản thường"),
                    "movieIds", Map.of("type", "array", "items", Map.of("type", "integer"),
                            "description", "id các phim được gợi ý (tối đa 4), rỗng nếu không gợi ý phim nào")),
            "required", List.of("reply", "movieIds"));

    private final GeminiClient gemini;
    private final MovieRepository movieRepository;
    private final ShowtimeRepository showtimeRepository;

    public ChatServiceImpl(GeminiClient gemini, MovieRepository movieRepository, ShowtimeRepository showtimeRepository) {
        this.gemini = gemini;
        this.movieRepository = movieRepository;
        this.showtimeRepository = showtimeRepository;
    }

    @Override
    public ChatResponseDto chat(ChatRequestDto dto) {
        if (!gemini.isConfigured()) {
            throw new ChatException(HttpStatus.SERVICE_UNAVAILABLE,
                    "Trợ lý AI chưa được bật (BE thiếu GEMINI_API_KEY).");
        }

        List<Map<String, Object>> contents = toGeminiContents(dto.getMessages());

        // Phim dang chieu truoc, sap chieu sau. Map giu thu tu de tra cuu id -> phim.
        Map<Long, Movie> movies = new LinkedHashMap<>();
        movieRepository.findByStatus(MovieStatus.NOW_SHOWING).forEach(m -> movies.put(m.getId(), m));
        movieRepository.findByStatus(MovieStatus.COMING_SOON).forEach(m -> movies.put(m.getId(), m));

        String systemPrompt = buildSystemPrompt(movies.values());

        String raw;
        try {
            raw = callWithRetry(systemPrompt, contents);
        } catch (RestClientResponseException e) {
            int code = e.getStatusCode().value();
            log.warn("Gemini tra loi loi {}: {}", code, e.getResponseBodyAsString());
            if (code == 429) {
                throw new ChatException(HttpStatus.TOO_MANY_REQUESTS,
                        "Trợ lý AI đang hết lượt miễn phí, bạn thử lại sau ít phút nhé.");
            }
            if (code == 400 || code == 401 || code == 403 || code == 404) {
                throw new ChatException(HttpStatus.SERVICE_UNAVAILABLE,
                        "Trợ lý AI cấu hình chưa đúng (API key hoặc tên model). Xem log BE để biết chi tiết.");
            }
            throw new ChatException(HttpStatus.SERVICE_UNAVAILABLE,
                    "Trợ lý AI đang quá tải, bạn thử lại sau ít giây nhé.");
        } catch (ResourceAccessException e) {
            log.warn("Khong goi duoc Gemini: {}", e.getMessage());
            throw new ChatException(HttpStatus.SERVICE_UNAVAILABLE,
                    "Trợ lý AI phản hồi quá lâu, bạn thử lại sau nhé.");
        }

        if (raw == null) {
            return new ChatResponseDto("Xin lỗi, mình chưa trả lời được câu này. Bạn hỏi cách khác giúp mình nhé.", List.of());
        }
        return parseReply(raw, movies);
    }

    /**
     * Gemini thinh thoang bao 503 "model dang qua tai" (hoac 500) trong vai giay.
     * Thu lai toi da 2 lan, cho 1.5s roi 3s. Loi khac (sai key, het luot...) thi nem ra ngay.
     */
    private String callWithRetry(String systemPrompt, List<Map<String, Object>> contents) {
        long[] waits = {1500, 3000};
        for (int attempt = 0; ; attempt++) {
            try {
                return gemini.generateJson(systemPrompt, contents, RESPONSE_SCHEMA);
            } catch (RestClientResponseException e) {
                int code = e.getStatusCode().value();
                boolean temporary = code == 503 || code == 500;
                if (!temporary || attempt >= waits.length) throw e;
                log.info("Gemini qua tai ({}), thu lai lan {}", code, attempt + 1);
                try {
                    Thread.sleep(waits[attempt]);
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                    throw e;
                }
            }
        }
    }

    /** Lich su chat cua FE -> dinh dang Gemini. "assistant" doi thanh "model". */
    private List<Map<String, Object>> toGeminiContents(List<ChatMessageDto> messages) {
        List<ChatMessageDto> recent = messages.subList(Math.max(0, messages.size() - MAX_HISTORY), messages.size());

        if (!"user".equals(recent.get(recent.size() - 1).getRole())) {
            throw new ChatException(HttpStatus.BAD_REQUEST, "Tin nhắn cuối cùng phải là của người dùng.");
        }

        List<Map<String, Object>> contents = new ArrayList<>();
        for (ChatMessageDto m : recent) {
            // Gemini can doan chat bat dau bang tin cua user -> bo cac tin bot o dau
            if (contents.isEmpty() && !"user".equals(m.getRole())) continue;
            String role = "user".equals(m.getRole()) ? "user" : "model";
            contents.add(Map.of("role", role, "parts", List.of(Map.of("text", m.getContent().trim()))));
        }
        return contents;
    }

    private String buildSystemPrompt(Collection<Movie> movies) {
        LocalDateTime now = LocalDateTime.now();
        LocalDate today = now.toLocalDate();
        Map<Long, Object[]> todayStats = statsByMovie(now, today.plusDays(1).atStartOfDay());
        Map<Long, Object[]> tomorrowStats = statsByMovie(today.plusDays(1).atStartOfDay(), today.plusDays(2).atStartOfDay());

        StringBuilder list = new StringBuilder();
        for (Movie m : movies) {
            list.append("- [id=").append(m.getId()).append("] ").append(m.getTitle())
                    .append(" | Thể loại: ").append(m.getGenre())
                    .append(" | ").append(m.getDurationMinutes()).append(" phút")
                    .append(" | Nhãn: ").append(ageLabel(m))
                    .append(" | Điểm: ").append(m.getRating() == null ? "chưa có" : String.format("%.1f/10", m.getRating()))
                    .append(" | ").append(m.getStatus() == MovieStatus.NOW_SHOWING ? "Đang chiếu" : "Sắp chiếu (chưa mở bán)");
            if (m.getStatus() == MovieStatus.NOW_SHOWING) {
                Object[] t = todayStats.get(m.getId());
                Object[] tm = tomorrowStats.get(m.getId());
                list.append(" | Suất còn lại hôm nay: ").append(t == null ? 0 : t[1])
                        .append(", ngày mai: ").append(tm == null ? 0 : tm[1]);
                BigDecimal minPrice = minPrice(t, tm);
                if (minPrice != null) list.append(" | Giá suất từ ").append(money(minPrice));
            } else if (m.getReleaseDate() != null) {
                list.append(" | Khởi chiếu: ").append(m.getReleaseDate().format(DATE));
            }
            if (m.getDirector() != null) list.append(" | Đạo diễn: ").append(m.getDirector());
            list.append(" | Tóm tắt: ").append(shorten(m.getDescription())).append('\n');
        }

        return """
                Bạn là "MovieGo Bot", trợ lý của rạp chiếu phim MovieGo. Hôm nay là %s, %s, bây giờ là %s.
                Việc của bạn: (1) gợi ý phim hợp với sở thích người dùng; (2) hướng dẫn cách dùng website.

                QUY TẮC
                - Chỉ gợi ý phim có trong DANH SÁCH PHIM bên dưới. Không bịa ra phim, suất chiếu, giờ chiếu hay giá.
                - Khi gợi ý, chọn tối đa 4 phim, đưa id của chúng vào movieIds theo thứ tự nên xem, và nói ngắn gọn vì sao hợp.
                  Không gợi ý phim nào thì để movieIds rỗng.
                - Trong reply chỉ gọi phim bằng tên, KHÔNG ghi id hay số hiệu phim. Thẻ phim hiện ngay dưới câu trả lời,
                  nên nếu cần thì bảo người dùng "bấm vào thẻ phim bên dưới".
                - Phim "Sắp chiếu" chưa đặt vé được; nếu gợi ý thì nói rõ ngày khởi chiếu.
                - Nhãn tuổi: P cho mọi lứa tuổi; T13, T16, T18 là từ đủ 13, 16, 18 tuổi. Đi cùng trẻ nhỏ thì ưu tiên phim P.
                - Bạn không có giờ chiếu cụ thể. Người dùng hỏi giờ chiếu thì bảo họ bấm vào thẻ phim để xem lịch theo ngày và rạp.
                - Câu hỏi không liên quan đến phim, rạp hay đặt vé: từ chối lịch sự rồi gợi ý quay lại chủ đề phim.
                - Trả lời bằng tiếng Việt, thân thiện, ngắn gọn (khoảng 120 từ trở xuống). Viết văn bản thường,
                  không dùng markdown như ** hay #. Có thể xuống dòng và dùng gạch đầu dòng "- ".

                HƯỚNG DẪN SỬ DỤNG WEBSITE
                - Đặt vé: Trang chủ → bấm vào phim → chọn ngày và suất chiếu → Chọn ghế (tối đa 8 ghế mỗi lần)
                  → Tiếp tục thanh toán → Thanh toán → nhận vé điện tử có mã dạng MG-00012.
                - Phải đăng nhập mới đặt được vé. Chưa có tài khoản thì bấm Đăng ký ở góc trên.
                - Giá vé = giá suất chiếu + phụ thu loại ghế: ghế thường +0đ, ghế VIP +30.000đ, ghế đôi +50.000đ.
                - Thanh toán trên web là giả lập, không trừ tiền thật. Ghế được giữ trong lúc đơn chờ thanh toán.
                - Xem vé, thanh toán tiếp hoặc hủy vé: vào menu "Vé của tôi". Hủy thì ghế được nhả cho người khác.
                - Tới rạp, đưa mã đặt vé cho nhân viên tại quầy để nhận vé.

                DANH SÁCH PHIM
                %s""".formatted(WEEKDAYS[today.getDayOfWeek().getValue() - 1], today.format(DATE),
                now.format(TIME), list);
    }

    /** JSON cua Gemini -> ChatResponseDto. Chi giu nhung id phim co that trong danh sach da gui. */
    private ChatResponseDto parseReply(String raw, Map<Long, Movie> movies) {
        String reply;
        List<Long> ids = new ArrayList<>();
        try {
            Map<?, ?> parsed = JSON.readValue(raw, Map.class);
            reply = parsed.get("reply") instanceof String s ? s.trim() : "";
            if (parsed.get("movieIds") instanceof List<?> list) {
                for (Object o : list) {
                    if (o instanceof Number n) ids.add(n.longValue());
                }
            }
        } catch (RuntimeException e) {
            // Hiem khi xay ra: model khong tra dung JSON -> hien nguyen van, khong co the phim
            log.warn("Khong doc duoc JSON tu Gemini: {}", raw);
            reply = raw.trim();
        }
        if (reply.isEmpty()) reply = "Mình chưa hiểu ý bạn lắm, bạn nói rõ hơn giúp mình nhé.";

        List<MovieSuggestionDto> suggestions = ids.stream()
                .distinct()
                .map(movies::get)
                .filter(Objects::nonNull) // AI bịa id -> bo qua
                .limit(MAX_SUGGESTIONS)
                .map(m -> new MovieSuggestionDto(m.getId(), m.getTitle(), m.getPosterUrl(), m.getGenre(),
                        m.getDurationMinutes(), m.getRating(),
                        m.getAgeRating() == null ? null : m.getAgeRating().name(), m.getStatus().name()))
                .toList();
        return new ChatResponseDto(reply, suggestions);
    }

    private Map<Long, Object[]> statsByMovie(LocalDateTime from, LocalDateTime to) {
        Map<Long, Object[]> map = new HashMap<>();
        for (Object[] row : showtimeRepository.countByMovieBetween(from, to)) {
            map.put(((Number) row[0]).longValue(), row);
        }
        return map;
    }

    private static BigDecimal minPrice(Object[] a, Object[] b) {
        BigDecimal pa = a == null ? null : (BigDecimal) a[2];
        BigDecimal pb = b == null ? null : (BigDecimal) b[2];
        if (pa == null) return pb;
        if (pb == null) return pa;
        return pa.min(pb);
    }

    private static String ageLabel(Movie m) {
        if (m.getAgeRating() == null) return "chưa rõ";
        return switch (m.getAgeRating()) {
            case P -> "P";
            case C13 -> "T13";
            case C16 -> "T16";
            case C18 -> "T18";
        };
    }

    private static String money(BigDecimal v) {
        return NumberFormat.getIntegerInstance(Locale.forLanguageTag("vi-VN")).format(v) + "đ";
    }

    private static String shorten(String s) {
        if (s == null) return "";
        String oneLine = s.replaceAll("\\s+", " ").trim();
        return oneLine.length() <= MAX_DESCRIPTION ? oneLine : oneLine.substring(0, MAX_DESCRIPTION) + "...";
    }
}
