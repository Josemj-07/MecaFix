package com.mecafix.application.service.port.out;

import com.mecafix.domain.model.entity.service.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ServiceRepositoryPort {
    void save(Service service);

    Optional<Service> findById(UUID id);

    List<Service> findAll();
}
