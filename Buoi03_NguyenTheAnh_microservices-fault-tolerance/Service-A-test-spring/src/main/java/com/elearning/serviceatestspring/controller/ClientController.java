package com.elearning.serviceatestspring.controller;


import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/client")
@CrossOrigin(origins = "*")
public class ClientController {

    @Autowired
    private RestTemplate restTemplate;

    private static final String B_URL = "http://localhost:3000/api/data";

    @GetMapping("/test")
    @CircuitBreaker(name = "serviceBCircuitBreaker", fallbackMethod = "handleFallback")
    @Retry(name = "serviceBRetry")
    public String callServiceB() {
        return restTemplate.getForObject(B_URL, String.class);
    }

    // Hàm Fallback khi Service B lỗi hoặc CB đang ngắt
    public String handleFallback(Exception e) {
        return "--- [FALLBACK MODE] --- Hệ thống tạm thời không kết nối được Service B. " +
                "Lý do: " + e.getClass().getSimpleName();
    }
}