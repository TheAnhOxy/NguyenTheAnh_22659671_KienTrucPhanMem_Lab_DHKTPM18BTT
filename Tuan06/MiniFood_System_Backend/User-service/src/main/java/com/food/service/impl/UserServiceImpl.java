package com.food.service.impl;

import com.food.config.ModelMapperConfig;
import com.food.dto.request.UserRequest;
import com.food.dto.response.TokenResponse;
import com.food.dto.response.UserResponse;
import com.food.entity.User;
import com.food.repository.UserRepository;
import com.food.service.UserService;
import com.food.utils.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    @Override
    public UserResponse register(UserRequest request) {
        if(userRepository.existsByUsername(request.getUsername()))
            throw new RuntimeException("Username đã tồn tại");

        User user = modelMapper.map(request, User.class);
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        // SỬA LẠI LOGIC Ở ĐÂY:
        // Nếu trong request không gửi role (hoặc gửi rỗng/null)
        if (request.getRole() == null || request.getRole().isEmpty()) {
            if ("admin".equalsIgnoreCase(user.getUsername())) {
                user.setRole("ADMIN");
            } else {
                user.setRole("USER");
            }
        } else {
            // Nếu có gửi role thì ép kiểu hoa để lưu cho chuẩn (ADMIN/USER)
            user.setRole(request.getRole().toUpperCase());
        }

        User savedUser = userRepository.save(user);
        return modelMapper.map(savedUser, UserResponse.class);
    }
    @Override
    public List<UserResponse> findAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> modelMapper.map(user, UserResponse.class))
                .collect(Collectors.toList());
    }
    @Override
    @Transactional // Đảm bảo tính nhất quán khi xóa dữ liệu
    public void deleteUser(Long id) {
        // Kiểm tra xem user có tồn tại không trước khi xóa
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Người dùng không tồn tại với ID: " + id));

        userRepository.delete(user);
    }
    @Override
    public TokenResponse login(String loginIdentifier, String password) {
        // Tìm bằng username hoặc phone
        User user = userRepository.findByUsernameOrPhone(loginIdentifier)
                .orElseThrow(() -> new RuntimeException("Tài khoản không tồn tại"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Mật khẩu không chính xác");
        }

        // Tạo cặp AccessToken và RefreshToken
        String accessToken = jwtUtils.generateToken(user.getUsername(), user.getRole());
        String refreshToken = jwtUtils.generateRefreshToken(user.getUsername());

        return TokenResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .username(user.getUsername())
                .role(user.getRole())
                .build();
    }

    @Override
    public TokenResponse refreshToken(String refreshToken) {
        if (jwtUtils.validateToken(refreshToken)) {
            String username = jwtUtils.getUsernameFromToken(refreshToken);
            User user = userRepository.findByUsernameOrPhone(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            return TokenResponse.builder()
                    .accessToken(jwtUtils.generateToken(user.getUsername(), user.getRole()))
                    .refreshToken(refreshToken)
                    .username(user.getUsername())
                    .role(user.getRole())
                    .build();
        }
        throw new RuntimeException("Refresh Token không hợp lệ");
    }
}