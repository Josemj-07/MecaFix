package com.mecafix.domain.port.vehicle;

import com.mecafix.domain.model.entity.vehicle.Vehicle;

import java.util.Optional;
import java.util.UUID;

public interface VehicleRepositoryPort {
    void save(Vehicle vehicle);
    boolean existsByPlate(String plate);
    Optional<Vehicle> findById(UUID id);
}
