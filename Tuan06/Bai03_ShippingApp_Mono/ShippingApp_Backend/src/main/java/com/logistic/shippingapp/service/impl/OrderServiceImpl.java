package com.logistic.shippingapp.service.impl;

import com.logistic.shippingapp.entity.Order;
import com.logistic.shippingapp.entity.Payment;
import com.logistic.shippingapp.entity.Shipping;
import com.logistic.shippingapp.entity.User;
import com.logistic.shippingapp.repository.OrderRepository;
import com.logistic.shippingapp.repository.PaymentRepository;
import com.logistic.shippingapp.repository.ShippingRepository;
import com.logistic.shippingapp.repository.UserRepository;
import com.logistic.shippingapp.service.OrderService;
import com.logistic.shippingapp.service.PaymentService;
import com.logistic.shippingapp.service.ShippingService;
import lombok.RequiredArgsConstructor;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final PaymentRepository paymentRepository;
    private final ShippingRepository shippingRepository;
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

    @Transactional
    public Order placeOrder(Order order) {
        // 1. Lưu Order
        order.setStatus("PENDING");
        Order savedOrder = orderRepository.save(order);

        // 2. Tạo bản ghi Payment mặc định
        Payment payment = new Payment();
        payment.setOrder(savedOrder);
        payment.setAmount(savedOrder.getTotalPrice());
        payment.setPaymentMethod("COD");
        payment.setStatus("UNPAID");
        paymentRepository.save(payment);

        // 3. Tạo bản ghi Shipping mặc định
        Shipping shipping = new Shipping();
        shipping.setOrder(savedOrder);
        shipping.setStatus("NOT_SHIPPED");
        shipping.setTrackingNumber("TRK-" + System.currentTimeMillis());
        shippingRepository.save(shipping);

        return savedOrder;
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}