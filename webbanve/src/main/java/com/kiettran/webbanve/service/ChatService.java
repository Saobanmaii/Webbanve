package com.kiettran.webbanve.service;

import com.kiettran.webbanve.dto.chat.ChatRequestDto;
import com.kiettran.webbanve.dto.chat.ChatResponseDto;

public interface ChatService {
    ChatResponseDto chat(ChatRequestDto dto);
}
