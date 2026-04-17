package com.cqrs.event;

import lombok.*;

@Getter
@AllArgsConstructor
public class OrderCancelledEvent {
    private Long orderId;
}