package com.kiettran.webbanve.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

/**
 * Goi free cua Render tu "ngu" neu 15 phut khong co request tu ngoai vao.
 * Render tu dat bien RENDER_EXTERNAL_URL (dia chi public cua service) -> cu 10 phut tu goi chinh minh qua dia chi do
 * de server luon thuc. Chay o may (khong co bien nay) thi khong lam gi.
 */
@Component
@EnableScheduling
public class KeepAliveScheduler {
    private static final Logger log = LoggerFactory.getLogger(KeepAliveScheduler.class);

    private final String selfUrl;
    private final RestClient restClient = RestClient.create();

    public KeepAliveScheduler(@Value("${RENDER_EXTERNAL_URL:}") String selfUrl) {
        this.selfUrl = selfUrl == null ? "" : selfUrl.trim();
    }

    @Scheduled(initialDelay = 60_000, fixedDelay = 10 * 60_000)
    public void ping() {
        if (selfUrl.isEmpty()) return;
        try {
            restClient.get().uri(selfUrl + "/movies?page=0&size=1").retrieve().toBodilessEntity();
        } catch (Exception e) {
            log.warn("[keep-alive] Khong goi duoc {}: {}", selfUrl, e.toString());
        }
    }
}
