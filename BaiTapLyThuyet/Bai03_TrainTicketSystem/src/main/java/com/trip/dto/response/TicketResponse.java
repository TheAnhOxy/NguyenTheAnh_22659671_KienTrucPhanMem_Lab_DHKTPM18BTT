package com.trip.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import lombok.*;

@Getter
@AllArgsConstructor
public class TicketResponse {
    private Long id;
    private String passengerName;
    private String trip;
    private String status;
}