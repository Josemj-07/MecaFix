package com.mecafix.application.serviceorder.usecase.listserviceorders;

import com.mecafix.application.serviceorder.mapper.ServiceOrderMapper;
import com.mecafix.application.serviceorder.port.out.ServiceOrderRepositoryPort;
import com.mecafix.domain.model.entity.order.ServiceOrder;

import java.util.List;

public class ListServiceOrdersService implements ListServiceOrdersUseCase {

    private final ServiceOrderRepositoryPort serviceOrderRepository;

    public ListServiceOrdersService(ServiceOrderRepositoryPort serviceOrderRepository) {
        this.serviceOrderRepository = serviceOrderRepository;
    }

    @Override
    public ListServiceOrdersResult execute(ListServiceOrdersCommand command) {
        List<ServiceOrder> serviceOrders = serviceOrderRepository.findAll();

        return ServiceOrderMapper.toListResult(serviceOrders);
    }
}
