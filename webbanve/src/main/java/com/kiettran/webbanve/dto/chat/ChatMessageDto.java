package com.kiettran.webbanve.dto.chat;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/** 1 tin nhan trong khung chat. role = "user" (nguoi dung) hoac "assistant" (bot). */
@Getter
@Setter
@NoArgsConstructor
public class ChatMessageDto {
    @NotBlank
    @Pattern(regexp = "user|assistant", message = "chỉ nhận user hoặc assistant")
    private String role;

    @NotBlank
    @Size(max = 1000, message = "tối đa 1000 ký tự")
    private String content;
}
