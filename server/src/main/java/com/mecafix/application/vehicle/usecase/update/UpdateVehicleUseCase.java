package com.mecafix.application.vehicle.usecase.update;

import com.mecafix.application.vehicle.mapper.VehicleMapper;

import com.mecafix.domain.model.entity.vehicle.Vehicle;
import com.mecafix.domain.port.vehicle.VehicleRepositoryPort;
import com.mecafix.application.exceptions.VehicleNotFoundException;

import java.util.UUID;

//service
public class UpdateVehicleUseCase {

    private final VehicleRepositoryPort vehicleRepository;

    public UpdateVehicleUseCase(VehicleRepositoryPort vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    public UpdateVehicleResult execute(UpdateVehicleCommand command) {

        Vehicle vehicle = vehicleRepository.findById(UUID.fromString(command.vehicleId()))
                .orElseThrow(() -> new VehicleNotFoundException("Vehicle not found with id " + command.vehicleId()));

        if (command.mileage() != null) {
            vehicle.changeMileage(command.mileage());
        }
        if (command.color() != null) {
            vehicle.setColor(command.color());
        }

        vehicleRepository.save(vehicle);

        return VehicleMapper.toUpdateResult(vehicle);
    }

}
