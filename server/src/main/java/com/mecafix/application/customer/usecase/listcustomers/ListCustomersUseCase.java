package com.mecafix.application.customer.usecase.listcustomers;

import com.mecafix.application.customer.mapper.CustomerMapper;
import com.mecafix.application.customer.port.out.CustomerRepositoryPort;
import com.mecafix.domain.model.entity.person.Customer;

import java.util.List;

public class ListCustomersService implements ListCustomersUseCase {

    private final CustomerRepositoryPort customerRepository;

    public ListCustomersService(CustomerRepositoryPort customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public ListCustomersResult execute(ListCustomersCommand command) {

        List<Customer> customers = customerRepository.findAll();

        return CustomerMapper.toListResult(customers);
    }
}
