package com.food.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "user-service", url = "http://localhost:8081")
@Component
public interface UserClient {
    @GetMapping("/auth/{id}") // Giả sử Anh có endpoint lấy user theo id
    Object validateUser(@PathVariable Long id);
}
