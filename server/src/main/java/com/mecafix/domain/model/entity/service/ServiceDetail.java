package com.mecafix.domain.model.entity.service;

import com.mecafix.domain.exceptions.InvalidServiceException;
import com.mecafix.domain.model.contract.IPayable;

import java.math.BigDecimal;
import java.util.UUID;

public class ServiceDetail implements IPayable {
    private final UUID id;
    private final Service service;
    private final BigDecimal appliedLaborPrice;

    public static ServiceDetail create(Service service){return new ServiceDetail(service);}

    public static ServiceDetail reBuild(String id, Service service){return new ServiceDetail(id, service);}

    private ServiceDetail(Service service) {
        if (service == null) {
            throw new InvalidServiceException("Service must not be null");
        }
        this.id = UUID.randomUUID();
        this.service = service;
        this.appliedLaborPrice = service.getLaborPrice();
    }

    private ServiceDetail(String id, Service service) {
        if (service == null) {
            throw new InvalidServiceException("Service must not be null");
        }
        if(id == null) {
            throw new InvalidServiceException("id must not be null");
        }
        this.id = UUID.fromString(id);
        this.service = service;
        this.appliedLaborPrice = service.getLaborPrice();
    }

    public UUID getId(){return this.id;}
    public Service getService() {
        return service;
    }
    public BigDecimal getAppliedLaborPrice(){return this.appliedLaborPrice;}

    @Override
    public BigDecimal calculateSubTotal() {
        return appliedLaborPrice;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ServiceDetail)) return false;
        ServiceDetail that = (ServiceDetail) o;
        return this.id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }

}
