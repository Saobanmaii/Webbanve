package com.kiettran.webbanve.service.impl;

import com.kiettran.webbanve.entity.Ticket;
import com.kiettran.webbanve.repository.TicketRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketServiceImpl {
    private final TicketRepository ticketRepository;
    public TicketServiceImpl(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }
}
