package com.kiettran.webbanve.dto.ticket;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
public class TicketResponseDto {
    private Long id;
    private BigDecimal price;
    private String seatCode;
    private Long seat_id;
}
