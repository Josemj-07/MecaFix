package com.mecafix.application.customer.usecase.getcustomervehicles;

import java.util.UUID;

public record VehicleResult(
        UUID id,
        String plate,
        String brand,
        String model,
        int manufacturingYear,
        Long mileage,
        String color
) { }
