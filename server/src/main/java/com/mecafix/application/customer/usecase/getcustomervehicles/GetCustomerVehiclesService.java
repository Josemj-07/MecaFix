package com.mecafix.application.customer.usecase.getcustomervehicles;


import com.mecafix.application.customer.mapper.CustomerMapper;
import com.mecafix.application.customer.port.out.CustomerRepositoryPort;
import com.mecafix.domain.model.entity.person.Customer;
import com.mecafix.shared.exceptions.CustomerNotFoundException;

import java.util.UUID;

public class GetCustomerVehiclesService implements GetCustomerVehiclesUseCase {

    private final CustomerRepositoryPort customerRepository;

    public GetCustomerVehiclesService(CustomerRepositoryPort customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public GetCustomerVehiclesResult execute(GetCustomerVehiclesCommand command) {

        Customer customer = customerRepository.findById(UUID.fromString(command.customerId()))
                .orElseThrow(() -> new CustomerNotFoundException("Customer not found with id " + command.customerId()));

        return CustomerMapper.toGetVehiclesResult(customer);
    }

}
