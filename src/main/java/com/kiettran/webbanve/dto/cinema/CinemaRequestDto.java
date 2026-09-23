package com.kiettran.webbanve.dto.cinema;

import com.kiettran.webbanve.entity.Cinema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CinemaRequestDto {
    @NotBlank(message = "Ten cua rap phim khong duoc de trong")
    private String name;
    @NotBlank(message = "Dia chi cua rap phim khong duoc de trong")
    private String address;
}
