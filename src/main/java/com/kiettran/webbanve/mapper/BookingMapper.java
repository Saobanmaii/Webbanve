package com.kiettran.webbanve.mapper;

import com.kiettran.webbanve.dto.booking.BookingResponseDto;
import com.kiettran.webbanve.entity.Booking;
import org.springframework.stereotype.Component;

@Component
public class BookingMapper {
    public BookingResponseDto entityToDto(Booking entity){
        BookingResponseDto dto = new BookingResponseDto();
        dto.setBookingId(entity.getId());
        dto.setBookingTime(entity.getBookingTime());
        dto.setBookingStatus(entity.getBookingStatus());
        dto.setTotalPrice(entity.getTotalPrice());
        return dto;
    }
}
