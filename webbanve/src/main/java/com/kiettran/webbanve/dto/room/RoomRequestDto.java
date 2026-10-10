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
    @NotBlank(message = "{room.name.notblank}")
    private String name;
    @NotNull(message = "{room.roomtype.notnull}")
    private RoomType roomType;
    @NotNull(message = "{room.cinema.notnull}")
    private Long cinemaId;
}
