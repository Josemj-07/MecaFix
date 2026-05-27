package com.mecafix.application.service.usecase.listservices;

import com.mecafix.application.service.mapper.ServiceMapper;
import com.mecafix.domain.model.entity.service.Service;
import com.mecafix.domain.port.service.ServiceRepositoryPort;

import java.util.List;

public class ListServicesUseCase {

    private final ServiceRepositoryPort serviceRepository;

    public ListServicesUseCase(ServiceRepositoryPort serviceRepository) {
        this.serviceRepository = serviceRepository;
    }


    public ListServicesResult execute(ListServicesCommand command) {

        List<Service> services = serviceRepository.findAll();

        return ServiceMapper.toListResult(services);
    }
}
