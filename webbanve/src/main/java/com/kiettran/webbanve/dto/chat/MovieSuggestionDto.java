package com.kiettran.webbanve.dto.chat;

import lombok.AllArgsConstructor;
import lombok.Getter;

/** Phim bot goi y - du thong tin de FE ve the phim bam duoc, khong can goi them API. */
@Getter
@AllArgsConstructor
public class MovieSuggestionDto {
    private Long id;
    private String title;
    private String posterUrl;
    private String genre;
    private Integer durationMinutes;
    private Double rating;
    private String ageRating; // P, C13, C16, C18
    private String status;    // NOW_SHOWING, COMING_SOON
}
