package com.mecafix.application.customer.usecase.listcustomers;

import com.mecafix.domain.model.entity.person.Customer;
import com.mecafix.domain.port.customer.CustomerRepositoryPort;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ListCustomersServiceTest {

    @Mock
    private CustomerRepositoryPort customerRepository;

    private ListCustomersUseCase listCustomersUseCase;

    @BeforeEach
    void setUp() {
        listCustomersUseCase = new ListCustomersUseCase(customerRepository);
    }

    @Test
    void execute_ShouldReturnListOfCustomers() {
        Customer c1 = Customer.create("A", "B", "a@b.com", "+1111111111", "11111111", new ArrayList<>());
        Customer c2 = Customer.create("C", "D", "c@d.com", "+2222222222", "22222222", new ArrayList<>());

        when(customerRepository.findAll()).thenReturn(List.of(c1, c2));

        ListCustomersResult result = listCustomersUseCase.execute(new ListCustomersCommand());

        assertEquals(2, result.customers().size());
    }
}
