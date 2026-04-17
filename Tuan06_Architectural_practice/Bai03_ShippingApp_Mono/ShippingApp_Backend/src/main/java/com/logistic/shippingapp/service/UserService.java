package com.logistic.shippingapp.service;

import com.logistic.shippingapp.entity.User;

public interface UserService {

    User login(String username, String password);
    User register(User user);
}
