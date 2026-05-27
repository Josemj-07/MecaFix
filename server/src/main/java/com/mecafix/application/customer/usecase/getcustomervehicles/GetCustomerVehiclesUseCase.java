package com.mecafix.application.customer.usecase.getcustomervehicles;


import com.mecafix.application.customer.mapper.CustomerMapper;
import com.mecafix.domain.model.entity.person.Customer;
import com.mecafix.application.exceptions.CustomerNotFoundException;
import com.mecafix.domain.port.customer.CustomerRepositoryPort;

import java.util.UUID;

public class GetCustomerVehiclesUseCase {

    private final CustomerRepositoryPort customerRepository;

    public GetCustomerVehiclesUseCase(CustomerRepositoryPort customerRepository) {
        this.customerRepository = customerRepository;
    }

    public GetCustomerVehiclesResult execute(GetCustomerVehiclesCommand command) {

        Customer customer = customerRepository.findById(UUID.fromString(command.customerId()))
                .orElseThrow(() -> new CustomerNotFoundException("Customer not found with id " + command.customerId()));

        return CustomerMapper.toGetVehiclesResult(customer);
    }

}
