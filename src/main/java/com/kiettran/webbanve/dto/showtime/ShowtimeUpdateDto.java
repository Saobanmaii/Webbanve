package com.kiettran.webbanve.dto.showtime;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
public class ShowtimeUpdateDto {
    @Future
    private LocalDateTime startTime;
    @PositiveOrZero
    private BigDecimal price;
    private Long roomId;
    private Long movieId;
}
