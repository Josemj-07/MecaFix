package com.mecafix.application.serviceorder.usecase.getserviceorder;

import com.mecafix.application.serviceorder.mapper.ServiceOrderMapper;
import com.mecafix.domain.model.entity.order.ServiceOrder;
import com.mecafix.application.exceptions.ServiceOrderNotFoundException;
import com.mecafix.domain.port.serviceorder.ServiceOrderRepositoryPort;

import java.util.UUID;

public class GetServiceOrderUseCase {

    private final ServiceOrderRepositoryPort serviceOrderRepository;

    public GetServiceOrderUseCase(ServiceOrderRepositoryPort serviceOrderRepository) {
        this.serviceOrderRepository = serviceOrderRepository;
    }

    public GetServiceOrderResult execute(GetServiceOrderCommand command) {
        ServiceOrder serviceOrder = serviceOrderRepository.findById(UUID.fromString(command.serviceOrderId()))
                .orElseThrow(() -> new ServiceOrderNotFoundException("Service order not found with id " + command.serviceOrderId()));

        return ServiceOrderMapper.toGetResult(serviceOrder);
    }
}
