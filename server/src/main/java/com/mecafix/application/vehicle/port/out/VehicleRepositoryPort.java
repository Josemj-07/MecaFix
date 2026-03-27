package com.mecafix.application.vehicle.port.out;

import com.mecafix.domain.model.entity.vehicle.Vehicle;

public interface VehicleRepositoryPort {
    void save(Vehicle vehicle);
    boolean existsByPlate(String plate);
}
