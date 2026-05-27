package com.mecafix.adapter.out.persistence.mapper;

import com.mecafix.adapter.out.persistence.entity.ServiceJpaEntity;
import com.mecafix.domain.model.entity.service.Service;

public class ServiceMapper {
    public static ServiceJpaEntity toPersistence(Service service) {
        return new ServiceJpaEntity(service.getId(), service.getName(), service.getDescription(), service.getLaborPrice());
    }

    public static Service toDomain(ServiceJpaEntity serviceJpaEntity) {
        return Service.reBuild(serviceJpaEntity.getId(), serviceJpaEntity.getName(), serviceJpaEntity.getDescription(), serviceJpaEntity.getLaborPrice());
    }
}
