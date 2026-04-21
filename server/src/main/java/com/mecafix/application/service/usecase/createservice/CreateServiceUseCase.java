package com.mecafix.application.service.usecase.createservice;

import com.mecafix.application.service.mapper.ServiceMapper;
import com.mecafix.application.service.port.out.ServiceRepositoryPort;
import com.mecafix.domain.model.entity.service.Service;

public class CreateServiceService implements CreateServiceUseCase {

    private final ServiceRepositoryPort serviceRepository;

    public CreateServiceService(ServiceRepositoryPort serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    @Override
    public CreateServiceResult execute(CreateServiceCommand command) {

        Service service = Service.create(
                command.name(),
                command.description(),
                command.laborPrice());

        serviceRepository.save(service);

        return ServiceMapper.toCreateResult(service);
    }
}
