package com.mecafix.domain.port.serviceorder;

import com.mecafix.domain.model.entity.order.ServiceOrder;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ServiceOrderRepositoryPort {
    void save(ServiceOrder serviceOrder);

    Optional<ServiceOrder> findById(UUID id);

    List<ServiceOrder> findAll();
}
