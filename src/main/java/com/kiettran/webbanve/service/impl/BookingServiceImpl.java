package com.kiettran.webbanve.service.impl;

import com.kiettran.webbanve.dto.booking.BookingRequestDto;
import com.kiettran.webbanve.dto.booking.BookingResponseDto;
import com.kiettran.webbanve.dto.ticket.TicketResponseDto;
import com.kiettran.webbanve.entity.*;
import com.kiettran.webbanve.enums.BookingStatus;
import com.kiettran.webbanve.enums.SeatType;
import com.kiettran.webbanve.exception.ConflictException;
import com.kiettran.webbanve.exception.ResourceNotFoundException;
import com.kiettran.webbanve.mapper.BookingMapper;
import com.kiettran.webbanve.mapper.TicketMapper;
import com.kiettran.webbanve.repository.*;
import com.kiettran.webbanve.service.BookingService;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class BookingServiceImpl implements BookingService {
    private final UserRepository userRepository;
    private final ShowtimeRepository showtimeRepository;
    private final SeatRepository seatRepository;
    private final BookingRepository bookingRepository;
    private final TicketRepository ticketRepository;
    private final TicketMapper ticketMapper;
    private final BookingMapper bookingMapper;
    private final MessageSource messageSource;

    public BookingServiceImpl(UserRepository userRepository,
                              ShowtimeRepository showtimeRepository, SeatRepository seatRepository, BookingRepository bookingRepository, TicketRepository ticketRepository, TicketMapper ticketMapper, BookingMapper bookingMapper, MessageSource messageSource){
        this.userRepository = userRepository;
        this.showtimeRepository = showtimeRepository;
        this.seatRepository = seatRepository;
        this.bookingRepository = bookingRepository;
        this.ticketRepository = ticketRepository;
        this.ticketMapper = ticketMapper;
        this.bookingMapper = bookingMapper;
        this.messageSource = messageSource;
    }

    @Transactional
    @Override
    public BookingResponseDto createBooking(BookingRequestDto dto){
        User user = userRepository.findById(dto.getUserId()).orElseThrow(() -> new ResourceNotFoundException(messageSource.getMessage("user.notfound", null, LocaleContextHolder.getLocale())));
        Showtime showtime = showtimeRepository.findById(dto.getShowtimeId()).orElseThrow(() -> new ResourceNotFoundException(messageSource.getMessage("showtime.notfound", null, LocaleContextHolder.getLocale())));
        List<Seat> seats = seatRepository.findAllById(dto.getSeatIds());
        if(seats.size() != dto.getSeatIds().size()) throw new ResourceNotFoundException(messageSource.getMessage("seat.notfound", null, LocaleContextHolder.getLocale()));
        BigDecimal price = BigDecimal.valueOf(0.0);
        BigDecimal phu_thu = BigDecimal.valueOf(0.0);
        List<Ticket> daDat = ticketRepository.findByShowtimeIdAndSeatIdIn(showtime.getId(), dto.getSeatIds());
        if(daDat.size() != 0){
            for(Ticket ticket: daDat){
                throw new ConflictException(messageSource.getMessage("seat.alreadybooked", new Object[]{ticket.getSeat().getId()}, LocaleContextHolder.getLocale()));
            }
        }
        List<Ticket> tickets = new ArrayList<>();
        for(Seat seat: seats){
            if(!seat.getRoom().getId().equals(showtime.getRoom().getId())) throw new ConflictException(messageSource.getMessage("seat.notinroom", new Object[]{seat.getId()}, LocaleContextHolder.getLocale()));
            if(seat.getSeatType() == SeatType.STANDARD) phu_thu = BigDecimal.valueOf(0);
            else if(seat.getSeatType() == SeatType.VIP) phu_thu = BigDecimal.valueOf(30000);
            else if(seat.getSeatType() == SeatType.COUPLE) phu_thu = BigDecimal.valueOf(50000);
            Ticket ticket = new Ticket();
            ticket.setSeat(seat);
            ticket.setPrice(showtime.getPrice().add(phu_thu));
            ticket.setShowtime(showtime);
            ticket.setSeatCode(seat.getRowLabel() + seat.getSeatNumber());
            tickets.add(ticket);
            price = price.add(showtime.getPrice().add(phu_thu));
        }
        Booking booking = new Booking();
        booking.setBookingTime(LocalDateTime.now());
        booking.setBookingStatus(BookingStatus.PENDING);
        booking.setTotalPrice(price);
        booking.setUser(user);
        bookingRepository.save(booking);

        List<TicketResponseDto> ticketResponseDtos = new ArrayList<>();
        for(Ticket ticket: tickets){
            ticket.setBooking(booking);
            ticketRepository.save(ticket);
            ticketResponseDtos.add(ticketMapper.entityToDto(ticket));
        }

        BookingResponseDto bookingResponseDto = new BookingResponseDto();
        bookingResponseDto.setBookingId(booking.getId());
        bookingResponseDto.setBookingTime(booking.getBookingTime());
        bookingResponseDto.setBookingStatus(booking.getBookingStatus());
        bookingResponseDto.setTotalPrice(booking.getTotalPrice());
        bookingResponseDto.setTickets(ticketResponseDtos);
        return bookingResponseDto;
    }

    @Transactional
    public BookingResponseDto payBooking(Long id){
        Booking booking = bookingRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(messageSource.getMessage("booking.notfound", null, LocaleContextHolder.getLocale())));
        if(booking.getBookingStatus() != BookingStatus.PENDING)
            throw new ConflictException(messageSource.getMessage("booking.alreadypaid", null, LocaleContextHolder.getLocale()));
        booking.setBookingStatus(BookingStatus.PAID);
        bookingRepository.save(booking);
        BookingResponseDto bookingResponseDto = bookingMapper.entityToDto(booking);
        List<TicketResponseDto> tickets = ticketRepository.findByBookingId(id).stream().map(ticketMapper::entityToDto).toList();
        bookingResponseDto.setTickets(tickets);
        return bookingResponseDto;
    }

    @Transactional
    public BookingResponseDto cancelBooking(Long id){
        Booking booking = bookingRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(messageSource.getMessage("booking.notfound", null, LocaleContextHolder.getLocale())));
        if(booking.getBookingStatus() == BookingStatus.CANCELLED)
            throw new ConflictException(messageSource.getMessage("booking.alreadycancelled", null, LocaleContextHolder.getLocale()));
        booking.setBookingStatus(BookingStatus.CANCELLED);
        bookingRepository.save(booking);
        List<Ticket> tickets = ticketRepository.findByBookingId(id);
        ticketRepository.deleteAll(tickets);
        return bookingMapper.entityToDto(booking);
    }

    @Transactional(readOnly = true)
    public BookingResponseDto getBookingById(Long id){
        Booking booking = bookingRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(messageSource.getMessage("booking.notfound", null, LocaleContextHolder.getLocale())));
        BookingResponseDto bookingResponseDto = bookingMapper.entityToDto(booking);
        List<TicketResponseDto> tickets = ticketRepository.findByBookingId(id).stream().map(ticketMapper::entityToDto).toList();
        bookingResponseDto.setTickets(tickets);
        return bookingResponseDto;
    }

    @Transactional(readOnly = true)
    public List<BookingResponseDto> getAllBookingByUserId(Long id){
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(messageSource.getMessage("user.notfound", null, LocaleContextHolder.getLocale())));
        List<Booking> bookings = bookingRepository.findAllByUser_Id(user.getId());
        List<BookingResponseDto> bookingResponseDtos = new ArrayList<>();
        for(Booking booking: bookings){
            BookingResponseDto bookingResponseDto = bookingMapper.entityToDto(booking);
            List<TicketResponseDto> tickets = ticketRepository.findByBookingId(booking.getId()).stream().map(ticketMapper::entityToDto).toList();
            bookingResponseDto.setTickets(tickets);
            bookingResponseDtos.add(bookingResponseDto);
        }
        return bookingResponseDtos;
    }
}
