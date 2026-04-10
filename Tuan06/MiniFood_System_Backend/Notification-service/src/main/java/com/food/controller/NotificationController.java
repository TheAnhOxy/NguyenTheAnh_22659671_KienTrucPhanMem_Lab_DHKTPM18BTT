package com.food.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    private final List<Map<String, String>> logHistory = new ArrayList<>();

    @PostMapping("/send")
    public ResponseEntity<Void> send(@RequestBody Map<String, String> payload) {
        payload.put("timestamp", LocalDateTime.now().toString());
        logHistory.add(0, payload);
        System.out.println("[LOG]: " + payload.get("message"));
        return ResponseEntity.ok().build();
    }

    @GetMapping("/logs")
    public ResponseEntity<List<Map<String, String>>> getLogs() {
        return ResponseEntity.ok(logHistory);
    }
}