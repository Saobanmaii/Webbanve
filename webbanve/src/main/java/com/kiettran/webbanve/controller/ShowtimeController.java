package com.kiettran.webbanve.controller;

import com.kiettran.webbanve.dto.seat.SeatStatusDto;
import com.kiettran.webbanve.dto.showtime.ShowtimeRequestDto;
import com.kiettran.webbanve.dto.showtime.ShowtimeResponseDto;
import com.kiettran.webbanve.dto.showtime.ShowtimeUpdateDto;
import com.kiettran.webbanve.service.ShowtimeService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/showtimes")
public class ShowtimeController {
    private final ShowtimeService showtimeService;

    public ShowtimeController(ShowtimeService showtimeService){
        this.showtimeService = showtimeService;
    }

    @GetMapping("/{id}")
    public ShowtimeResponseDto findById(@PathVariable Long id){
        return showtimeService.findById(id);
    }

    @GetMapping
    public Page<ShowtimeResponseDto> findAll(@RequestParam(defaultValue = "0") int page,
                                             @RequestParam(defaultValue = "10") int size){
        Pageable pageable = PageRequest.of(page, size);
        return showtimeService.findAll(pageable);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ShowtimeResponseDto create(@Valid @RequestBody ShowtimeRequestDto dto){
        return showtimeService.create(dto);
    }

    @PatchMapping("/{id}")
    public ShowtimeResponseDto update(@PathVariable Long id,@Valid @RequestBody ShowtimeUpdateDto dto){
        return showtimeService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id){
        showtimeService.delete(id);
    }

    @GetMapping("/by-movie")
    public List<ShowtimeResponseDto> byMovie(@RequestParam Long movieId,
                                             @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)LocalDate date){
                                            // cần phải dụng cái @Datetomeformat vì khi để ? nó sẽ ở dạng string, v cần cái @
                                            // @ đó thì mới ấy về ngày được
        return showtimeService.findByMovieId(movieId, date);
    }

    @GetMapping("/by-cinema")
    public List<ShowtimeResponseDto> byCinema(@RequestParam Long cinemaId,
                                              @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)LocalDate date){
        return showtimeService.findByCinemaId(cinemaId, date);
    }

    @GetMapping("/{showtimeId}/seats")
    public List<SeatStatusDto> findAllSeatByShowtimeId(@PathVariable Long showtimeId){
        return showtimeService.findSeatByShowtimeId(showtimeId);
    }

    @GetMapping("/search")
    public List<ShowtimeResponseDto> searchShowtimes(@RequestParam(required = false) Long movieId,
                                                     @RequestParam(required = false) Long cinemaId,
                                                     @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date){
        return showtimeService.search(movieId, cinemaId, date);
    }
}
