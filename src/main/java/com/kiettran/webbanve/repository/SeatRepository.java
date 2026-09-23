package com.kiettran.webbanve.repository;

import com.kiettran.webbanve.entity.Seat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SeatRepository extends JpaRepository<Seat,Long> {
    Boolean existsByRoomId(Long roomId);
    List<Seat> findByRoomId(Long roomId);

}
