package com.kiettran.webbanve.mapper;

import com.kiettran.webbanve.dto.showtime.ShowtimeRequestDto;
import com.kiettran.webbanve.dto.showtime.ShowtimeResponseDto;
import com.kiettran.webbanve.entity.Showtime;
import org.springframework.stereotype.Component;

@Component
public class ShowtimeMapper {

    public ShowtimeResponseDto entityToDto(Showtime showtime){
        ShowtimeResponseDto dto = new ShowtimeResponseDto();
        dto.setId(showtime.getId());
        dto.setStartTime(showtime.getStartTime());
        dto.setPrice(showtime.getPrice());
        dto.setMovieId(showtime.getMovie().getId());
        dto.setRoomId(showtime.getRoom().getId());
        return dto;
    }

    public Showtime dtoToEntity(ShowtimeRequestDto dto){
        Showtime showtime = new Showtime();
        showtime.setStartTime(dto.getStartTime());
        showtime.setPrice(dto.getPrice());
        return showtime;
    }
}
