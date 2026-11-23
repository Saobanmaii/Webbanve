package com.kiettran.webbanve.repository;

import com.kiettran.webbanve.entity.Showtime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface ShowtimeRepository extends JpaRepository<Showtime, Long> {
    List<Showtime> findByRoomIdAndStartTimeBetween(Long roomId, LocalDateTime startTimeAfter, LocalDateTime startTimeBefore);

    List<Showtime> findByMovieIdAndStartTimeGreaterThanEqualAndStartTimeLessThanOrderByStartTimeAsc(Long movieId, LocalDateTime from, LocalDateTime to);

    List<Showtime> findByRoom_CinemaIdAndStartTimeGreaterThanEqualAndStartTimeLessThanOrderByStartTimeAsc(Long cinemaId, LocalDateTime from, LocalDateTime to);

    boolean existsByRoomIdAndStartTimeBetween(Long roomId, LocalDateTime from, LocalDateTime to);

    List<Showtime> findByStartTimeAfter(LocalDateTime time);

    // Dung cho tro ly AI: moi phim co bao nhieu suat trong khoang [from, to) va gia thap nhat.
    // Moi dong tra ve: [movieId, soSuat, giaThapNhat]
    @Query("SELECT s.movie.id, COUNT(s), MIN(s.price) FROM Showtime s " +
            "WHERE s.startTime >= :from AND s.startTime < :to GROUP BY s.movie.id")
    List<Object[]> countByMovieBetween(@Param("from") LocalDateTime from, @Param("to") LocalDateTime to);
}
