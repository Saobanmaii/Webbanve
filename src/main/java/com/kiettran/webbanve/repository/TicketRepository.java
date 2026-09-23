package com.kiettran.webbanve.repository;

import com.kiettran.webbanve.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket,Long> {
    public List<Ticket> findByShowtimeId(Long showtimeId);

    List<Ticket> findByShowtimeIdAndSeatIdIn(Long showtimeId, List<Long> seatIds);

    public List<Ticket> findByBookingId(Long bookingId);
}
