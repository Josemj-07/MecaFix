package com.mecafix.adapter.out.persistence.gateway;

import com.mecafix.adapter.out.persistence.mapper.VehicleMapper;
import com.mecafix.adapter.out.persistence.repository.VehicleJpaRepository;
import com.mecafix.domain.model.entity.vehicle.Vehicle;
import com.mecafix.domain.port.vehicle.VehicleRepositoryPort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
@RequiredArgsConstructor
public class VehicleRepositoryGateway implements VehicleRepositoryPort {

    private final VehicleJpaRepository vehicleJpaRepository;

    @Override
    public void save(Vehicle vehicle) {
        // Vehicle is saved via Customer cascade (CascadeType.ALL).
        // This standalone save is kept for interface compliance but may result
        // in a detached entity if called without a customer context.
        if (vehicleJpaRepository.existsById(vehicle.getId())) {
            vehicleJpaRepository.save(VehicleMapper.toPersistence(vehicle, null));
        }
        // New vehicles are persisted through customerRepository.save() cascade
    }

    @Override
    public boolean existsByPlate(String plate) {
        return vehicleJpaRepository.existsByPlate(plate);
    }

    @Override
    public Optional<Vehicle> findById(UUID id) {
        return vehicleJpaRepository.findById(id)
                .map(VehicleMapper::toDomain);
    }
}
