package com.kiettran.webbanve.service;

import com.kiettran.webbanve.dto.cinema.CinemaRequestDto;
import com.kiettran.webbanve.dto.cinema.CinemaResponseDto;
import com.kiettran.webbanve.dto.cinema.CinemaUpdateDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CinemaService {
    CinemaResponseDto getById(Long id);

    Page<CinemaResponseDto> getAll(Pageable pageable);

    CinemaResponseDto create(CinemaRequestDto cinema);

    CinemaResponseDto update(Long id, CinemaUpdateDto dto);

    void delete(Long id);
}
