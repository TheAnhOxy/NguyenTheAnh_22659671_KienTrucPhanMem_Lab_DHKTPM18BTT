package com.shared.handle;

import com.shared.entity.OrderView;
import com.shared.event.OrderCancelledEvent;
import com.shared.event.OrderCreatedEvent;
import com.shared.repository.OrderViewRepository;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class OrderQueryHandler {

    private final OrderViewRepository repo;

    public OrderQueryHandler(OrderViewRepository repo) {
        this.repo = repo;
    }

    @EventListener
    public void onOrderCreated(OrderCreatedEvent event) {
        System.out.println("Đã nhận được event tạo đơn hàng cho ID: " + event.getId());

        OrderView view = new OrderView();
        view.setId(event.getId());
        view.setProductName(event.getProductName());
        view.setPrice(event.getPrice());
        view.setStatus(event.getStatus());

        repo.save(view);
    }

    @EventListener
    public void onOrderCancelled(OrderCancelledEvent event) {
        System.out.println("Đã nhận event HỦY đơn hàng: " + event.getId());
        repo.findById(event.getId()).ifPresent(order -> {
            order.setStatus("CANCELLED");
            repo.save(order);
        });
    }
}