package com.kiettran.webbanve.seed;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Goi TMDB API (https://developer.themoviedb.org) de lay du lieu phim that.
 * Ho tro ca 2 loai key: API Key (v3, chuoi ngan) va Read Access Token (v4, bat dau bang "eyJ").
 */
@Component
public class TmdbClient {

    public static final String IMAGE_BASE = "https://image.tmdb.org/t/p/";

    private final String apiKey;
    private final RestClient restClient;

    public TmdbClient(@Value("${tmdb.api-key:}") String apiKey) {
        this.apiKey = apiKey == null ? "" : apiKey.trim();
        RestClient.Builder builder = RestClient.builder().baseUrl("https://api.themoviedb.org/3");
        if (this.apiKey.startsWith("eyJ")) {
            builder.defaultHeader("Authorization", "Bearer " + this.apiKey);
        }
        this.restClient = builder.build();
    }

    public boolean isConfigured() {
        return !apiKey.isBlank();
    }

    /** list = "now_playing" hoac "upcoming". Tra ve danh sach id phim. */
    public List<Long> listMovieIds(String list, String region, int page) {
        Map<String, Object> body = get("/movie/" + list + "?language=vi-VN&page=" + page
                + (region == null ? "" : "&region=" + region));
        List<Long> ids = new ArrayList<>();
        for (Map<String, Object> m : listOf(body.get("results"))) {
            ids.add(((Number) m.get("id")).longValue());
        }
        return ids;
    }

    /** Chi tiet phim kem videos, credits, release_dates (tieng Viet). */
    public Map<String, Object> movieDetails(long id, String language) {
        return get("/movie/" + id + "?language=" + language
                + "&append_to_response=videos,credits,release_dates&include_video_language=vi,en,null");
    }

    @SuppressWarnings("unchecked")
    private Map<String, Object> get(String uri) {
        if (!apiKey.startsWith("eyJ")) {
            uri += (uri.contains("?") ? "&" : "?") + "api_key=" + apiKey;
        }
        return restClient.get().uri(uri).retrieve().body(Map.class);
    }

    @SuppressWarnings("unchecked")
    static List<Map<String, Object>> listOf(Object o) {
        return o instanceof List<?> l ? (List<Map<String, Object>>) l : List.of();
    }

    @SuppressWarnings("unchecked")
    static Map<String, Object> mapOf(Object o) {
        return o instanceof Map<?, ?> m ? (Map<String, Object>) m : Map.of();
    }
}
