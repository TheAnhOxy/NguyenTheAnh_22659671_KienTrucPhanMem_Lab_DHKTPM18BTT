package com.shared.event;

import com.shared.entity.OrderView;
import com.shared.repository.OrderViewRepository;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class OrderEventListener {

    private final OrderViewRepository repo;

    public OrderEventListener(OrderViewRepository r) {
        this.repo = r;
    }

    @EventListener
    public void handleCreated(OrderCreatedEvent event) {
        OrderView view = new OrderView();
        view.setId(event.getId());
        view.setProductName(event.getProductName());
        view.setPrice(event.getPrice());
        view.setStatus(event.getStatus());

        repo.save(view);
    }

    @EventListener
    public void handleCancelled(OrderCancelledEvent event) {
        OrderView view = repo.findById(event.getId()).orElseThrow();
        view.setStatus("CANCELLED");
        repo.save(view);
    }
}