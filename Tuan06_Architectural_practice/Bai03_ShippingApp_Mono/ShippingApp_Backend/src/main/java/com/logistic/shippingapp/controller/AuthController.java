package com.logistic.shippingapp.controller;

import com.logistic.shippingapp.entity.User;
import com.logistic.shippingapp.model.response.ApiResponse;
import com.logistic.shippingapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@RequestBody User loginReq) {
        User user = userService.login(loginReq.getUsername(), loginReq.getPassword());

        if (user != null) {
            return ResponseEntity.ok(ApiResponse.builder()
                    .status(200)
                    .message("Đăng nhập thành công")
                    .data(user)
                    .build());
        } else {
            return ResponseEntity.status(401).body(ApiResponse.builder()
                    .status(401)
                    .message("Sai tài khoản hoặc mật khẩu")
                    .build());
        }
    }
}