package com.logistic.shippingapp.service.impl;

import com.logistic.shippingapp.entity.Order;
import com.logistic.shippingapp.entity.User;
import com.logistic.shippingapp.repository.OrderRepository;
import com.logistic.shippingapp.repository.UserRepository;
import com.logistic.shippingapp.service.OrderService;
import com.logistic.shippingapp.service.PaymentService;
import com.logistic.shippingapp.service.ShippingService;
import lombok.RequiredArgsConstructor;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final PaymentService paymentService;
    private final ShippingService shippingService;

    @Override
    @Transactional
    public Order createOrder(Long userId, Double amount, String address, String method) {
        User user = userRepository.findById(userId)
                .orElseThrow();

        Order order = new Order();
        order.setUser(user);
        order.setTotalPrice(amount);
        order.setStatus("PENDING");
        Order savedOrder = orderRepository.save(order);

        paymentService.processPayment(savedOrder, method);
        shippingService.createShipping(savedOrder, address);

        return savedOrder;
    }
}