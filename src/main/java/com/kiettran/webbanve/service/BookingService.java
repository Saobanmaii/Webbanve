package com.kiettran.webbanve.service;

import com.kiettran.webbanve.dto.booking.BookingRequestDto;
import com.kiettran.webbanve.dto.booking.BookingResponseDto;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface BookingService {
    BookingResponseDto createBooking(BookingRequestDto dto);
    BookingResponseDto payBooking(Long id);
    BookingResponseDto cancelBooking(Long id);
    BookingResponseDto getBookingById(Long id);
    List<BookingResponseDto> getAllBookingByUserId(Long id);
}
