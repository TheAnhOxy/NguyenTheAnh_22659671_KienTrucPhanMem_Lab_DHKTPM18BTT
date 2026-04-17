package com.trip.repository;

import com.trip.entity.Ticket;
import com.trip.entity.Trip;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
}