package com.kiettran.webbanve.dto.showtime;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
public class ShowtimeRequestDto {
    @NotNull
    @Future
    private LocalDateTime startTime;
    @NotNull
    @PositiveOrZero
    private BigDecimal price;
    @NotNull
    private Long movieId;
    @NotNull
    private Long roomId;
}
