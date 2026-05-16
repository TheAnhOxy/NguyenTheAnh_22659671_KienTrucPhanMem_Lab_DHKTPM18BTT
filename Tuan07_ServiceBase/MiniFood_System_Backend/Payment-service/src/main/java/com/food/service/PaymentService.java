package com.food.service;

import com.food.dto.request.PaymentRequest;
import com.food.dto.response.PaymentResponse;

public interface PaymentService {
    PaymentResponse processPayment(PaymentRequest request);
}
