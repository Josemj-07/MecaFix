package com.mecafix.application.service.usecase.createservice;

import com.mecafix.application.service.mapper.ServiceMapper;
import com.mecafix.domain.model.entity.service.Service;
import com.mecafix.domain.port.service.ServiceRepositoryPort;

public class CreateServiceUseCase {

    private final ServiceRepositoryPort serviceRepository;

    public CreateServiceUseCase(ServiceRepositoryPort serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    public CreateServiceResult execute(CreateServiceCommand command) {

        Service service = Service.create(
                command.name(),
                command.description(),
                command.laborPrice());

        serviceRepository.save(service);

        return ServiceMapper.toCreateResult(service);
    }
}
