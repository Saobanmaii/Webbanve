package com.kiettran.webbanve.repository;

import com.kiettran.webbanve.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking,Long> {

    List<Booking> findAllByUser_Id(Long userId);
}
