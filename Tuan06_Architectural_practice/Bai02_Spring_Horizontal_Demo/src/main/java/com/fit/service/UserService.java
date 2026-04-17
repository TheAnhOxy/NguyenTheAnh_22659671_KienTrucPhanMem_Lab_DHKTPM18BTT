package com.fit.service;

import com.fit.Entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void saveUser(User user) {
        if ("male".equalsIgnoreCase(user.getGender())) {
            jdbcTemplate.update(
                    "INSERT INTO user_male(name, gender) VALUES (?, ?)",
                    user.getName(), user.getGender()
            );
        } else {
            jdbcTemplate.update(
                    "INSERT INTO user_female(name, gender) VALUES (?, ?)",
                    user.getName(), user.getGender()
            );
        }
    }
}