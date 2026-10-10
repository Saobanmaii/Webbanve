package com.kiettran.webbanve.mapper;

import com.kiettran.webbanve.dto.room.RoomRequestDto;
import com.kiettran.webbanve.dto.room.RoomResponseDto;
import com.kiettran.webbanve.entity.Room;
import org.springframework.stereotype.Component;

@Component
public class RoomMapper {

    public RoomResponseDto entityToDto(Room room){
        RoomResponseDto dto = new RoomResponseDto();
        dto.setId(room.getId());
        dto.setName(room.getName());
        dto.setRoomType(room.getRoomType());
        dto.setCinemaId(room.getCinema().getId());
        return dto;
    }

    public Room dtoToEntity(RoomRequestDto dto){
        Room room = new Room();
        room.setName(dto.getName());
        room.setRoomType(dto.getRoomType());
        return room;
    }
}
