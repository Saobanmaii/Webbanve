package com.kiettran.webbanve.service.impl;

import com.kiettran.webbanve.dto.seat.SeatGenerationResuldDto;
import com.kiettran.webbanve.entity.Room;
import com.kiettran.webbanve.entity.Seat;
import com.kiettran.webbanve.enums.SeatType;
import com.kiettran.webbanve.exception.ConflictException;
import com.kiettran.webbanve.exception.ResourceNotFoundException;
import com.kiettran.webbanve.repository.RoomRepository;
import com.kiettran.webbanve.repository.SeatRepository;
import com.kiettran.webbanve.service.SeatService;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class SeatServiceImpl implements SeatService {
    private final RoomRepository roomRepository;
    private final SeatRepository seatRepository;
    private final MessageSource messageSource;
    public SeatServiceImpl(RoomRepository roomRepository, SeatRepository seatRepository, MessageSource messageSource) {
        this.roomRepository = roomRepository;
        this.seatRepository = seatRepository;
        this.messageSource = messageSource;
    }
    @Override
    @Transactional
    public SeatGenerationResuldDto generateSeat(Long roomId, int rows, int columns){
        Room room = roomRepository.findById(roomId).orElseThrow(()-> new ResourceNotFoundException(messageSource.getMessage("room.notfound", null, LocaleContextHolder.getLocale())));
        if(seatRepository.existsByRoomId(roomId)){
            throw new ConflictException(messageSource.getMessage("room.alreadyhasseats", null, LocaleContextHolder.getLocale()));
        }
        List<Seat> seats = new ArrayList<>();
        for(int i = 0; i < rows; i++){
            for(int j=0; j < columns; j++){
                Seat seat = new Seat();
                seat.setRowLabel(String.valueOf((char) ('A' + i)));
                seat.setSeatNumber(j + 1);
                seat.setRoom(room);
                seat.setSeatType(SeatType.STANDARD);
                seats.add(seat);
            }
        }
        seatRepository.saveAll(seats);
        return new SeatGenerationResuldDto(room.getId(),seats.size());
    }

}
