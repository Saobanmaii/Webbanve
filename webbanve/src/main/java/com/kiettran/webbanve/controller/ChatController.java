package com.kiettran.webbanve.controller;

import com.kiettran.webbanve.dto.chat.ChatRequestDto;
import com.kiettran.webbanve.dto.chat.ChatResponseDto;
import com.kiettran.webbanve.service.ChatService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** Tro ly AI: goi y phim + huong dan dat ve. Can dang nhap (xem SecurityConfig). */
@RestController
@RequestMapping("/chat")
public class ChatController {
    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping
    public ChatResponseDto chat(@Valid @RequestBody ChatRequestDto dto) {
        return chatService.chat(dto);
    }
}
