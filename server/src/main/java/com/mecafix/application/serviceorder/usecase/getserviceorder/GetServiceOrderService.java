package com.mecafix.application.serviceorder.usecase.getserviceorder;

import com.mecafix.application.serviceorder.mapper.ServiceOrderMapper;
import com.mecafix.application.serviceorder.port.out.ServiceOrderRepositoryPort;
import com.mecafix.domain.model.entity.order.ServiceOrder;
import com.mecafix.shared.exceptions.ServiceOrderNotFoundException;

import java.util.UUID;

public class GetServiceOrderService implements GetServiceOrderUseCase {

    private final ServiceOrderRepositoryPort serviceOrderRepository;

    public GetServiceOrderService(ServiceOrderRepositoryPort serviceOrderRepository) {
        this.serviceOrderRepository = serviceOrderRepository;
    }

    @Override
    public GetServiceOrderResult execute(GetServiceOrderCommand command) {
        ServiceOrder serviceOrder = serviceOrderRepository.findById(UUID.fromString(command.serviceOrderId()))
                .orElseThrow(() -> new ServiceOrderNotFoundException("Service order not found with id " + command.serviceOrderId()));

        return ServiceOrderMapper.toGetResult(serviceOrder);
    }
}
