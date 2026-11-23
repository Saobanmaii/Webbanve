package com.kiettran.webbanve.dto.chat;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

/** Cau tra loi cua bot + danh sach phim goi y (co the rong). */
@Getter
@AllArgsConstructor
public class ChatResponseDto {
    private String reply;
    private List<MovieSuggestionDto> movies;
}
