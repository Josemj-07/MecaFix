package com.mecafix.application.vehicle.usecase.update;

import java.util.UUID;

public record UpdateVehicleResult(
        UUID id,
        String plate,
        String brand,
        String model,
        int manufacturingYear,
        Long mileage,
        String color
) { }
