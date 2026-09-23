package com.kiettran.webbanve.service.impl;

import com.kiettran.webbanve.dto.room.RoomRequestDto;
import com.kiettran.webbanve.dto.room.RoomResponseDto;
import com.kiettran.webbanve.dto.room.RoomUpdateDto;
import com.kiettran.webbanve.entity.Cinema;
import com.kiettran.webbanve.entity.Room;
import com.kiettran.webbanve.entity.Showtime;
import com.kiettran.webbanve.exception.ResourceNotFoundException;
import com.kiettran.webbanve.mapper.RoomMapper;
import com.kiettran.webbanve.repository.CinemaRepository;
import com.kiettran.webbanve.repository.RoomRepository;
import com.kiettran.webbanve.repository.ShowtimeRepository;
import com.kiettran.webbanve.service.RoomService;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class RoomServiceImpl implements RoomService {
    private final RoomMapper roomMapper;
    private final RoomRepository roomRepository;
    private final CinemaRepository cinemaRepository;
    private final ShowtimeRepository showtimeRepository;
    private final MessageSource messageSource;

    public RoomServiceImpl(RoomMapper roomMapper, RoomRepository roomRepository, CinemaRepository cinemaRepository, ShowtimeRepository showtimeRepository, MessageSource messageSource) {
        this.roomMapper = roomMapper;
        this.roomRepository = roomRepository;
        this.cinemaRepository = cinemaRepository;
        this.showtimeRepository = showtimeRepository;
        this.messageSource = messageSource;
    }

    @Transactional(readOnly = true)
    @Override
    public RoomResponseDto getRoomById(Long id){
        return roomMapper.entityToDto(roomRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(messageSource.getMessage("room.notfound", null, LocaleContextHolder.getLocale()))));
    }

    @Transactional(readOnly = true)
    @Override
    public Page<RoomResponseDto> getAllRooms(Pageable pageable){
        return roomRepository.findAll(pageable).map(roomMapper::entityToDto);
    }

    @Transactional
    @Override
    public RoomResponseDto create(RoomRequestDto dto){
        Room room = roomMapper.dtoToEntity(dto);
        Cinema cinema = cinemaRepository.findById(dto.getCinemaId()).orElseThrow(() -> new ResourceNotFoundException(messageSource.getMessage("cinema.notfound.id", new Object[]{dto.getCinemaId()}, LocaleContextHolder.getLocale())));
        room.setCinema(cinema);
        return roomMapper.entityToDto(roomRepository.save(room));
    }

    @Transactional
    @Override
    public RoomResponseDto update(Long id, RoomUpdateDto dto){
        Room room = roomRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(messageSource.getMessage("room.notfound", null, LocaleContextHolder.getLocale())));
        if(dto.getName() != null) room.setName(dto.getName());
        if(dto.getRoomType() != null) room.setRoomType(dto.getRoomType());
        if(dto.getCinemaId() != null){
            Cinema cinema = cinemaRepository.findById(dto.getCinemaId()).orElseThrow(() -> new ResourceNotFoundException(messageSource.getMessage("cinema.notfound.id", new Object[]{dto.getCinemaId()}, LocaleContextHolder.getLocale())));
            room.setCinema(cinema);
        }
        return roomMapper.entityToDto(roomRepository.save(room));
    }

    @Transactional
    @Override
    public void delete(Long id){
        roomRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(messageSource.getMessage("room.notfound", null, LocaleContextHolder.getLocale())));
        roomRepository.deleteById(id);
    }

}
