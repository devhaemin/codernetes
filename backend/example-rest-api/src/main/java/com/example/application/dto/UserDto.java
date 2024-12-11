package com.example.application.dto;

import lombok.Data;

@Data
public class UserDto {
    private String email;
    private String username;
    private String password;
}

@Data
public class LoginRequest {
    private String email;
    private String password;
}

@Data
public class LoginResponse {
    private String token;
    private String username;
} 