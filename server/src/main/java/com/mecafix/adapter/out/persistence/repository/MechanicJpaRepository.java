package com.mecafix.adapter.out.persistence.repository;

import com.mecafix.adapter.out.persistence.entity.MechanicJpaEntity;
import com.mecafix.domain.model.enums.Specialty;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface MechanicJpaRepository extends JpaRepository<MechanicJpaEntity, UUID> {
    boolean existsByDni(String dni);
    List<MechanicJpaEntity> findBySpecialty(Specialty specialty);
}