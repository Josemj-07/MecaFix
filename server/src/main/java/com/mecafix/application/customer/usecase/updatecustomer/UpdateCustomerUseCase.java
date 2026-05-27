package com.mecafix.application.customer.usecase.updatecustomer;

import com.mecafix.application.customer.mapper.CustomerMapper;
import com.mecafix.domain.model.entity.person.Customer;
import com.mecafix.domain.model.valueobject.Dni;
import com.mecafix.domain.model.valueobject.Email;
import com.mecafix.domain.model.valueobject.MobilePhone;
import com.mecafix.application.exceptions.CustomerNotFoundException;
import com.mecafix.domain.port.customer.CustomerRepositoryPort;

import java.util.UUID;

public class UpdateCustomerUseCase {

    private final CustomerRepositoryPort customerRepository;

    public UpdateCustomerUseCase(CustomerRepositoryPort customerRepository) {
        this.customerRepository = customerRepository;
    }

    public UpdateCustomerResult execute(UpdateCustomerCommand command) {

        Customer customer = customerRepository.findById(UUID.fromString(command.customerId()))
                .orElseThrow(() -> new CustomerNotFoundException("Customer not found with id " + command.customerId()));

        if (command.email() != null) customer.changeEmail(new Email(command.email()));
        if (command.mobilePhone() != null) customer.changeMobilePhone(new MobilePhone(command.mobilePhone()));
        if (command.nationalId() != null) customer.setDni(new Dni(command.nationalId()));

        customerRepository.save(customer);

        return CustomerMapper.toUpdateResult(customer);
    }
}
