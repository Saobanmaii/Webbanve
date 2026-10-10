package com.kiettran.webbanve.service.impl;

import com.kiettran.webbanve.dto.seat.SeatStatusDto;
import com.kiettran.webbanve.dto.showtime.ShowtimeRequestDto;
import com.kiettran.webbanve.dto.showtime.ShowtimeResponseDto;
import com.kiettran.webbanve.dto.showtime.ShowtimeUpdateDto;
import com.kiettran.webbanve.entity.*;
import com.kiettran.webbanve.exception.ConflictException;
import com.kiettran.webbanve.exception.ResourceNotFoundException;
import com.kiettran.webbanve.mapper.ShowtimeMapper;
import com.kiettran.webbanve.repository.*;
import com.kiettran.webbanve.service.ShowtimeService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ShowtimeServiceImpl implements ShowtimeService {
    private final ShowtimeRepository showtimeRepository;
    private final ShowtimeMapper showtimeMapper;
    private final RoomRepository roomRepository;
    private final MovieRepository movieRepository;

    private static final int PHIM_DAI_NHAT_PHUT = 300;
    private final SeatRepository seatRepository;
    private final TicketRepository ticketRepository;
    private final MessageSource messageSource;

    @PersistenceContext
    private EntityManager entityManager;

    public ShowtimeServiceImpl(ShowtimeMapper showtimeMapper,
                               ShowtimeRepository showtimeRepository,
                               RoomRepository roomRepository,
                               MovieRepository movieRepository, SeatRepository seatRepository, TicketRepository ticketRepository, MessageSource messageSource) {
        this.showtimeMapper = showtimeMapper;
        this.showtimeRepository = showtimeRepository;
        this.roomRepository = roomRepository;
        this.movieRepository = movieRepository;
        this.seatRepository = seatRepository;
        this.ticketRepository = ticketRepository;
        this.messageSource = messageSource;
    }

    @Transactional(readOnly = true)
    @Override
    public ShowtimeResponseDto findById(Long id){
        return showtimeMapper.entityToDto(showtimeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(messageSource.getMessage("showtime.notfound", null, LocaleContextHolder.getLocale()))));
    }

    @Transactional(readOnly = true)
    @Override
    public Page<ShowtimeResponseDto> findAll(Pageable pageable){
        return showtimeRepository.findAll(pageable).map(showtimeMapper::entityToDto);
    }

    @Transactional
    @Override
    public ShowtimeResponseDto create(ShowtimeRequestDto dto){
        Showtime showtime = showtimeMapper.dtoToEntity(dto);
        Movie movie = movieRepository.findById(dto.getMovieId()).orElseThrow(() -> new ResourceNotFoundException(messageSource.getMessage("movie.notfound.id", new Object[]{dto.getMovieId()}, LocaleContextHolder.getLocale())));
        Room room = roomRepository.findById(dto.getRoomId()).orElseThrow(() -> new ResourceNotFoundException(messageSource.getMessage("room.notfound.id", new Object[]{dto.getRoomId()}, LocaleContextHolder.getLocale())));

        LocalDateTime newStart = dto.getStartTime();
        LocalDateTime newEnd = newStart.plusMinutes(movie.getDurationMinutes());
        LocalDateTime from = newStart.minusMinutes(PHIM_DAI_NHAT_PHUT);
        LocalDateTime to = newEnd;

        for(Showtime ex: showtimeRepository.findByRoomIdAndStartTimeBetween(room.getId(), from, to)){
            LocalDateTime exStart = ex.getStartTime();
            LocalDateTime exEnd = exStart.plusMinutes(ex.getMovie().getDurationMinutes());
            if(newStart.isBefore(exEnd) && newEnd.isAfter(exStart)){
                throw new ConflictException(messageSource.getMessage("showtime.overlap", null, LocaleContextHolder.getLocale()));
            }
        }
        showtime.setMovie(movie);
        showtime.setRoom(room);
        return showtimeMapper.entityToDto(showtimeRepository.save(showtime));
    }

    @Transactional
    @Override
    public ShowtimeResponseDto update(Long id, ShowtimeUpdateDto dto){
        Showtime showtimeBefore = showtimeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(messageSource.getMessage("showtime.notfound.id", new Object[]{id}, LocaleContextHolder.getLocale())));
        if(dto.getPrice() != null) showtimeBefore.setPrice(dto.getPrice());
        if(dto.getStartTime() != null) showtimeBefore.setStartTime(dto.getStartTime());

        if(dto.getMovieId() != null){
            Movie movie = movieRepository.findById(dto.getMovieId()).orElseThrow(() -> new ResourceNotFoundException(messageSource.getMessage("movie.notfound.id", new Object[]{dto.getMovieId()}, LocaleContextHolder.getLocale())));
            showtimeBefore.setMovie(movie);
        }

        if(dto.getRoomId() != null){
            Room room = roomRepository.findById(dto.getRoomId()).orElseThrow(() -> new ResourceNotFoundException(messageSource.getMessage("room.notfound.id", new Object[]{dto.getRoomId()}, LocaleContextHolder.getLocale())));
            showtimeBefore.setRoom(room);
        }

        Movie movie = showtimeBefore.getMovie();
        Room room = showtimeBefore.getRoom();

        LocalDateTime newStart = showtimeBefore.getStartTime();
        LocalDateTime newEnd = newStart.plusMinutes(movie.getDurationMinutes());
        LocalDateTime from = newStart.minusMinutes(PHIM_DAI_NHAT_PHUT);
        LocalDateTime to = newEnd;

        for(Showtime ex: showtimeRepository.findByRoomIdAndStartTimeBetween(room.getId(), from, to)){
            if(ex.getId().equals(id)) continue;
            LocalDateTime exStart = ex.getStartTime();
            LocalDateTime exEnd = exStart.plusMinutes(ex.getMovie().getDurationMinutes());
            if(newStart.isBefore(exEnd) && newEnd.isAfter(exStart)){
                throw new ConflictException(messageSource.getMessage("showtime.overlap", null, LocaleContextHolder.getLocale()));
            }
        }

        return showtimeMapper.entityToDto(showtimeRepository.save(showtimeBefore));
    }

    @Transactional
    @Override
    public void delete(Long id){
        Showtime showtime = showtimeRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException(messageSource.getMessage("showtime.notfound.id", new Object[]{id}, LocaleContextHolder.getLocale())));
        showtimeRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    @Override
    public List<ShowtimeResponseDto> findByMovieId(Long id, LocalDate date){
        LocalDateTime from = date.atStartOfDay();
        LocalDateTime to = date.plusDays(1).atStartOfDay();
        List<Showtime> list = showtimeRepository.findByMovieIdAndStartTimeGreaterThanEqualAndStartTimeLessThanOrderByStartTimeAsc(id, from, to);
        return list.stream().map(showtimeMapper::entityToDto).toList();
    }

    @Transactional(readOnly = true)
    @Override
    public List<ShowtimeResponseDto> findByCinemaId(Long id, LocalDate date){
        LocalDateTime from = date.atStartOfDay();
        LocalDateTime to = date.plusDays(1).atStartOfDay();
        return showtimeRepository.findByRoom_CinemaIdAndStartTimeGreaterThanEqualAndStartTimeLessThanOrderByStartTimeAsc(id,from,to)
                .stream().map(showtimeMapper::entityToDto).toList();
    }

    @Transactional(readOnly = true)
    @Override
    public List<SeatStatusDto> findSeatByShowtimeId(Long showtimeId){
        Room room = showtimeRepository.findById(showtimeId).orElseThrow(() -> new ResourceNotFoundException(messageSource.getMessage("showtime.notfound", null, LocaleContextHolder.getLocale())))
                .getRoom();
        List<Seat> seats = seatRepository.findByRoomId(room.getId());
        List<Ticket> tickets = ticketRepository.findByShowtimeId(showtimeId);
        List<SeatStatusDto> seatStatusDtos = new ArrayList<>();
        for(Seat seat: seats){
            SeatStatusDto statusDto = new SeatStatusDto(seat.getId(),
                                                        seat.getRowLabel(),
                                                        seat.getSeatNumber(),
                                                        seat.getSeatType(),
                                                        false
                                                        );
            if(tickets.stream().anyMatch(ticket -> ticket.getSeat().getId().equals(seat.getId()))){
                statusDto.setBooked(true);
            }
            seatStatusDtos.add(statusDto);
        }
        return seatStatusDtos;
    }

    @Override
    @Transactional(readOnly = true)
    public List<ShowtimeResponseDto> search(Long movieId, Long cinemaId, LocalDate date){
        String sql ="SELECT st.* FROM showtime AS st JOIN" +
                    " movie AS m ON m.id = st.movie_id"+
                    " JOIN room AS r ON r.id = st.room_id"+
                    " JOIN cinema AS c ON c.id = r.cinema_id"+
                    " Where 1=1";
        if(movieId != null) sql += " AND m.id = :movieId";
        if(cinemaId != null) sql += " AND c.id = :cinemaId";
        if(date != null) sql += " AND DATE(st.start_time) = :date";

        Query query = entityManager.createNativeQuery(sql, Showtime.class);

        if(movieId != null) query.setParameter("movieId", movieId);
        if(cinemaId != null) query.setParameter("cinemaId", cinemaId);
        if(date != null) query.setParameter("date", date);

        List<Showtime> showtimes = query.getResultList();
        return showtimes.stream().map(showtimeMapper::entityToDto).toList();
    }
}
