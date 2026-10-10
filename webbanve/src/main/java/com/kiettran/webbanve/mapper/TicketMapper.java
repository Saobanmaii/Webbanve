package com.kiettran.webbanve.mapper;

import com.kiettran.webbanve.dto.ticket.TicketResponseDto;
import com.kiettran.webbanve.entity.Ticket;
import org.springframework.stereotype.Component;

@Component
public class TicketMapper {
    public TicketResponseDto entityToDto(Ticket entity){
        return new TicketResponseDto(entity.getId(), entity.getPrice(),
                entity.getSeatCode(), entity.getSeat().getId());
    }
}
