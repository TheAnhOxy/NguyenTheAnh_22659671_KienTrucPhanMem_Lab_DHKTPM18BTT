package com.logistic.shippingapp.service.impl;

import com.logistic.shippingapp.entity.User;
import com.logistic.shippingapp.repository.UserRepository;
import com.logistic.shippingapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {


    private final UserRepository userRepository;

    public User login(String username, String password) {
        return userRepository.findByUsername(username)
                .filter(user -> user.getPassword().equals(password))
                .orElse(null);
    }

    public User register(User user) {
        return userRepository.save(user);
    }

}
