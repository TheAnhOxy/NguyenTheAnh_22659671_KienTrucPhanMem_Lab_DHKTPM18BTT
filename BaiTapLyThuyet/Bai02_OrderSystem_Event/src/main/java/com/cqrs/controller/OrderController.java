package com.cqrs.controller;

import com.cqrs.dto.request.CreateOrderRequest;
import com.cqrs.dto.response.OrderResponse;
import com.cqrs.entity.Order;
import com.cqrs.service.command.OrderCommandService;
import com.cqrs.service.query.OrderQueryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderCommandService commandService;
    private final OrderQueryService queryService;

    public OrderController(OrderCommandService c, OrderQueryService q) {
        this.commandService = c;
        this.queryService = q;
    }


    @PostMapping
    public Order create(@RequestBody CreateOrderRequest request) {
        return commandService.create(request);
    }

    @PutMapping("/{id}/cancel")
    public void cancel(@PathVariable Long id) {
        commandService.cancel(id);
    }

    @GetMapping
    public List<OrderResponse> getAll() {
        return queryService.getAll();
    }
}