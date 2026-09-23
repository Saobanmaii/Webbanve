package com.kiettran.webbanve.mapper;

import com.kiettran.webbanve.dto.movie.MovieRequestDto;
import com.kiettran.webbanve.dto.movie.MovieResponseDto;
import com.kiettran.webbanve.entity.Movie;
import org.springframework.stereotype.Component;

@Component
public class MovieMapper {

    public Movie toEntity(MovieRequestDto dto){
        Movie movie = new Movie();
        movie.setTitle(dto.getTitle());
        movie.setDescription(dto.getDescription());
        movie.setDurationMinutes(dto.getDurationMinutes());
        movie.setReleaseDate(dto.getReleaseDate());
        movie.setLanguage(dto.getLanguage());
        movie.setGenre(dto.getGenre());
        movie.setAgeRating(dto.getAgeRating());
        movie.setStatus(dto.getStatus());
        return movie;
    }

    public MovieResponseDto toDto(Movie entity){
        MovieResponseDto Dto = new MovieResponseDto();
        Dto.setId(entity.getId());
        Dto.setTitle(entity.getTitle());
        Dto.setDescription(entity.getDescription());
        Dto.setDurationMinutes(entity.getDurationMinutes());
        Dto.setReleaseDate(entity.getReleaseDate());
        Dto.setLanguage(entity.getLanguage());
        Dto.setGenre(entity.getGenre());
        Dto.setAgeRating(entity.getAgeRating());
        Dto.setStatus(entity.getStatus());
        return Dto;
    }
}
