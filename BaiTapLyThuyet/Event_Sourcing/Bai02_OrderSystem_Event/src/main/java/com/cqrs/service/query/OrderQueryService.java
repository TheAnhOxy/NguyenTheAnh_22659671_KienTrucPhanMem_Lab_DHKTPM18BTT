package com.cqrs.service.query;

import com.cqrs.dto.response.OrderResponse;
import com.cqrs.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderQueryService {

    private final OrderRepository repository;

    public OrderQueryService(OrderRepository repository) {
        this.repository = repository;
    }

    public List<OrderResponse> getAll() {
        return repository.findAll()
                .stream()
                .map(o -> new OrderResponse(
                        o.getId(),
                        o.getProductName(),
                        o.getPrice(),
                        o.getStatus().name()
                ))
                .collect(Collectors.toList());
    }
}