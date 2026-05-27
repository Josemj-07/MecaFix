package com.mecafix.application.auth.usecase.register;

import java.util.UUID;

public record RegisterUserResult(
        UUID id,
        String email,
        String name,
        String role) {
}
