package com.mecafix.domain.port.customer;

import com.mecafix.domain.model.entity.person.Customer;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CustomerRepositoryPort {
    void save(Customer customer);

    Optional<Customer> findById(UUID id);

    List<Customer> findAll();
}
