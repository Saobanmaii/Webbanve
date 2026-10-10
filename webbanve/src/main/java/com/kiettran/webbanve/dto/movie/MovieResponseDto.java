package com.kiettran.webbanve.dto.movie;

import com.kiettran.webbanve.enums.AgeRating;
import com.kiettran.webbanve.enums.MovieStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class MovieResponseDto {
    private Long id;
    private String title;
    private String description;
    private Integer durationMinutes;
    private LocalDate releaseDate;
    private String language;
    private String genre;
    private AgeRating ageRating;
    private MovieStatus status;
    private String posterUrl;
    private String backdropUrl;
    private String trailerUrl;
    private String director;
    private String cast;
    private Double rating;
}
