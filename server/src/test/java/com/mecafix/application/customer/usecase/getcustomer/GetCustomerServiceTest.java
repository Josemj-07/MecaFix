package com.mecafix.application.customer.usecase.getcustomer;

import com.mecafix.application.exceptions.CustomerNotFoundException;
import com.mecafix.domain.model.entity.person.Customer;
import com.mecafix.domain.port.customer.CustomerRepositoryPort;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class GetCustomerServiceTest {

    @Mock
    private CustomerRepositoryPort customerRepository;

    private GetCustomerUseCase getCustomerService;

    @BeforeEach
    void setUp() {
        getCustomerService = new GetCustomerUseCase(customerRepository);
    }

    @Test
    void execute_ShouldReturnCustomer_WhenExists() {
        Customer customer = Customer.create("Jack", "Smith", "jack@smith.com",
                "+1112223333", "11111111", new ArrayList<>());
        UUID id = customer.getId();

        when(customerRepository.findById(id)).thenReturn(Optional.of(customer));

        GetCustomerResult result = getCustomerService.execute(new GetCustomerCommand(id.toString()));

        assertNotNull(result);
        assertEquals(id, result.id());
        assertEquals("Jack", result.firstName());
    }

    @Test
    void execute_ShouldThrowException_WhenNotFound() {
        UUID id = UUID.randomUUID();
        when(customerRepository.findById(any())).thenReturn(Optional.empty());

        assertThrows(CustomerNotFoundException.class,
                () -> getCustomerService.execute(new GetCustomerCommand(id.toString())));
    }
}
