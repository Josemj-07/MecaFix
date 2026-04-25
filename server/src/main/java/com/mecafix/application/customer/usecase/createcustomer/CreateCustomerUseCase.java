package com.mecafix.application.customer.usecase.createcustomer;

import com.mecafix.application.customer.mapper.CustomerMapper;
import com.mecafix.domain.model.entity.person.Customer;
import com.mecafix.domain.model.valueobject.Dni;
import com.mecafix.domain.model.valueobject.Email;
import com.mecafix.domain.model.valueobject.MobilePhone;
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
                new Email(command.email()),
                new MobilePhone(command.mobilePhone()),
                new Dni(command.nationalId()));

        customerRepository.save(customer);

        return CustomerMapper.toCreateResult(customer);
    }
}
