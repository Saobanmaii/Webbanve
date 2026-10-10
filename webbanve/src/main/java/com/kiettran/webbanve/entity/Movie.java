package com.kiettran.webbanve.entity;

import com.kiettran.webbanve.enums.AgeRating;
import com.kiettran.webbanve.enums.MovieStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "movie")
@Getter
@Setter
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "title", nullable = false, length = 255)
    private String title;
    @Column(name = "description", nullable = false, length = 4000)
    private String description;
    @Column(name = "duration_minutes", nullable = false)
    private Integer durationMinutes;
    @Column(name = "release_date", nullable = false)
    private LocalDate releaseDate;
    @Column(name = "language", nullable = false, length = 255)
    private String language;
    @Column(name = "genre", nullable = false, length = 255)
    private String genre;
    @Enumerated(EnumType.STRING)
    @Column(name = "age_rating", nullable = false)
    private AgeRating ageRating;
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private MovieStatus status;
    @Column(name = "poster_url", length = 1000)
    private String posterUrl;
    @Column(name = "backdrop_url", length = 1000)
    private String backdropUrl;
    @Column(name = "trailer_url", length = 1000)
    private String trailerUrl;
    @Column(name = "director", length = 255)
    private String director;
    @Column(name = "cast_members", length = 1000)
    private String cast;
    @Column(name = "rating")
    private Double rating;
    // id phim ben TMDB, dung de seed khong bi trung
    @Column(name = "tmdb_id", unique = true)
    private Long tmdbId;
}
