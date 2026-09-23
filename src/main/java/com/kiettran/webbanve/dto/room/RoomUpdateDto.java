package com.kiettran.webbanve.dto.room;

import com.kiettran.webbanve.entity.Cinema;
import com.kiettran.webbanve.enums.RoomType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoomUpdateDto {
    private String name;
    private RoomType roomType;
    private Long cinemaId;
}
