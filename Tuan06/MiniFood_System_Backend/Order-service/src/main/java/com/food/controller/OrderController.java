package com.food.controller;


import com.food.dto.request.OrderRequest;
import com.food.dto.response.ApiResponse;
import com.food.entity.Order;
import com.food.repository.OrderRepository;
import com.food.service.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    private final OrderRepository orderRepository;

    @PostMapping
    public ResponseEntity<ApiResponse> placeOrder(@RequestBody OrderRequest request) {
        return ResponseEntity.status(201).body(ApiResponse.builder()
                .status(201)
                .message("Đặt hàng thành công")
                .data(orderService.createOrder(request))
                .build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getAll() {
        return ResponseEntity.ok(ApiResponse.builder()
                .status(200)
                .data(orderService.getAllOrders())
                .build());
    }

    @PutMapping("/{id}/status")
    public void updateStatus(@PathVariable Long id, @RequestParam String status) {
        Order order = orderRepository.findById(id).orElseThrow();
        order.setStatus(status);
        orderRepository.save(order);
    }
}