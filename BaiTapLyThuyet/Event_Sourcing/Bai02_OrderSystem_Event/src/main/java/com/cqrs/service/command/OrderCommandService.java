package com.cqrs.service.command;

import com.cqrs.dto.request.CreateOrderRequest;
import com.cqrs.entity.Order;
import com.cqrs.enums.OrderStatus;
import com.cqrs.event.OrderCancelledEvent;
import com.cqrs.event.OrderCreatedEvent;
import com.cqrs.repository.OrderRepository;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

@Service
public class OrderCommandService {

    private final OrderRepository repository;
    private final ApplicationEventPublisher publisher;

    public OrderCommandService(OrderRepository repo,
                               ApplicationEventPublisher publisher) {
        this.repository = repo;
        this.publisher = publisher;
    }

    public Order create(CreateOrderRequest request) {
        Order order = Order.builder()
                .productName(request.getProductName())
                .price(request.getPrice())
                .status(OrderStatus.CREATED)
                .build();

        Order saved = repository.save(order);

        publisher.publishEvent(
                new OrderCreatedEvent(saved.getId(), saved.getProductName())
        );

        return saved;
    }

    public void cancel(Long id) {
        Order order = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found"));

        order.setStatus(OrderStatus.CANCELLED);
        repository.save(order);

        publisher.publishEvent(
                new OrderCancelledEvent(order.getId())
        );
    }
}