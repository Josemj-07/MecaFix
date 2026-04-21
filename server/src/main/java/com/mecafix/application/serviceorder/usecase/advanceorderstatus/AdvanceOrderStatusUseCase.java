package com.mecafix.application.serviceorder.usecase.advanceorderstatus;

import com.mecafix.application.serviceorder.mapper.ServiceOrderMapper;
import com.mecafix.application.serviceorder.port.out.ServiceOrderRepositoryPort;
import com.mecafix.domain.model.entity.order.ServiceOrder;
import com.mecafix.shared.exceptions.ServiceOrderNotFoundException;

import java.util.UUID;

public class AdvanceOrderStatusService implements AdvanceOrderStatusUseCase {

    private final ServiceOrderRepositoryPort serviceOrderRepository;

    public AdvanceOrderStatusService(ServiceOrderRepositoryPort serviceOrderRepository) {
        this.serviceOrderRepository = serviceOrderRepository;
    }

    @Override
    public AdvanceOrderStatusResult execute(AdvanceOrderStatusCommand command) {
        ServiceOrder serviceOrder = serviceOrderRepository.findById(UUID.fromString(command.serviceOrderId()))
                .orElseThrow(() -> new ServiceOrderNotFoundException("Service order not found with id " + command.serviceOrderId()));

        serviceOrder.advanceOrderStatus();

        serviceOrderRepository.save(serviceOrder);

        return ServiceOrderMapper.toAdvanceStatusResult(serviceOrder);
    }
}
