package com.trip.entity;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "trips")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Trip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "from_station")
    private String fromStation;

    @Column(name = "to_station")
    private String toStation;

    @Column(name = "departure_time")
    private String departureTime;
}