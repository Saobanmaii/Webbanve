package com.kiettran.webbanve.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);


    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiError> handleResourceNotFoundException
                                        (ResourceNotFoundException ex,
                                        HttpServletRequest req){
        ApiError body = new ApiError();
        body.setTimestamp(LocalDateTime.now());
        body.setStatus(HttpStatus.NOT_FOUND.value());
        body.setMessage(ex.getMessage());
        body.setPath(req.getRequestURI());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(body);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleValidationException
                                        (MethodArgumentNotValidException ex,
                                        HttpServletRequest req){
        Map<String, String> fields = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error -> fields.put(error.getField(), error.getDefaultMessage()));
        ApiError body = new ApiError();
        body.setTimestamp(LocalDateTime.now());
        body.setStatus(HttpStatus.BAD_REQUEST.value());
        body.setMessage("Dữ liệu không hợp lệ");
        body.setPath(req.getRequestURI());
        body.setFieldErrors(fields);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
    }

    @ExceptionHandler(ConflictException.class)
    public ResponseEntity<ApiError> handleConflictException(ConflictException ex,
                                                            HttpServletRequest req){
        ApiError body = new ApiError();
        body.setTimestamp(LocalDateTime.now());
        body.setStatus(HttpStatus.CONFLICT.value());
        body.setMessage(ex.getMessage());
        body.setPath(req.getRequestURI());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(body);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> handleAll(Exception ex, HttpServletRequest req){
        log.error("Loi khong mong muon", ex);
        ApiError body = new ApiError();
        body.setPath(req.getRequestURI());
        body.setMessage(ex.getMessage());
        body.setTimestamp(LocalDateTime.now());
        body.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(body);
    }
}
