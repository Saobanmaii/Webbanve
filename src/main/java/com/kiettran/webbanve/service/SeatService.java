package com.kiettran.webbanve.service;

import com.kiettran.webbanve.dto.seat.SeatGenerationResuldDto;

public interface SeatService {
    SeatGenerationResuldDto generateSeat(Long roomId, int rows, int columns);


}
