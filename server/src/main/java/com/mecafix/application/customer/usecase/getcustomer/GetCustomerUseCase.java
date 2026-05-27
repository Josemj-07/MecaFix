package com.mecafix.application.customer.usecase.getcustomer;

import com.mecafix.application.customer.mapper.CustomerMapper;

import com.mecafix.domain.model.entity.person.Customer;
import com.mecafix.domain.port.customer.CustomerRepositoryPort;
import com.mecafix.application.exceptions.CustomerNotFoundException;

import java.util.UUID;

public class GetCustomerUseCase {

    private final CustomerRepositoryPort customerRepository;

    public GetCustomerUseCase(CustomerRepositoryPort customerRepository) {
        this.customerRepository = customerRepository;
    }

    public GetCustomerResult execute(GetCustomerCommand command) {

        Customer customer = customerRepository.findById(UUID.fromString(command.customerId()))
                .orElseThrow(() -> new CustomerNotFoundException("Customer not found with id " + command.customerId()));

        return CustomerMapper.toGetResult(customer);
    }
}
