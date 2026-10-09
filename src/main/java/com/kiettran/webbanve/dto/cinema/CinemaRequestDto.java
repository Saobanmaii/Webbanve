package com.kiettran.webbanve.dto.cinema;

import com.kiettran.webbanve.entity.Cinema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CinemaRequestDto {
    @NotBlank(message = "{cinema.name.notblank}")
    private String name;
    @NotBlank(message = "{cinema.address.notblank}")
    private String address;
}
