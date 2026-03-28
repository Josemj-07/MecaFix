package com.mecafix.application.service.usecase.getservice;

import com.mecafix.application.service.mapper.ServiceMapper;
import com.mecafix.application.service.port.out.ServiceRepositoryPort;
import com.mecafix.domain.model.entity.service.Service;
import com.mecafix.shared.exceptions.ServiceNotFoundException;

import java.util.UUID;

public class GetServiceService implements GetServiceUseCase {

    private final ServiceRepositoryPort serviceRepository;

    public GetServiceService(ServiceRepositoryPort serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    @Override
    public GetServiceResult execute(GetServiceCommand command) {

        Service service = serviceRepository.findById(UUID.fromString(command.serviceId()))
                .orElseThrow(() -> new ServiceNotFoundException("Service not found with id " + command.serviceId()));

        return ServiceMapper.toGetResult(service);
    }
}
