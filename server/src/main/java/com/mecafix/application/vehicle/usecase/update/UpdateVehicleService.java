package com.mecafix.application.vehicle.usecase.update;

import com.mecafix.application.vehicle.mapper.VehicleMapper;
import com.mecafix.application.vehicle.port.out.VehicleRepositoryPort;
import com.mecafix.domain.model.entity.vehicle.Vehicle;
import com.mecafix.shared.exceptions.VehicleNotFoundException;

import java.util.UUID;

//service
public class UpdateVehicleService implements UpdateVehicleUseCase {

    private final VehicleRepositoryPort vehicleRepository;

    public UpdateVehicleService(VehicleRepositoryPort vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    @Override
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
