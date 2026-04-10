package com.logistic.shippingapp.controller;

import com.logistic.shippingapp.entity.Order;
import com.logistic.shippingapp.model.response.ApiResponse;
import com.logistic.shippingapp.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin("*")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<ApiResponse> createOrder(@RequestBody Order order) {
        Order savedOrder = orderService.placeOrder(order);

        return ResponseEntity.status(HttpStatus.CREATED).body(
                ApiResponse.builder()
                        .status(HttpStatus.CREATED.value())
                        .message("Tạo đơn hàng thành công")
                        .data(savedOrder)
                        .build()
        );
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getAll() {
        List<Order> orders = orderService.getAllOrders();

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .status(HttpStatus.OK.value())
                        .message("Lấy danh sách đơn hàng thành công")
                        .data(orders)
                        .build()
        );
    }
}