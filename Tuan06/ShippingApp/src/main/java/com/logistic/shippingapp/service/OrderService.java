package com.logistic.shippingapp.service;

import com.logistic.shippingapp.entity.Order;

public interface OrderService {
    Order createOrder(Long userId, Double amount, String address, String method);
}