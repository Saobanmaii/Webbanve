package com.kiettran.webbanve.service.impl;

import com.kiettran.webbanve.dto.cinema.CinemaResponseDto;
import com.kiettran.webbanve.dto.report.CinemaRevenueDto;
import com.kiettran.webbanve.dto.report.MovieRevenueDto;
import com.kiettran.webbanve.entity.Cinema;
import com.kiettran.webbanve.service.ReportService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;


@Service
public class ReportServiceImpl implements ReportService {

    @PersistenceContext
    private EntityManager entityManager;

    private final MessageSource messageSource;

    public ReportServiceImpl(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    @Override
    @Transactional(readOnly = true)
    public List<MovieRevenueDto> getMovieRevenue(){
        String sql ="SELECT m.id, m.title, SUM(t.price) AS revenue, COUNT(t.id) AS ticket_count\n" +
                "FROM ticket t\n" +
                "JOIN booking b ON t.booking_id = b.id\n" +
                "JOIN showtime s ON t.showtime_id = s.id\n" +
                "JOIN movie m ON s.movie_id = m.id\n" +
                "WHERE b.booking_status = 'PAID'\n" +
                "GROUP BY m.id, m.title";

        Query query = entityManager.createNativeQuery(sql);
        List<Object[]> rows = query.getResultList();
        List<MovieRevenueDto> result = new ArrayList<>();

        for(Object[] row : rows){
            result.add(new MovieRevenueDto(
                    ((Number) row[0]).longValue(),
                    (String) row[1],
                    (BigDecimal) row[2],
                    ((Number) row[3]).longValue()
            ));
        }
        return result;
    }

    @Override
    @Transactional(readOnly = true)
    public List<CinemaRevenueDto> getCinemaRevenue(){
        String sql = "SELECT c.id, c.name, SUM(t.price) AS revenue, COUNT(t.id) AS ticket_count\n" +
                "FROM ticket t\n" +
                "JOIN booking b  ON t.booking_id  = b.id\n" +
                "JOIN showtime s ON t.showtime_id = s.id\n" +
                "JOIN room r     ON s.room_id     = r.id\n" +
                "JOIN cinema c   ON r.cinema_id   = c.id\n" +
                "WHERE b.booking_status = 'PAID'\n" +
                "GROUP BY c.id, c.name\n" +
                "ORDER BY revenue DESC\n";
        Query query = entityManager.createNativeQuery(sql);
        List<Object[]> rows = query.getResultList();
        List<CinemaRevenueDto> result = new ArrayList<>();

        for(Object[] row : rows){
            CinemaRevenueDto dto = new CinemaRevenueDto(
                    ((Number) row[0]).longValue(),
                    (String) row[1],
                    (BigDecimal) row[2],
                    ((Number) row[3]).longValue()
            );
            result.add(dto);
        }
        return result;
    }

    @Override
    public byte[] exportRevenueExcelByMovie(){
        List<MovieRevenueDto> data = getMovieRevenue();
        try(ByteArrayOutputStream out = new ByteArrayOutputStream();
            Workbook workbook = new XSSFWorkbook();){
        Sheet sheet = workbook.createSheet("Doanh thu");
        Row header = sheet.createRow(0);
        header.createCell(0).setCellValue("Movie ID");
        header.createCell(1).setCellValue("Ten phim");
        header.createCell(2).setCellValue("Doanh thu");
        header.createCell(3).setCellValue("So ve");

        int rowIdx = 1;
        for(MovieRevenueDto d : data){
            Row row = sheet.createRow(rowIdx++);
            row.createCell(0).setCellValue(d.getMovieId());
            row.createCell(1).setCellValue(d.getTitle());
            row.createCell(2).setCellValue(d.getTotalRevenue().doubleValue());
            row.createCell(3).setCellValue(d.getTicketsSold());
        }
            workbook.write(out);
            return out.toByteArray();
        } catch (IOException e) {
            throw new RuntimeException(messageSource.getMessage("report.export.error", null, LocaleContextHolder.getLocale()), e);
        }
    }

    @Override
    public byte[] exportRevenueExcelByCinema(){
        List<CinemaRevenueDto> data = getCinemaRevenue();
        try(ByteArrayOutputStream out = new ByteArrayOutputStream();
            Workbook workbook = new XSSFWorkbook()){
            Sheet sheet = workbook.createSheet("Doanh thu");
            Row header = sheet.createRow(0);
            header.createCell(0).setCellValue("Cinema ID");
            header.createCell(1).setCellValue("Ten cinema");
            header.createCell(2).setCellValue("Doanh thu");
            header.createCell(3).setCellValue("So ve");

            int rowIdx = 1;
            for(CinemaRevenueDto d: data){
                Row row = sheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(d.getCinemaId());
                row.createCell(1).setCellValue(d.getCinemaName());
                row.createCell(2).setCellValue(d.getTotalRevenue().doubleValue());
                row.createCell(3).setCellValue(d.getTicketsSold());
            }
            workbook.write(out);
            return out.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException(messageSource.getMessage("report.export.error", null, LocaleContextHolder.getLocale()), e);
        }
    }
}
