package com.kiettran.webbanve.ai;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.time.Duration;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * Goi Gemini API (Google AI Studio) bang RestClient - cung kieu voi TmdbClient.
 * API key doc tu bien moi truong GEMINI_API_KEY (hoac secrets.properties), KHONG bao gio dua xuong FE.
 * Docs: https://aistudio.google.com/api-reference/generate-content
 */
@Component
public class GeminiClient {

    private final String apiKey;
    private final String model;
    private final RestClient restClient;

    public GeminiClient(@Value("${gemini.api-key:}") String apiKey,
                        @Value("${gemini.model:gemini-3.5-flash-lite}") String model) {
        this.apiKey = apiKey == null ? "" : apiKey.trim();
        this.model = model.trim();

        // Gioi han thoi gian cho: AI tra loi cham thi bao loi thay vi treo request mai
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(Duration.ofSeconds(10));
        factory.setReadTimeout(Duration.ofSeconds(45));

        this.restClient = RestClient.builder()
                .baseUrl("https://generativelanguage.googleapis.com/v1beta")
                .requestFactory(factory)
                .defaultHeader("x-goog-api-key", this.apiKey)
                .build();
    }

    public boolean isConfigured() {
        return !apiKey.isBlank();
    }

    /**
     * Gui system prompt + lich su chat, yeu cau Gemini tra ve JSON dung theo jsonSchema.
     *
     * @param contents lich su chat theo dinh dang Gemini: [{role: "user" | "model", parts: [{text}]}]
     * @return chuoi JSON model sinh ra, hoac null neu Gemini khong tra loi (bi chan, rong...)
     */
    @SuppressWarnings("unchecked")
    public String generateJson(String systemPrompt, List<Map<String, Object>> contents, Map<String, Object> jsonSchema) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("systemInstruction", Map.of("parts", List.of(Map.of("text", systemPrompt))));
        body.put("contents", contents);
        body.put("generationConfig", Map.of(
                "responseMimeType", "application/json",
                "responseJsonSchema", jsonSchema));

        Map<String, Object> res = restClient.post()
                .uri("/models/{model}:generateContent", model)
                .contentType(MediaType.APPLICATION_JSON)
                .body(body)
                .retrieve()
                .body(Map.class);

        // Text nam o candidates[0].content.parts[*].text
        if (res == null || !(res.get("candidates") instanceof List<?> candidates) || candidates.isEmpty()) {
            return null;
        }
        Object content = ((Map<String, Object>) candidates.get(0)).get("content");
        if (!(content instanceof Map<?, ?> contentMap) || !(contentMap.get("parts") instanceof List<?> parts)) {
            return null;
        }
        StringBuilder text = new StringBuilder();
        for (Object part : parts) {
            if (part instanceof Map<?, ?> p && p.get("text") instanceof String s) {
                text.append(s);
            }
        }
        return text.isEmpty() ? null : text.toString();
    }
}
