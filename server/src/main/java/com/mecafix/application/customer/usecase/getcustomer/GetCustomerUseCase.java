package com.mecafix.application.customer.usecase.getcustomer;

import com.mecafix.application.customer.mapper.CustomerMapper;
import com.mecafix.application.customer.port.out.CustomerRepositoryPort;
import com.mecafix.domain.model.entity.person.Customer;
import com.mecafix.shared.exceptions.CustomerNotFoundException;

import java.util.UUID;

public class GetCustomerService implements GetCustomerUseCase {

    private final CustomerRepositoryPort customerRepository;

    public GetCustomerService(CustomerRepositoryPort customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public GetCustomerResult execute(GetCustomerCommand command) {

        Customer customer = customerRepository.findById(UUID.fromString(command.customerId()))
                .orElseThrow(() -> new CustomerNotFoundException("Customer not found with id " + command.customerId()));

        return CustomerMapper.toGetResult(customer);
    }
}
