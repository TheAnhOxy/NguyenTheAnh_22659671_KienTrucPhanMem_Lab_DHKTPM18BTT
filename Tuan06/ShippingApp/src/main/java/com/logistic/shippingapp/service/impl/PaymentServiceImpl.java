package com.logistic.shippingapp.service.impl;

import com.logistic.shippingapp.entity.Order;
import com.logistic.shippingapp.entity.Payment;
import com.logistic.shippingapp.repository.PaymentRepository;
import com.logistic.shippingapp.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {
    private final PaymentRepository paymentRepository;

    @Override
    public void processPayment(Order order, String method) {
        Payment payment = new Payment();
        payment.setOrder(order);
        payment.setAmount(order.getTotalPrice());
        payment.setPaymentMethod(method);
        payment.setStatus("UNPAID");
        paymentRepository.save(payment);
    }
}