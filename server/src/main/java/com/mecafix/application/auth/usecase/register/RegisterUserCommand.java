package com.mecafix.application.auth.usecase.register;

public record RegisterUserCommand(
        String email,
        String password,
        String name,
        String role) {
}
