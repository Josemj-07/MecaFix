package com.mecafix.application.customer.usecase.listcustomers;

import com.mecafix.application.customer.mapper.CustomerMapper;
import com.mecafix.domain.model.entity.person.Customer;
import com.mecafix.domain.port.customer.CustomerRepositoryPort;

import java.util.List;

public class ListCustomersUseCase {

    private final CustomerRepositoryPort customerRepository;

    public ListCustomersUseCase(CustomerRepositoryPort customerRepository) {
        this.customerRepository = customerRepository;
    }

    public ListCustomersResult execute(ListCustomersCommand command) {

        List<Customer> customers = customerRepository.findAll();

        return CustomerMapper.toListResult(customers);
    }
}
