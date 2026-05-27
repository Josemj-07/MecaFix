package com.mecafix.adapter.out.persistence.mapper;

import com.mecafix.adapter.out.persistence.entity.QuoteJpaEntity;
import com.mecafix.adapter.out.persistence.entity.ServiceDetailJpaEntity;
import com.mecafix.adapter.out.persistence.entity.ServiceJpaEntity;
import com.mecafix.domain.model.entity.service.Service;
import com.mecafix.domain.model.entity.service.ServiceDetail;

public class ServiceDetailMapper {
    public static ServiceDetailJpaEntity toPersistence(ServiceDetail serviceDetail, ServiceJpaEntity serviceJpaEntity, QuoteJpaEntity quoteJpaEntity) {
        return new ServiceDetailJpaEntity(
                serviceDetail.getId(), serviceDetail.getAppliedLaborPrice(),
                serviceJpaEntity, quoteJpaEntity
        );
    }

    public static ServiceDetail toDomain(ServiceDetailJpaEntity serviceDetailJpaEntity, Service service) {
        return ServiceDetail.reBuild(serviceDetailJpaEntity.getId(), service);
    }
}
