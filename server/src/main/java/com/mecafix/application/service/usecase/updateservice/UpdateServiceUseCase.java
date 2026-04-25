package com.mecafix.application.service.usecase.updateservice;

import com.mecafix.application.service.mapper.ServiceMapper;
import com.mecafix.domain.model.entity.service.Service;
import com.mecafix.application.exceptions.ServiceNotFoundException;
import com.mecafix.domain.port.service.ServiceRepositoryPort;

import java.util.UUID;

public class UpdateServiceUseCase {

    private final ServiceRepositoryPort serviceRepository;

    public UpdateServiceUseCase(ServiceRepositoryPort serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    public UpdateServiceResult execute(UpdateServiceCommand command) {

        Service service = serviceRepository.findById(UUID.fromString(command.serviceId()))
                .orElseThrow(() -> new ServiceNotFoundException("Service not found with id " + command.serviceId()));

        if (command.description() != null) service.changeDescription(command.description());

        serviceRepository.save(service);

        return ServiceMapper.toUpdateResult(service);
    }
}
