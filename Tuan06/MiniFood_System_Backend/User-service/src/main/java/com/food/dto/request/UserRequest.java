package com.food.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class UserRequest {

    private Long id;
    @JsonProperty("login")
    private String username;
    private String password;
    private String fullName;
    private String phone;
    private String address;
    private String role;

}
