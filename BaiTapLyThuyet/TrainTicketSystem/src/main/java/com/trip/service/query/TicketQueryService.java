package com.trip.service.query;


import com.trip.dto.response.TicketResponse;
import com.trip.entity.Trip;
import com.trip.repository.TicketRepository;
import com.trip.repository.TripRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TicketQueryService {

    private final TicketRepository ticketRepo;
    private final TripRepository tripRepo;

    public TicketQueryService(TicketRepository t, TripRepository tr) {
        this.ticketRepo = t;
        this.tripRepo = tr;
    }

    public List<TicketResponse> getTickets() {
        return ticketRepo.findAll().stream()
                .map(t -> new TicketResponse(
                        t.getId(),
                        t.getPassengerName(),
                        t.getTrip().getFromStation() + " → " + t.getTrip().getToStation(),
                        t.getStatus().name()
                ))
                .collect(Collectors.toList());
    }

    public List<Trip> searchTrips(String from, String to) {
        return tripRepo.findByFromStationAndToStation(from, to);
    }
}