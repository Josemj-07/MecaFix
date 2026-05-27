package com.mecafix.application.mechanic.usecase.getmechanic;

import java.util.UUID;

public record GetMechanicResult(
        UUID id,
        String firstName,
        String lastName,
        String email,
        String mobilePhone,
        String specialty) {
}
