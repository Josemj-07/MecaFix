package com.mecafix.adapter.out.persistence.mapper;

import com.mecafix.adapter.out.persistence.entity.CustomerJpaEntity;
import com.mecafix.adapter.out.persistence.entity.VehicleJpaEntity;
import com.mecafix.domain.model.entity.person.Customer;
import com.mecafix.domain.model.entity.vehicle.Vehicle;

import java.util.List;

public class CustomerMapper {
    public static CustomerJpaEntity toPersistence(Customer customer, List<VehicleJpaEntity> vehiclesJpa) {
        return new CustomerJpaEntity(customer.getId(), customer.getFirstName(), customer.getLastName(),
                customer.getEmail().address(), customer.getMobilePhone().mobilePhone(), customer.getDni().dni(), vehiclesJpa);
    }

    public static Customer toDomain(CustomerJpaEntity customerJpaEntity, List<Vehicle> vehicles) {
        return Customer.reBuild(customerJpaEntity.getId(), customerJpaEntity.getFirstName(),
                customerJpaEntity.getLastName(), customerJpaEntity.getEmail(),
                customerJpaEntity.getMobilePhone(), customerJpaEntity.getDni(),vehicles
                ) ;
    }
}