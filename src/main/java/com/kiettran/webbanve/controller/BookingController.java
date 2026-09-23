package com.kiettran.webbanve.controller;

import com.kiettran.webbanve.dto.booking.BookingRequestDto;
import com.kiettran.webbanve.dto.booking.BookingResponseDto;
import com.kiettran.webbanve.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    private final BookingService bookingService;
    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BookingResponseDto create(@Valid @RequestBody BookingRequestDto bookingRequestDto){
        return bookingService.createBooking(bookingRequestDto);
    }

    @PatchMapping("/{id}/pay")
    public BookingResponseDto payBooking(@PathVariable Long id){
        return bookingService.payBooking(id);
    }

    @PatchMapping("/{id}/cancel")
    public BookingResponseDto cancelBooking(@PathVariable Long id){
        return bookingService.cancelBooking(id);
    }

    @GetMapping("/{id}")
    public BookingResponseDto getBookingById(@PathVariable Long id){
        return bookingService.getBookingById(id);
    }

    @GetMapping
    public List<BookingResponseDto> getBookingByUserId(@RequestParam Long userId){
        return bookingService.getAllBookingByUserId(userId);
    }
}
