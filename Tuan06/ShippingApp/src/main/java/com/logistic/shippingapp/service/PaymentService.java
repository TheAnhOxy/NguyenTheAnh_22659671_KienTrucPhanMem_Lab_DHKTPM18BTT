package com.logistic.shippingapp.service;

import com.logistic.shippingapp.entity.Order;

public interface PaymentService {
    void processPayment(Order order, String method);
}