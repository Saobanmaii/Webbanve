package com.kiettran.webbanve.dto.report;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
public class CinemaRevenueDto {
    private Long cinemaId;
    private String cinemaName;
    private BigDecimal totalRevenue;
    private Long ticketsSold;
}
