package com.mecafix.application.vehicle.mapper;

import com.mecafix.application.vehicle.usecase.register.RegisterVehicleResult;
import com.mecafix.application.vehicle.usecase.update.UpdateVehicleResult;
import com.mecafix.domain.model.entity.vehicle.Vehicle;

public class VehicleMapper {

    private VehicleMapper() { }

    public static RegisterVehicleResult toResult(Vehicle vehicle) {
        return new RegisterVehicleResult(
                vehicle.getId(),
                vehicle.getPlate(),
                vehicle.getBrand(),
                vehicle.getModel(),
                vehicle.getManufacturingYear(),
                vehicle.getMileage(),
                vehicle.getColor()
        );
    }

    public static UpdateVehicleResult toUpdateResult(Vehicle vehicle) {
        return new UpdateVehicleResult(
                vehicle.getId(),
                vehicle.getPlate(),
                vehicle.getBrand(),
                vehicle.getModel(),
                vehicle.getManufacturingYear(),
                vehicle.getMileage(),
                vehicle.getColor()
        );
    }

}
