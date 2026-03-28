package com.mecafix.application.service.usecase.listservices;

import com.mecafix.application.service.mapper.ServiceMapper;
import com.mecafix.application.service.port.out.ServiceRepositoryPort;
import com.mecafix.domain.model.entity.service.Service;

import java.util.List;

public class ListServicesService implements ListServicesUseCase {

    private final ServiceRepositoryPort serviceRepository;

    public ListServicesService(ServiceRepositoryPort serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    @Override
    public ListServicesResult execute(ListServicesCommand command) {

        List<Service> services = serviceRepository.findAll();

        return ServiceMapper.toListResult(services);
    }
}
