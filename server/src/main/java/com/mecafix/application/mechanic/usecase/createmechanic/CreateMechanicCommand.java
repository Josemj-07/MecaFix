package com.mecafix.application.mechanic.usecase.createmechanic;

public record CreateMechanicCommand(
        String firstName,
        String lastName,
        String email,
        String mobilePhone,
        String nationalId,
        String specialty) {
}
