package com.kiettran.webbanve.repository;

import com.kiettran.webbanve.entity.Showtime;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ShowtimeRepository extends JpaRepository<Showtime, Long> {
    List<Showtime> findByRoomIdAndStartTimeBetween(Long roomId, LocalDateTime startTimeAfter, LocalDateTime startTimeBefore);

    List<Showtime> findByMovieIdAndStartTimeGreaterThanEqualAndStartTimeLessThanOrderByStartTimeAsc(Long movieId, LocalDateTime from, LocalDateTime to);

    List<Showtime> findByRoom_CinemaIdAndStartTimeGreaterThanEqualAndStartTimeLessThanOrderByStartTimeAsc(Long cinemaId, LocalDateTime from, LocalDateTime to);

    boolean existsByRoomIdAndStartTimeBetween(Long roomId, LocalDateTime from, LocalDateTime to);

    List<Showtime> findByStartTimeAfter(LocalDateTime time);
}
