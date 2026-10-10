package com.kiettran.webbanve.controller;

import com.kiettran.webbanve.dto.cinema.CinemaRequestDto;
import com.kiettran.webbanve.dto.cinema.CinemaResponseDto;
import com.kiettran.webbanve.dto.cinema.CinemaUpdateDto;
import com.kiettran.webbanve.service.CinemaService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cinemas")
public class CinemaController {
    private final CinemaService cinemaService;
    public CinemaController(CinemaService cinemaService) {
        this.cinemaService = cinemaService;
    }

    @GetMapping("/{id}")
    public CinemaResponseDto getCinemaById(@PathVariable Long id){
        return cinemaService.getById(id);
    }

    @GetMapping
    public Page<CinemaResponseDto> getAllCinemas(@RequestParam(defaultValue = "0") int page,
                                                 @RequestParam(defaultValue = "10") int size){
        Pageable pageable = PageRequest.of(page, size);
        return cinemaService.getAll(pageable);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CinemaResponseDto createCinema(@Valid @RequestBody CinemaRequestDto dto){
        return cinemaService.create(dto);
    }

    @PatchMapping("/{id}")
    public CinemaResponseDto updateCinema(@PathVariable Long id, @RequestBody CinemaUpdateDto dto){
        return cinemaService.update(id,dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCinema(@PathVariable Long id){
        cinemaService.delete(id);
    }
}
