package com.trip.controller;

import com.trip.dto.request.BookTicketRequest;
import com.trip.dto.response.TicketResponse;
import com.trip.entity.Trip;
import com.trip.service.command.TicketCommandService;
import com.trip.service.query.TicketQueryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tickets")
public class TicketController {

    private final TicketCommandService commandService;
    private final TicketQueryService queryService;

    public TicketController(TicketCommandService c, TicketQueryService q) {
        this.commandService = c;
        this.queryService = q;
    }


    @PostMapping("/book")
    public Object book(@RequestBody BookTicketRequest request) {
        return commandService.book(request);
    }

    @PutMapping("/{id}/cancel")
    public void cancel(@PathVariable Long id) {
        commandService.cancel(id);
    }

    @GetMapping
    public List<TicketResponse> getTickets() {
        return queryService.getTickets();
    }

    @GetMapping("/search")
    public List<Trip> searchTrips(@RequestParam String from,
                                  @RequestParam String to) {
        return queryService.searchTrips(from, to);
    }
}