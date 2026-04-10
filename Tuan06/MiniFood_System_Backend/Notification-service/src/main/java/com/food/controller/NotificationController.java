package com.food.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    @PostMapping("/send")
    public ResponseEntity<Void> sendNotification(@RequestBody Map<String, String> payload) {
        String message = payload.get("message");

        System.out.println("==============================================");
        System.out.println("[THÔNG BÁO MỚI]: " + message);
        System.out.println("==============================================");

        return ResponseEntity.ok().build();
    }
}