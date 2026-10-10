package com.kiettran.webbanve.service;

import com.kiettran.webbanve.dto.movie.MovieRequestDto;
import com.kiettran.webbanve.dto.movie.MovieResponseDto;
import com.kiettran.webbanve.dto.movie.MovieUpdateDto;
import com.kiettran.webbanve.enums.AgeRating;
import com.kiettran.webbanve.enums.MovieStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface MovieService {
    MovieResponseDto getMovieById(Long id);

    Page<MovieResponseDto> getAllMovies(Pageable pageable);

    MovieResponseDto createMovie(MovieRequestDto dto);

    MovieResponseDto updateMovie(Long id, MovieUpdateDto dto);

    void deleteMovie(Long id);

    List<MovieResponseDto> searchMovies(String title, MovieStatus status, String genre,
                                        Integer minDuration, AgeRating ageRating);
}
