package com.kiettran.webbanve.repository;

import com.kiettran.webbanve.entity.Cinema;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CinemaRepository extends JpaRepository<Cinema,Long> {
    Optional<Cinema> findByName(String name);
}
