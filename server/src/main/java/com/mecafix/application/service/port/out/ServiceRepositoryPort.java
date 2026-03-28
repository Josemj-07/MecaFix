package com.mecafix.application.service.port.out;

import com.mecafix.domain.model.entity.service.Service;

import java.util.Optional;
import java.util.UUID;

public interface ServiceRepositoryPort {
    Optional<Service> findById(UUID id);
}
