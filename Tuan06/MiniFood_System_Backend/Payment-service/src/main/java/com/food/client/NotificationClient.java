package com.food.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Map;

@Component
@FeignClient(name = "notification-service", url = "http://localhost:8085")
public interface NotificationClient {
    @PostMapping("/notifications/send")
    void sendNotification(@RequestBody Map<String, String> message);
}