package com.kiettran.webbanve.dto.movie;

import com.kiettran.webbanve.enums.AgeRating;
import com.kiettran.webbanve.enums.MovieStatus;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
@Getter
@Setter
public class MovieRequestDto {
    @NotBlank
    @Size(min = 1, max = 255)
    private String title;
    @NotBlank
    @Size(min = 1, max = 4000)
    private String description;
    @NotNull
    @Positive(message = "{movie.duration.positive}")
    private Integer durationMinutes;
    @NotNull
    private LocalDate releaseDate;
    @NotBlank
    private String language;
    @NotBlank
    private String genre;
    @NotNull
    private AgeRating ageRating;
    @NotNull
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
