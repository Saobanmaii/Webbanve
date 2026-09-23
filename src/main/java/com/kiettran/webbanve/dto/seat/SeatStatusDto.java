package com.kiettran.webbanve.dto.seat;

import com.kiettran.webbanve.enums.SeatType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class SeatStatusDto {
    private Long seatId;
    private String rowLabel;
    private Integer seatNumber;
    private SeatType seatType;
    private boolean isBooked;
}
