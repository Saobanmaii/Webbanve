package com.kiettran.webbanve.service.impl;

import com.kiettran.webbanve.dto.movie.MovieRequestDto;
import com.kiettran.webbanve.dto.movie.MovieResponseDto;
import com.kiettran.webbanve.dto.movie.MovieUpdateDto;
import com.kiettran.webbanve.entity.Movie;
import com.kiettran.webbanve.enums.AgeRating;
import com.kiettran.webbanve.enums.MovieStatus;
import com.kiettran.webbanve.exception.ResourceNotFoundException;
import com.kiettran.webbanve.mapper.MovieMapper;
import com.kiettran.webbanve.repository.MovieRepository;
import com.kiettran.webbanve.service.MovieService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class MovieServiceImpl implements MovieService {

    private final MovieRepository movieRepository;
    private final MovieMapper movieMapper;
    private final MessageSource messageSource;

    @PersistenceContext
    private EntityManager entityManager;

    public MovieServiceImpl(MovieRepository movieRepository, MovieMapper movieMapper, MessageSource messageSource) {
        this.movieRepository = movieRepository;
        this.movieMapper = movieMapper;
        this.messageSource = messageSource;
    }

    @Override
    @Transactional(readOnly = true)
    public MovieResponseDto getMovieById(Long id){
        Movie movie = movieRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException(
                        messageSource.getMessage("movie.notfound", null, LocaleContextHolder.getLocale())
                ));
        return movieMapper.toDto(movie);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<MovieResponseDto> getAllMovies(Pageable pageable){
        return movieRepository.findAll(pageable).map(movieMapper::toDto);
    }

    @Override
    @Transactional
    public MovieResponseDto createMovie(MovieRequestDto dto){
        Movie movie = movieMapper.toEntity(dto);
        return movieMapper.toDto(movieRepository.save(movie));
    }

    @Override
    @Transactional
    public MovieResponseDto updateMovie(Long id, MovieUpdateDto dto){
        Movie movie = movieRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(messageSource.getMessage("movie.notfound", null, LocaleContextHolder.getLocale())));

        if(dto.getTitle() != null) movie.setTitle(dto.getTitle());
        if(dto.getDescription() != null) movie.setDescription(dto.getDescription());
        if(dto.getDurationMinutes() != null) movie.setDurationMinutes(dto.getDurationMinutes());
        if(dto.getReleaseDate() != null) movie.setReleaseDate(dto.getReleaseDate());
        if(dto.getLanguage() != null) movie.setLanguage(dto.getLanguage());
        if(dto.getGenre() != null) movie.setGenre(dto.getGenre());
        if(dto.getAgeRating() != null) movie.setAgeRating(dto.getAgeRating());
        if(dto.getStatus() != null) movie.setStatus(dto.getStatus());
        return movieMapper.toDto(movieRepository.save(movie));
    }

    @Override
    @Transactional
    public void deleteMovie(Long id){
        Movie movie = movieRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(messageSource.getMessage("movie.notfound", null, LocaleContextHolder.getLocale())));
        movieRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<MovieResponseDto> searchMovies(String title, MovieStatus status, String genre,
                                               Integer minDuration, AgeRating ageRating){
        String sql ="SELECT * FROM movie WHERE 1=1";
        if(title != null) sql += " AND title LIKE :title";
        if(status != null) sql += " AND status = :status";
        if(genre != null) sql += " AND genre = :genre";
        if(minDuration != null) sql += " AND duration_minutes >= :minDuration";
        if(ageRating != null) sql += " AND age_rating LIKE :ageRating";
        Query query = entityManager.createNativeQuery(sql, Movie.class);
        if(title != null) query.setParameter("title", "%" + title + "%");
        if(status != null) query.setParameter("status", status.name());
        if(genre != null) query.setParameter("genre", genre);
        if(minDuration != null) query.setParameter("minDuration", minDuration);
        if(ageRating != null) query.setParameter("ageRating", ageRating.name());
        List<Movie> movies = query.getResultList();
        List<MovieResponseDto> movieResponseDtos = new ArrayList<>();
        for(Movie movie: movies){
            movieResponseDtos.add(movieMapper.toDto(movie));
        }
        return movieResponseDtos;
    }

}
