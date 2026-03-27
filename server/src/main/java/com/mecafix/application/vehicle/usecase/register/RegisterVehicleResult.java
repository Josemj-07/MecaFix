package com.mecafix.application.vehicle.usecase.register;

import java.util.UUID;

public record RegisterVehicleResult(
        UUID id,
        String plate,
        String brand,
        String model,
        int manufacturingYear,
        Long mileage,
        String color
) { }
