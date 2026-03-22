package com.mecafix.domain.model.valueobject;

import com.mecafix.shared.exceptions.InvalidServiceException;

import java.math.BigDecimal;

public class ServiceDetail {

    private final Service service;
    private final BigDecimal appliedLaborPrice;

    public ServiceDetail(Service service) {
        if (service == null) {
            throw new InvalidServiceException("Service must not be null");
        }
        this.service = service;
        this.appliedLaborPrice = service.getLaborPrice();
    }

    public Service getService() {
        return service;
    }

    public BigDecimal getAppliedLaborPrice() {
        return appliedLaborPrice;
    }

    public BigDecimal calculateSubTotal() {
        return appliedLaborPrice;
    }

}
