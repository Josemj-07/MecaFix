package com.mecafix.adapter.out.persistence.mapper;

import com.mecafix.adapter.out.persistence.entity.QuoteJpaEntity;
import com.mecafix.adapter.out.persistence.entity.ServiceOrderJpaEntity;
import com.mecafix.domain.model.entity.order.ServiceOrder;
import com.mecafix.domain.model.entity.order.Task;
import com.mecafix.domain.model.entity.quote.Quote;

import java.util.List;

public class ServiceOrderMapper {

    public static ServiceOrderJpaEntity toPersistence(ServiceOrder serviceOrder, QuoteJpaEntity quoteJpaEntity) {
        return new ServiceOrderJpaEntity(
                serviceOrder.getId(), serviceOrder.getOrderStatus(),
                serviceOrder.getCreationDate(), quoteJpaEntity
        );
    }

    public static ServiceOrder toDomain(ServiceOrderJpaEntity serviceOrderJpaEntity, Quote quote, List<Task> tasks) {
        return ServiceOrder.reBuild(
                serviceOrderJpaEntity.getId(), quote, tasks,
                serviceOrderJpaEntity.getOrderStatus(), serviceOrderJpaEntity.getCreationDate()
        );
    }
}
