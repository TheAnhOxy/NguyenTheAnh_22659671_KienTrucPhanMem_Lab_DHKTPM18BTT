package com.shared.controller;

import com.shared.entity.OrderView;
import com.shared.repository.OrderViewRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderQueryController {

    private final OrderViewRepository repo;

    public OrderQueryController(OrderViewRepository r) {
        this.repo = r;
    }

    @GetMapping
    public List<OrderView> getAll() {
        return repo.findAll();
    }
}