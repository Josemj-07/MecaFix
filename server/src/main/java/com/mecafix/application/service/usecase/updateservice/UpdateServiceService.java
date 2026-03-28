package com.mecafix.application.service.usecase.updateservice;

import com.mecafix.application.service.mapper.ServiceMapper;
import com.mecafix.application.service.port.out.ServiceRepositoryPort;
import com.mecafix.domain.model.entity.service.Service;
import com.mecafix.shared.exceptions.ServiceNotFoundException;

import java.util.UUID;

public class UpdateServiceService implements UpdateServiceUseCase {

    private final ServiceRepositoryPort serviceRepository;

    public UpdateServiceService(ServiceRepositoryPort serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    @Override
    public UpdateServiceResult execute(UpdateServiceCommand command) {

        Service service = serviceRepository.findById(UUID.fromString(command.serviceId()))
                .orElseThrow(() -> new ServiceNotFoundException("Service not found with id " + command.serviceId()));

        if (command.description() != null) service.changeDescription(command.description());

        serviceRepository.save(service);

        return ServiceMapper.toUpdateResult(service);
    }
}
