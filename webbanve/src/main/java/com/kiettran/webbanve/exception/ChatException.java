package com.kiettran.webbanve.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

/** Loi cua tro ly AI, mang theo ma HTTP muon tra ve (400, 429, 503...). */
@Getter
public class ChatException extends RuntimeException {
    private final HttpStatus status;

    public ChatException(HttpStatus status, String message) {
        super(message);
        this.status = status;
    }
}
