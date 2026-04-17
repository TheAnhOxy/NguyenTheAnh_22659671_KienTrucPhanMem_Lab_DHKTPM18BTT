package com.shared.service.common;

import com.shared.entity.Order;
import com.shared.repository.OrderRepository;
import com.shared.event.EventBus;
import com.shared.event.OrderCancelledEvent;
import com.shared.event.OrderCreatedEvent;
import org.springframework.stereotype.Service;

@Service
public class OrderCommandService {

    private final OrderRepository repo;
    private final EventBus eventBus;

    public OrderCommandService(OrderRepository r, EventBus e) {
        this.repo = r;
        this.eventBus = e;
    }

    public Order create(String productName, double price) {
        Order order = new Order();
        order.setProductName(productName);
        order.setPrice(price);
        order.setStatus("CREATED");

        Order saved = repo.save(order);

        eventBus.publish(new OrderCreatedEvent(
                saved.getId(),
                saved.getProductName(),
                saved.getPrice(),
                saved.getStatus()
        ));

        return saved;
    }

    public void cancel(Long id) {
        Order order = repo.findById(id).orElseThrow();

        order.setStatus("CANCELLED");
        repo.save(order);

        eventBus.publish(new OrderCancelledEvent(order.getId()));
    }
}