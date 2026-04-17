package com.trip.dto.request;

import lombok.*;

@Getter
@Setter
public class BookTicketRequest {
    private String passengerName;
    private Long tripId;
}