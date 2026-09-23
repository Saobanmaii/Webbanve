package com.kiettran.webbanve.mapper;

import com.kiettran.webbanve.dto.cinema.CinemaRequestDto;
import com.kiettran.webbanve.dto.cinema.CinemaResponseDto;
import com.kiettran.webbanve.entity.Cinema;
import org.springframework.stereotype.Component;

@Component
public class CinemaMapper {

    public CinemaResponseDto entityToDto(Cinema cinema){
        CinemaResponseDto cinemaResponseDto = new CinemaResponseDto();
        cinemaResponseDto.setId(cinema.getId());
        cinemaResponseDto.setName(cinema.getName());
        cinemaResponseDto.setAddress(cinema.getAddress());
        return cinemaResponseDto;
    }

    public Cinema dtoToEntity(CinemaRequestDto cinemaRequestDto){
        Cinema cinema = new Cinema();
        cinema.setName(cinemaRequestDto.getName());
        cinema.setAddress(cinemaRequestDto.getAddress());
        return cinema;
    }
}
