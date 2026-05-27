package com.mecafix.application.customer.usecase.createcustomer;

import com.mecafix.application.customer.mapper.CustomerMapper;
import com.mecafix.domain.model.entity.person.Customer;
import com.mecafix.domain.port.customer.CustomerRepositoryPort;

public class CreateCustomerUseCase {

    private final CustomerRepositoryPort customerRepository;

    public CreateCustomerUseCase(CustomerRepositoryPort customerRepository) {
        this.customerRepository = customerRepository;
    }

    public CreateCustomerResult execute(CreateCustomerCommand command) {

        Customer customer = Customer.create(
                command.firstName(),
                command.lastName(),
                command.email(),
                command.mobilePhone(),
                command.nationalId(),
                new java.util.ArrayList<>());

        customerRepository.save(customer);

        return CustomerMapper.toCreateResult(customer);
    }
}
