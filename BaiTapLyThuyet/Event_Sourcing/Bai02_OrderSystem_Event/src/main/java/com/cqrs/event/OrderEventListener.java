package com.cqrs.event;

import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class OrderEventListener {

    @EventListener
    public void handleCreated(OrderCreatedEvent event) {
        System.out.println("Order Created: " + event.getOrderId());
    }

    @EventListener
    public void handleCancelled(OrderCancelledEvent event) {
        System.out.println("Order Cancelled: " + event.getOrderId());
    }
}