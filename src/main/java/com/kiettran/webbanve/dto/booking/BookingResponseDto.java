package com.kiettran.webbanve.dto.booking;

import com.kiettran.webbanve.dto.ticket.TicketResponseDto;
import com.kiettran.webbanve.enums.BookingStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class BookingResponseDto {
    private Long bookingId;
    private LocalDateTime bookingTime;
    private BookingStatus bookingStatus;
    private BigDecimal totalPrice;
    private List<TicketResponseDto> tickets;
}
