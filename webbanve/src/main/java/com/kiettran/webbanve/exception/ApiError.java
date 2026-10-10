package com.kiettran.webbanve.exception;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Map;

@Getter
@Setter
// cái dươới là để k hiện cái nào null khi xuất ra json
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiError {
    private LocalDateTime timestamp;
    private Integer status;
    private String message;
    private String path;
    private Map<String, String> fieldErrors;
}
