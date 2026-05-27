package com.mecafix.adapter.out.persistence.mapper;

import com.mecafix.adapter.out.persistence.entity.CustomerJpaEntity;
import com.mecafix.adapter.out.persistence.entity.VehicleJpaEntity;
import com.mecafix.domain.model.entity.vehicle.Vehicle;

import java.util.List;

public class VehicleMapper {
    public static VehicleJpaEntity toPersistence(Vehicle vehicle, CustomerJpaEntity customerJpa) {
        return new VehicleJpaEntity(vehicle.getId(), vehicle.getPlate(),
                vehicle.getBrand(), vehicle.getModel(),(long) vehicle.getManufacturingYear(), vehicle.getMileage(),
                vehicle.getColor(), customerJpa
        );
    }

    public static Vehicle toDomain(VehicleJpaEntity vehicleJpaEntity) {
        return Vehicle.reBuild(vehicleJpaEntity.getId(), vehicleJpaEntity.getPlate(),
                vehicleJpaEntity.getBrand(), vehicleJpaEntity.getModel(), (int)vehicleJpaEntity.getManufacturingYear(),
                vehicleJpaEntity.getMileage(), vehicleJpaEntity.getColor());
    }

    public static List<Vehicle> toDomainList(List<VehicleJpaEntity> entities) {
        if (entities == null) return List.of();

        return entities.stream()
                .map(VehicleMapper::toDomain)
                .toList();
    }

    public static List<VehicleJpaEntity> toJpaList(List<Vehicle> vehicles, CustomerJpaEntity customer) {
        if (vehicles == null) return List.of();

        return vehicles.stream()
                .map(v -> toPersistence(v, customer))
                .toList();
    }
}
