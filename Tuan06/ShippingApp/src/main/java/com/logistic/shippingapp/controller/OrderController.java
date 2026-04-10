package com.logistic.shippingapp.controller;

import com.logistic.shippingapp.entity.Order;
import com.logistic.shippingapp.model.request.OrderRequestDTO;
import com.logistic.shippingapp.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {
    private final OrderService orderService;

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody OrderRequestDTO request) {
        try {
            Order order = orderService.createOrder(
                    request.getUserId(),
                    request.getTotalPrice(),
                    request.getAddress(),
                    request.getPaymentMethod()
            );
            return ResponseEntity.ok(order);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}