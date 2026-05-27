package com.mecafix.application.service.usecase.getservice;

import com.mecafix.application.service.mapper.ServiceMapper;
import com.mecafix.domain.model.entity.service.Service;
import com.mecafix.application.exceptions.ServiceNotFoundException;
import com.mecafix.domain.port.service.ServiceRepositoryPort;

import java.util.UUID;

public class GetServiceUseCase {

    private final ServiceRepositoryPort serviceRepository;

    public GetServiceUseCase(ServiceRepositoryPort serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    public GetServiceResult execute(GetServiceCommand command) {

        Service service = serviceRepository.findById(UUID.fromString(command.serviceId()))
                .orElseThrow(() -> new ServiceNotFoundException("Service not found with id " + command.serviceId()));

        return ServiceMapper.toGetResult(service);
    }
}
