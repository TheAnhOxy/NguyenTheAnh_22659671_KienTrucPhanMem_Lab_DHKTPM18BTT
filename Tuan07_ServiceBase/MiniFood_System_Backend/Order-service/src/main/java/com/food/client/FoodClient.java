package com.food.client;

import com.food.dto.response.ApiResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "food-service", url = "http://localhost:8080")
@Component
public interface FoodClient {
    @GetMapping("/foods/{id}")
    ApiResponse getFoodById(@PathVariable Long id);
}