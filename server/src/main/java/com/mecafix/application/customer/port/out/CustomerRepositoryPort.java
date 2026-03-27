package com.mecafix.application.customer.port.out;


import com.mecafix.domain.model.entity.person.Customer;

import java.util.Optional;
import java.util.UUID;

public interface CustomerRepositoryPort {
    Optional<Customer> findById(UUID id);
    void save(Customer customer);
}
