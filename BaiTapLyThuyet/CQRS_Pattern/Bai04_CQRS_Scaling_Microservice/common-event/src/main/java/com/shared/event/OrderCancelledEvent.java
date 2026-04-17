package com.shared.event;
import lombok.*;

@Getter
@AllArgsConstructor
public class OrderCancelledEvent {
    private Long id;
}