package com.kiettran.webbanve.controller;

import com.kiettran.webbanve.dto.report.CinemaRevenueDto;
import com.kiettran.webbanve.dto.report.MovieRevenueDto;
import com.kiettran.webbanve.service.ReportService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/reports")
public class ReportController {

    private final ReportService reportService;
    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/revenue-by-movie")
    public List<MovieRevenueDto> getMovieRevenue(){
        return reportService.getMovieRevenue();
    }

    @GetMapping("/revenue-by-cinema")
    public List<CinemaRevenueDto> getCinemaRevenue(){
        return reportService.getCinemaRevenue();
    }


    @GetMapping("/revenue-by-movie/excel")
    public ResponseEntity<byte[]> exportRevenueMovieExcel() {
        byte[] file = reportService.exportRevenueExcelByMovie();
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"revenue-movie.xlsx\"")
                .contentType(MediaType.parseMediaType(
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(file);
    }

    @GetMapping("/revenue-by-cinema/excel")
    public ResponseEntity<byte[]> exportRevenueCinemaExcel() {
        byte[] file = reportService.exportRevenueExcelByCinema();
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"revenue-cinema.xlsx\"")
                .contentType(MediaType.parseMediaType(
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(file);
    }
}
