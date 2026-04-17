package com.food.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Component
@FeignClient(name = "order-service", url = "http://localhost:8083")
public interface OrderClient {
    @PutMapping("/orders/{id}/status")
    void updateStatus(@PathVariable Long id, @RequestParam String status);
}
