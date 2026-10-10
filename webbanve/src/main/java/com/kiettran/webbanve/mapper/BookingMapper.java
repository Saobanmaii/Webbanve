package com.kiettran.webbanve.mapper;

import com.kiettran.webbanve.dto.booking.BookingResponseDto;
import com.kiettran.webbanve.entity.Booking;
import com.kiettran.webbanve.entity.Showtime;
import org.springframework.stereotype.Component;

@Component
public class BookingMapper {
    public BookingResponseDto entityToDto(Booking entity){
        BookingResponseDto dto = new BookingResponseDto();
        dto.setBookingId(entity.getId());
        dto.setBookingTime(entity.getBookingTime());
        dto.setBookingStatus(entity.getBookingStatus());
        dto.setTotalPrice(entity.getTotalPrice());
        setShowtimeInfo(dto, entity.getShowtime());
        return dto;
    }

    public void setShowtimeInfo(BookingResponseDto dto, Showtime showtime){
        if(showtime == null) return;
        dto.setShowtimeId(showtime.getId());
        dto.setMovieId(showtime.getMovie().getId());
        dto.setMovieTitle(showtime.getMovie().getTitle());
        dto.setPosterUrl(showtime.getMovie().getPosterUrl());
        dto.setStartTime(showtime.getStartTime());
        dto.setRoomName(showtime.getRoom().getName());
        dto.setCinemaName(showtime.getRoom().getCinema().getName());
    }
}
