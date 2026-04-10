package com.logistic.shippingapp.service;

import com.logistic.shippingapp.entity.Order;

public interface ShippingService {
    void createShipping(Order order, String address);
}