package com.shared.controller;

import com.shared.service.common.OrderCommandService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/orders")
public class OrderCommandController {

    private final OrderCommandService service;

    public OrderCommandController(OrderCommandService s) {
        this.service = s;
    }

    @PostMapping
    public Object create(@RequestBody Map<String, Object> body) {
        return service.create(
                (String) body.get("productName"),
                Double.parseDouble(body.get("price").toString())
        );
    }

    @PutMapping("/{id}/cancel")
    public void cancel(@PathVariable Long id) {
        service.cancel(id);
    }
}