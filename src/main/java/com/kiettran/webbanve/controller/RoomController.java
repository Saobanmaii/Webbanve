package com.kiettran.webbanve.controller;

import com.kiettran.webbanve.dto.room.RoomRequestDto;
import com.kiettran.webbanve.dto.room.RoomResponseDto;
import com.kiettran.webbanve.dto.room.RoomUpdateDto;
import com.kiettran.webbanve.service.RoomService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rooms")
public class RoomController {
    private final RoomService roomService;
    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping("/{id}")
    public RoomResponseDto getRoomById(@PathVariable Long id){
        return roomService.getRoomById(id);
    }

    @GetMapping
    public Page<RoomResponseDto> getAllRooms(@RequestParam(defaultValue = "0") int page,
                                             @RequestParam(defaultValue = "10") int size){
        Pageable pageable = PageRequest.of(page, size);
        return roomService.getAllRooms(pageable);
    }

    @PostMapping
    @ResponseStatus(org.springframework.http.HttpStatus.CREATED)
    public RoomResponseDto createRoom(@Valid @RequestBody RoomRequestDto dto){
        return roomService.create(dto);
    }

    @PatchMapping("/{id}")
    public RoomResponseDto updateRoom(@PathVariable Long id, @RequestBody RoomUpdateDto dto){
        return roomService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(org.springframework.http.HttpStatus.NO_CONTENT)
    public void deleteRoom(@PathVariable Long id){
        roomService.delete(id);
    }
}
