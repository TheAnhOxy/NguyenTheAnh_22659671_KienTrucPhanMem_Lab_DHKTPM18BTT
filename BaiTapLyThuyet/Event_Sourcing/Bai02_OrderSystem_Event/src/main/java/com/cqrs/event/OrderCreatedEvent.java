package com.cqrs.event;


import lombok.*;

@Getter
@AllArgsConstructor
public class OrderCreatedEvent {
    private Long orderId;
    private String productName;
}