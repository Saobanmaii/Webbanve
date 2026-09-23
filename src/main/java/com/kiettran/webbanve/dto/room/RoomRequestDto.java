package com.kiettran.webbanve.dto.room;

import com.kiettran.webbanve.entity.Cinema;
import com.kiettran.webbanve.enums.RoomType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoomRequestDto {
    @NotBlank(message = "Ten phong khong duoc de trong")
    private String name;
    @NotNull(message = "Loai phong khong duoc de trong")
    private RoomType roomType;
    @NotNull(message = "Rap phim khong duoc de trong")
    private Long cinemaId;
}
