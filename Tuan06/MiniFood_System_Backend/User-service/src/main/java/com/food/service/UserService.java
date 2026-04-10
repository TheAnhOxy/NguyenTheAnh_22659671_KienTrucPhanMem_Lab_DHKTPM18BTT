package com.food.service;

import com.food.dto.request.UserRequest;
import com.food.dto.response.TokenResponse;
import com.food.dto.response.UserResponse;

public interface UserService {
    UserResponse register(UserRequest request);
    TokenResponse login(String loginIdentifier, String password);
    TokenResponse refreshToken(String refreshToken);
}
