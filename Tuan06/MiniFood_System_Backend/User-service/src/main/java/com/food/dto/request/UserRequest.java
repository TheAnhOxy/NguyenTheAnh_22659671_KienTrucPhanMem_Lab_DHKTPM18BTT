package com.food.dto.request;

import lombok.Data;

@Data
public class UserRequest {

    private Long id;
    private String username;
    private String password;
    private String fullName;
    private String phone;
    private String address;
    private String role;

}
