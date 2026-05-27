package com.mecafix.application.auth.usecase.login;

public record LoginResult(
        String token,
        String id,
        String email,
        String firstName,
        String lastName,
        String role) {
}
