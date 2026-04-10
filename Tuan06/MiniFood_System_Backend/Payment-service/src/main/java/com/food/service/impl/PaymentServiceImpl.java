package com.food.service.impl;

import com.food.client.NotificationClient;
import com.food.client.OrderClient;
import com.food.dto.request.PaymentRequest;
import com.food.dto.response.PaymentResponse;
import com.food.entity.Payment;
import com.food.repository.PaymentRepository;
import com.food.service.PaymentService;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {
    private final PaymentRepository paymentRepository;
    private final OrderClient orderClient;
    private final NotificationClient notificationClient;

    @Transactional
    public PaymentResponse processPayment(PaymentRequest request) {
        // 1. Giả lập thanh toán thành công
        Payment payment = new Payment();
        payment.setOrderId(request.getOrderId());
        payment.setAmount(request.getAmount());
        payment.setPaymentMethod(request.getPaymentMethod());
        payment.setStatus("SUCCESS");
        paymentRepository.save(payment);

        // 2. Cập nhật Order Service
        orderClient.updateStatus(request.getOrderId(), "PAID");

        // 3. Gọi Notification Service
        Map<String, String> notifyMsg = Map.of(
                "message", "Đơn hàng #" + request.getOrderId() + " đã thanh toán thành công qua " + request.getPaymentMethod()
        );
        notificationClient.sendNotification(notifyMsg);

        return PaymentResponse.builder()
                .transactionId(payment.getId())
                .orderId(payment.getOrderId())
                .status("SUCCESS")
                .message("Thanh toán hoàn tất")
                .build();
    }
}