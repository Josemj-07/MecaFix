package com.mecafix.adapter.out.persistence.mapper;

import com.mecafix.adapter.out.persistence.entity.*;
import com.mecafix.domain.model.contract.IPayable;
import com.mecafix.domain.model.entity.product.Product;
import com.mecafix.domain.model.entity.product.ProductDetail;
import com.mecafix.domain.model.entity.service.Service;
import com.mecafix.domain.model.entity.service.ServiceDetail;

public class PayablesMapper {

    public static IPayable toDomain(
            PayableJpa entity,
            Product product,
            Service service
    ) {

        if (entity == null) {
            return null;
        }

        if (entity instanceof ProductDetailJpaEntity productEntity) {
            return ProductDetailMapper.toDomain(productEntity, product);
        }

        if (entity instanceof ServiceDetailJpaEntity serviceEntity) {
            return ServiceDetailMapper.toDomain(serviceEntity, service);
        }

        throw new IllegalArgumentException("Unknown PayableJpa type: " + entity.getClass());
    }

    public static PayableJpa toPersistence(
            IPayable domain,
            ProductJpaEntity productJpa,
            ServiceJpaEntity serviceJpa,
            QuoteJpaEntity quoteJpa
    ) {

        if (domain == null) {
            return null;
        }

        if (domain instanceof ProductDetail productDetail) {
            return ProductDetailMapper.toPersistence(
                    productDetail,
                    productJpa,
                    quoteJpa
            );
        }

        if (domain instanceof ServiceDetail serviceDetail) {
            return ServiceDetailMapper.toPersistence(
                    serviceDetail,
                    serviceJpa,
                    quoteJpa
            );
        }

        throw new IllegalArgumentException("Unknown IPayable type: " + domain.getClass());
    }
}