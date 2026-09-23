package com.kiettran.webbanve.service;

import com.kiettran.webbanve.dto.seat.SeatStatusDto;
import com.kiettran.webbanve.dto.showtime.ShowtimeRequestDto;
import com.kiettran.webbanve.dto.showtime.ShowtimeResponseDto;
import com.kiettran.webbanve.dto.showtime.ShowtimeUpdateDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;

public interface ShowtimeService {
    ShowtimeResponseDto findById(Long id);

    Page<ShowtimeResponseDto> findAll(Pageable pageable);

    ShowtimeResponseDto create(ShowtimeRequestDto showtimeRequestDto);

    ShowtimeResponseDto update(Long id, ShowtimeUpdateDto dto);

    void delete(Long id);

    List<ShowtimeResponseDto> findByMovieId(Long id, LocalDate Date);

    List<ShowtimeResponseDto> findByCinemaId(Long id, LocalDate Date);

    List<SeatStatusDto> findSeatByShowtimeId(Long showtimeId);

    List<ShowtimeResponseDto> search(Long movieId, Long cinemaId, LocalDate date);
}
