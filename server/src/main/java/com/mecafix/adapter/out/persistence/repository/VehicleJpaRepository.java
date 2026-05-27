package com.mecafix.adapter.out.persistence.repository;

import com.mecafix.adapter.out.persistence.entity.VehicleJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface VehicleJpaRepository extends JpaRepository<VehicleJpaEntity, UUID> {
    boolean existsByPlate(String plate);
}