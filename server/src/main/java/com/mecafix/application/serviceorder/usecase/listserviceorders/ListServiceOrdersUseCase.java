package com.mecafix.application.serviceorder.usecase.listserviceorders;

import com.mecafix.application.serviceorder.mapper.ServiceOrderMapper;
import com.mecafix.domain.model.entity.order.ServiceOrder;
import com.mecafix.domain.port.serviceorder.ServiceOrderRepositoryPort;

import java.util.List;

public class ListServiceOrdersUseCase {

    private final ServiceOrderRepositoryPort serviceOrderRepository;

    public ListServiceOrdersUseCase(ServiceOrderRepositoryPort serviceOrderRepository) {
        this.serviceOrderRepository = serviceOrderRepository;
    }

    public ListServiceOrdersResult execute(ListServiceOrdersCommand command) {
        List<ServiceOrder> serviceOrders = serviceOrderRepository.findAll();

        return ServiceOrderMapper.toListResult(serviceOrders);
    }
}
