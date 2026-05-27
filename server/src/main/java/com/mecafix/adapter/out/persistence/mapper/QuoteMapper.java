package com.mecafix.adapter.out.persistence.mapper;

import com.mecafix.adapter.out.persistence.entity.*;
import com.mecafix.domain.model.contract.IPayable;
import com.mecafix.domain.model.entity.person.Customer;
import com.mecafix.domain.model.entity.quote.Quote;
import com.mecafix.domain.model.entity.vehicle.Vehicle;

import java.util.List;

public class QuoteMapper {
    public static QuoteJpaEntity toPersistence(Quote quote, VehicleJpaEntity vehicle, List<ProductDetailJpaEntity> productDetail, List<ServiceDetailJpaEntity> serviceDetail) {
        return new QuoteJpaEntity(
                quote.getId(), vehicle, quote.getStatus(), quote.getTotalAmount(),
                quote.getCreatedDate(), productDetail, serviceDetail
        );
    }

    public static Quote toDomain(QuoteJpaEntity quoteJpaEntity, Customer customer, Vehicle vehicle, List<IPayable> Ipayable) {
        return Quote.reBuild(quoteJpaEntity.getId(), customer, vehicle, Ipayable, quoteJpaEntity.getOrderStatus(), quoteJpaEntity.getCreationDate());
    }



}
