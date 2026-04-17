package com.food.service;

import com.food.dto.request.OrderRequest;
import com.food.dto.response.OrderResponse;

import java.util.List;

public interface OrderService {
    public OrderResponse createOrder(OrderRequest request);
    List<OrderResponse> getAllOrders();
}
