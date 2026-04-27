package com.mecafix.adapter.out.persistence.gateway;

import com.mecafix.adapter.out.persistence.mapper.CustomerMapper;
import com.mecafix.adapter.out.persistence.mapper.VehicleMapper;
import com.mecafix.adapter.out.persistence.repository.CustomerJpaRepository;
import com.mecafix.domain.model.entity.person.Customer;
import com.mecafix.domain.port.customer.CustomerRepositoryPort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
@RequiredArgsConstructor
public class CustomerRepositoryGateway implements CustomerRepositoryPort {

    private final CustomerJpaRepository customerJpaRepository;

    @Override
    public void save(Customer customer) {
        var customerJpa = CustomerMapper.toPersistence(customer, new java.util.ArrayList<>());
        var vehiclesJpa = VehicleMapper.toJpaList(customer.getVehicles(), customerJpa);
        customerJpa.getVehicles().clear();
        customerJpa.getVehicles().addAll(vehiclesJpa);
        customerJpaRepository.save(customerJpa);
    }

    @Override
    public Optional<Customer> findById(UUID id) {
        return customerJpaRepository.findById(id)
                .map(entity -> {
                    var vehicles = VehicleMapper.toDomainList(entity.getVehicles());
                    return CustomerMapper.toDomain(entity, vehicles);
                });
    }

    @Override
    public List<Customer> findAll() {
        return customerJpaRepository.findAll().stream()
                .map(entity -> {
                    var vehicles = VehicleMapper.toDomainList(entity.getVehicles());
                    return CustomerMapper.toDomain(entity, vehicles);
                })
                .toList();
    }
}
