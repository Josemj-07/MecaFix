package com.mecafix.application.auth.usecase.login;

public record LoginCommand(
        String email,
        String password) {
}
