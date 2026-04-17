package com.fit;

import java.util.HashMap;
import java.util.Map;

public class OrderProjection {
    private final Map<String, OrderView> repository = new HashMap<>();

    public void on(Event event, String orderId) {
        OrderView view = repository.computeIfAbsent(orderId, id -> {
            OrderView v = new OrderView();
            v.setOrderId(id);
            return v;
        });

        if (event instanceof ItemAdded e) {
            view.setTotalPrice(view.getTotalPrice() + e.price());
        } else if (event instanceof ItemRemoved e) {
            view.setTotalPrice(view.getTotalPrice() - e.price());
        } else if (event instanceof OrderConfirmed) {
            view.setStatus("CONFIRMED");
        }
    }

    public OrderView getById(String id) { return repository.get(id); }
}
