package com.kiettran.webbanve.service.impl;

import com.kiettran.webbanve.dto.booking.BookingRequestDto;
import com.kiettran.webbanve.dto.booking.BookingResponseDto;
import com.kiettran.webbanve.dto.ticket.TicketResponseDto;
import com.kiettran.webbanve.entity.*;
import com.kiettran.webbanve.enums.BookingStatus;
import com.kiettran.webbanve.enums.SeatType;
import com.kiettran.webbanve.exception.ConflictException;
import com.kiettran.webbanve.exception.ForbiddenException;
import com.kiettran.webbanve.exception.ResourceNotFoundException;
import com.kiettran.webbanve.mapper.BookingMapper;
import com.kiettran.webbanve.mapper.TicketMapper;
import com.kiettran.webbanve.repository.*;
import com.kiettran.webbanve.service.BookingService;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.security.core.context.SecurityContextHolder;
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
        // Bo qua dto.userId, luon dat ve cho user dang dang nhap
        User user = getCurrentUser();
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
        booking.setShowtime(showtime);
        bookingRepository.save(booking);

        List<TicketResponseDto> ticketResponseDtos = new ArrayList<>();
        for(Ticket ticket: tickets){
            ticket.setBooking(booking);
            ticketRepository.save(ticket);
            ticketResponseDtos.add(ticketMapper.entityToDto(ticket));
        }

        BookingResponseDto bookingResponseDto = bookingMapper.entityToDto(booking);
        bookingResponseDto.setTickets(ticketResponseDtos);
        return bookingResponseDto;
    }

    private User getCurrentUser(){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username).orElseThrow(() -> new ResourceNotFoundException(messageSource.getMessage("user.notfound", null, LocaleContextHolder.getLocale())));
    }

    private boolean isAdmin(){
        return SecurityContextHolder.getContext().getAuthentication().getAuthorities().stream()
                .anyMatch(a -> "ROLE_ADMIN".equals(a.getAuthority()));
    }

    // Chi chu don hoac ADMIN moi duoc xem/thanh toan/huy
    private Booking findOwnedBooking(Long id){
        Booking booking = bookingRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(messageSource.getMessage("booking.notfound", null, LocaleContextHolder.getLocale())));
        if(!isAdmin() && !booking.getUser().getId().equals(getCurrentUser().getId()))
            throw new ForbiddenException(messageSource.getMessage("booking.forbidden", null, LocaleContextHolder.getLocale()));
        return booking;
    }

    // Booking cu chua co showtime_id -> lay suat chieu tu ve dau tien
    private void fillShowtimeFromTickets(BookingResponseDto dto, List<Ticket> tickets){
        if(dto.getShowtimeId() == null && !tickets.isEmpty())
            bookingMapper.setShowtimeInfo(dto, tickets.get(0).getShowtime());
    }

    private BookingResponseDto toDtoWithTickets(Booking booking){
        BookingResponseDto dto = bookingMapper.entityToDto(booking);
        List<Ticket> tickets = ticketRepository.findByBookingId(booking.getId());
        fillShowtimeFromTickets(dto, tickets);
        dto.setTickets(tickets.stream().map(ticketMapper::entityToDto).toList());
        return dto;
    }

    @Transactional
    public BookingResponseDto payBooking(Long id){
        Booking booking = findOwnedBooking(id);
        if(booking.getBookingStatus() != BookingStatus.PENDING)
            throw new ConflictException(messageSource.getMessage("booking.alreadypaid", null, LocaleContextHolder.getLocale()));
        booking.setBookingStatus(BookingStatus.PAID);
        bookingRepository.save(booking);
        return toDtoWithTickets(booking);
    }

    @Transactional
    public BookingResponseDto cancelBooking(Long id){
        Booking booking = findOwnedBooking(id);
        if(booking.getBookingStatus() == BookingStatus.CANCELLED)
            throw new ConflictException(messageSource.getMessage("booking.alreadycancelled", null, LocaleContextHolder.getLocale()));
        booking.setBookingStatus(BookingStatus.CANCELLED);
        bookingRepository.save(booking);
        List<Ticket> tickets = ticketRepository.findByBookingId(id);
        BookingResponseDto bookingResponseDto = bookingMapper.entityToDto(booking);
        fillShowtimeFromTickets(bookingResponseDto, tickets);
        ticketRepository.deleteAll(tickets);
        return bookingResponseDto;
    }

    @Transactional(readOnly = true)
    public BookingResponseDto getBookingById(Long id){
        Booking booking = findOwnedBooking(id);
        return toDtoWithTickets(booking);
    }

    @Transactional(readOnly = true)
    public List<BookingResponseDto> getAllBookingByUserId(Long id){
        // Khong truyen userId -> lay don cua chinh minh. Xem don nguoi khac -> phai la ADMIN
        User current = getCurrentUser();
        if(id == null || id.equals(current.getId())) id = current.getId();
        else if(!isAdmin())
            throw new ForbiddenException(messageSource.getMessage("booking.forbidden", null, LocaleContextHolder.getLocale()));
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(messageSource.getMessage("user.notfound", null, LocaleContextHolder.getLocale())));
        List<Booking> bookings = bookingRepository.findAllByUser_Id(user.getId());
        List<BookingResponseDto> bookingResponseDtos = new ArrayList<>();
        for(Booking booking: bookings){
            bookingResponseDtos.add(toDtoWithTickets(booking));
        }
        return bookingResponseDtos;
    }
}
