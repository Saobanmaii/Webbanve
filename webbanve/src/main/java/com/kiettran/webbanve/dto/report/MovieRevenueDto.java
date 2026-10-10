package com.kiettran.webbanve.dto.report;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
public class MovieRevenueDto {
    private Long movieId;
    private String title;
    private BigDecimal totalRevenue;
    private Long ticketsSold;
}
