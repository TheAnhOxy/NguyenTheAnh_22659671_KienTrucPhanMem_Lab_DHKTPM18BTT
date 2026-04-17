package com.shared.event;

import lombok.*;

@Getter
@AllArgsConstructor
public class OrderCreatedEvent {
    private Long id;
    private String productName;
    private double price;
    private String status;
}