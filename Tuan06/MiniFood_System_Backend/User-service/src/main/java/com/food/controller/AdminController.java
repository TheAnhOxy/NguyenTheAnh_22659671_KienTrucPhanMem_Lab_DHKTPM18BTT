package com.food.controller;

import com.food.dto.response.ApiResponse;
import com.food.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {
    private final UserService userService;

    @GetMapping("/users")
    public ResponseEntity<ApiResponse> getAllUsers() {
        return ResponseEntity.ok(
                ApiResponse.builder()
                        .status(200)
                        .message("Lấy danh sách người dùng thành công")
                        .data(userService.findAllUsers()) // Cần thêm hàm này trong Service
                        .build()
        );
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<ApiResponse> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok(
                ApiResponse.builder()
                        .status(200)
                        .message("Xóa người dùng thành công")
                        .build()
        );
    }
}