package com.kiettran.webbanve.controller;

import com.kiettran.webbanve.dto.seat.SeatGenerationResuldDto;
import com.kiettran.webbanve.service.SeatService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/seats")
public class SeatController {

    private final SeatService seatService;
    public SeatController(SeatService seatService) {
        this.seatService = seatService;
    }

    @PostMapping("/room/{roomId}/seats/generate")
    @ResponseStatus(HttpStatus.CREATED)
    public SeatGenerationResuldDto generateSeat(@PathVariable Long roomId,
                                                @RequestParam(defaultValue = "10") int rows,
                                                @RequestParam(defaultValue = "10") int columns){
        return seatService.generateSeat(roomId, rows, columns);
    }
}
