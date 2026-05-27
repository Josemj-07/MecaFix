package com.mecafix.application.vehicle.usecase.update;

public record UpdateVehicleCommand(
        String vehicleId,
        Long mileage,
        String color
) { }
