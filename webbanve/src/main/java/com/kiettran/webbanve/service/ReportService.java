package com.kiettran.webbanve.service;

import com.kiettran.webbanve.dto.report.CinemaRevenueDto;
import com.kiettran.webbanve.dto.report.MovieRevenueDto;

import java.util.List;

public interface ReportService {
    List<MovieRevenueDto> getMovieRevenue();
    byte[] exportRevenueExcelByMovie();

    List<CinemaRevenueDto> getCinemaRevenue();
    byte[] exportRevenueExcelByCinema();
}
