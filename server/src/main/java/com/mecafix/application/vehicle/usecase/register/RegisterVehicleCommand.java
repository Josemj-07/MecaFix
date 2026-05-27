package com.mecafix.application.vehicle.usecase.register;

public record RegisterVehicleCommand(
        String customerId,
        String plate,
        String brand,
        String model,
        int manufacturingYear,
        Long mileage,
        String color
) { }
