package com.kiettran.webbanve.controller;

import com.kiettran.webbanve.dto.movie.MovieRequestDto;
import com.kiettran.webbanve.dto.movie.MovieResponseDto;
import com.kiettran.webbanve.dto.movie.MovieUpdateDto;
import com.kiettran.webbanve.enums.AgeRating;
import com.kiettran.webbanve.enums.MovieStatus;
import com.kiettran.webbanve.service.MovieService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movies")
public class MovieController {
    private final MovieService movieService;
    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping("/{id}")
    public MovieResponseDto getMovieById(@PathVariable Long id){
        return movieService.getMovieById(id);
    }

    @GetMapping
    public Page<MovieResponseDto> getAllMovies(@RequestParam(defaultValue = "0") int page,
                                               @RequestParam(defaultValue = "10") int size){
        Pageable pageable = PageRequest.of(page, size);
        return movieService.getAllMovies(pageable);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MovieResponseDto createMovie(@Valid @RequestBody MovieRequestDto dto){
        return movieService.createMovie(dto);
    }

    @PatchMapping("/{id}")
    public MovieResponseDto updateMovie(@PathVariable Long id, @Valid @RequestBody MovieUpdateDto dto){
        return movieService.updateMovie(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteMovie(@PathVariable Long id){
        movieService.deleteMovie(id);
    }

    @GetMapping("/search")
    public List<MovieResponseDto> searchMovies(@RequestParam(required = false) String title,
                                               @RequestParam(required = false)MovieStatus status,
                                               @RequestParam(required = false) String genre,
                                               @RequestParam(required = false) Integer minDuration,
                                               @RequestParam(required = false) AgeRating ageRating){
        return movieService.searchMovies(title, status, genre, minDuration, ageRating);
    }
}
