package com.kiettran.webbanve.repository;

import com.kiettran.webbanve.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, Long> {
    @Query(value = "SELECT * FROM movie WHERE duration_minutes >= :minDuration", nativeQuery = true)
    List<Movie> searchByMinDuration(@Param("minDuration") Integer minDuration);

    @Query(value = "SELECT * FROM movie WHERE age_rating = :ageRating", nativeQuery = true)
    List<Movie> searchByAgeRating(@Param("ageRating") String ageRating);

    @Query(value = "SELECT * FROM movie WHERE title LIKE CONCAT('%', :title, '%')", nativeQuery = true)
    List<Movie> searchByTitleContaining(@Param("title") String title);
}
