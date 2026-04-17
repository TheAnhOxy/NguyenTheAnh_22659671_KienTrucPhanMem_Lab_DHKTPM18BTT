package com.fit;

import java.util.ArrayList;
import java.util.List;

public class OrderAggregate {
    private final String orderId;
    private final List<Event> uncommittedChanges = new ArrayList<>();
    private boolean isConfirmed = false;

    public OrderAggregate(String orderId) { this.orderId = orderId; }


    public void addItem(String name, double price) {
        if (isConfirmed) throw new IllegalStateException("Đơn hàng đã chốt!");
        applyAndCache(new ItemAdded(name, price));
    }

    public void confirmOrder() {
        applyAndCache(new OrderConfirmed());
    }

    private void applyAndCache(Event event) {
        uncommittedChanges.add(event);
        if (event instanceof OrderConfirmed) this.isConfirmed = true;
    }

    public List<Event> getUncommittedChanges() { return uncommittedChanges; }
}