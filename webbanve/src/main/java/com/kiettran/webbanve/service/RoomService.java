package com.kiettran.webbanve.service;

import com.kiettran.webbanve.dto.room.RoomRequestDto;
import com.kiettran.webbanve.dto.room.RoomResponseDto;
import com.kiettran.webbanve.dto.room.RoomUpdateDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

public interface RoomService {
    RoomResponseDto getRoomById(Long id);

    Page<RoomResponseDto> getAllRooms(Pageable pageable);

    RoomResponseDto create(RoomRequestDto dto);

    RoomResponseDto update(Long id, RoomUpdateDto dto);

    void delete(Long id);
}
