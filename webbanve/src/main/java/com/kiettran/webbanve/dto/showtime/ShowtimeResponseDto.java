package com.kiettran.webbanve.dto.showtime;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
public class ShowtimeResponseDto {
    private Long id;
    private LocalDateTime startTime;
    private BigDecimal price;
    private Long roomId;
    private Long movieId;
}
