package com.trip.service.command;


import com.trip.dto.request.BookTicketRequest;
import com.trip.entity.Ticket;
import com.trip.entity.Trip;
import com.trip.enums.TicketStatus;
import com.trip.repository.TicketRepository;
import com.trip.repository.TripRepository;
import org.springframework.stereotype.Service;

@Service
public class TicketCommandService {

    private final TicketRepository ticketRepo;
    private final TripRepository tripRepo;

    public TicketCommandService(TicketRepository t, TripRepository tr) {
        this.ticketRepo = t;
        this.tripRepo = tr;
    }

    public Ticket book(BookTicketRequest request) {
        Trip trip = tripRepo.findById(request.getTripId())
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        Ticket ticket = Ticket.builder()
                .passengerName(request.getPassengerName())
                .trip(trip)
                .status(TicketStatus.BOOKED)
                .build();

        return ticketRepo.save(ticket);
    }

    public void cancel(Long id) {
        Ticket ticket = ticketRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found"));

        ticket.setStatus(TicketStatus.CANCELLED);
        ticketRepo.save(ticket);
    }
}