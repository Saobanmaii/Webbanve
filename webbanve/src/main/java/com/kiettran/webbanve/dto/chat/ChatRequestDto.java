package com.kiettran.webbanve.dto.chat;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/** FE gui ca lich su chat (AI khong tu nho cac cau truoc). Tin cuoi cung phai la cua user. */
@Getter
@Setter
@NoArgsConstructor
public class ChatRequestDto {
    @NotEmpty
    @Size(max = 40)
    private List<@Valid ChatMessageDto> messages;
}
