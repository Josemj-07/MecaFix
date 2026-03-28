package com.mecafix.application.mechanic.port.out;

import com.mecafix.domain.model.entity.person.Mechanic;
import com.mecafix.domain.model.enums.Specialty;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface MechanicRepositoryPort {
    void save(Mechanic mechanic);

    boolean existsByDni(String dni);

    Optional<Mechanic> findById(UUID id);

    List<Mechanic> findAll();

    List<Mechanic> findBySpecialty(Specialty specialty);
}
