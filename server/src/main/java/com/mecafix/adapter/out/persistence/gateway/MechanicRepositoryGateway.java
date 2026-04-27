package com.mecafix.adapter.out.persistence.gateway;

import com.mecafix.adapter.out.persistence.mapper.MechanicMapper;
import com.mecafix.adapter.out.persistence.repository.MechanicJpaRepository;
import com.mecafix.domain.model.entity.person.Mechanic;
import com.mecafix.domain.model.enums.Specialty;
import com.mecafix.domain.port.mechanic.MechanicRepositoryPort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
@RequiredArgsConstructor
public class MechanicRepositoryGateway implements MechanicRepositoryPort {

    private final MechanicJpaRepository mechanicJpaRepository;

    @Override
    public void save(Mechanic mechanic) {
        mechanicJpaRepository.save(MechanicMapper.toPersistence(mechanic));
    }

    @Override
    public boolean existsByDni(String dni) {
        return mechanicJpaRepository.existsByDni(dni);
    }

    @Override
    public Optional<Mechanic> findById(UUID id) {
        return mechanicJpaRepository.findById(id)
                .map(MechanicMapper::toDomain);
    }

    @Override
    public List<Mechanic> findAll() {
        return mechanicJpaRepository.findAll().stream()
                .map(MechanicMapper::toDomain)
                .toList();
    }

    @Override
    public List<Mechanic> findBySpecialty(Specialty specialty) {
        return mechanicJpaRepository.findBySpecialty(specialty).stream()
                .map(MechanicMapper::toDomain)
                .toList();
    }
}
