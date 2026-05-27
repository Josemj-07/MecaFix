package com.mecafix.application.mechanic.usecase.listmechanics;

import java.util.List;
import java.util.UUID;

public record ListMechanicsResult(
        List<MechanicResult> mechanics) {
    public record MechanicResult(
            UUID id,
            String firstName,
            String lastName,
            String specialty,
            String dni) {
    }
}
