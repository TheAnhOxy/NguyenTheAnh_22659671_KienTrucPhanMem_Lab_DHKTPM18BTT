package com.logistic.shippingapp.service;

import com.logistic.shippingapp.entity.Order;

import java.util.List;

public interface OrderService {
    Order createOrder(Long userId, Double amount, String address, String method);
    public Order placeOrder(Order order);
    List<Order> getAllOrders();
}