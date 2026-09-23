package com.kiettran.webbanve.dto.booking;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class BookingRequestDto {
    @NotNull
    private Long userId;
    @NotNull
    private Long showtimeId;
    @NotEmpty
    private List<Long> seatIds;
}
