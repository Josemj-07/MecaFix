package com.mecafix.application.mechanic.usecase.createmechanic;

import java.util.UUID;

public record CreateMechanicResult(
        UUID id,
        String firstName,
        String lastName,
        String email,
        String specialty) {
}
