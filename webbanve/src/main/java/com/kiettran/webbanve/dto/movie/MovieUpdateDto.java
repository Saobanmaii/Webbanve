package com.kiettran.webbanve.dto.movie;

import com.kiettran.webbanve.enums.AgeRating;
import com.kiettran.webbanve.enums.MovieStatus;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class MovieUpdateDto {
    @Size(min = 1, max = 255)
    private String title;
    @Size(min = 1, max = 4000)
    private String description;
    @Positive(message = "{movie.duration.positive}")
    private Integer durationMinutes;
    private LocalDate releaseDate;
    private String language;
    private String genre;
    private AgeRating ageRating;
    private MovieStatus status;
    @Size(max = 1000)
    private String posterUrl;
    @Size(max = 1000)
    private String backdropUrl;
    @Size(max = 1000)
    private String trailerUrl;
    @Size(max = 255)
    private String director;
    @Size(max = 1000)
    private String cast;
    @DecimalMin("0.0")
    @DecimalMax("10.0")
    private Double rating;
}
