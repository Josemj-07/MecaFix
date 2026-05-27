package com.mecafix.application.customer.usecase.updatecustomer;

import com.mecafix.domain.model.entity.person.Customer;
import com.mecafix.domain.port.customer.CustomerRepositoryPort;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UpdateCustomerServiceTest {

    @Mock
    private CustomerRepositoryPort customerRepository;

    private UpdateCustomerUseCase updateCustomerupdateCustomerUseCase;

    @BeforeEach
    void setUp() {
        updateCustomerupdateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);
    }

    @Test
    void execute_ShouldUpdateAndSaveCustomer() {
        Customer customer = Customer.create("Jack", "Smith", "jack@smith.com",
                "+1112223333", "11111111", new ArrayList<>());
        when(customerRepository.findById(customer.getId())).thenReturn(Optional.of(customer));

        UpdateCustomerCommand command = new UpdateCustomerCommand(customer.getId().toString(), "new@smith.com", null,
                null);

        UpdateCustomerResult result = updateCustomerupdateCustomerUseCase.execute(command);

        assertEquals("new@smith.com", result.email());
        assertEquals("+1112223333", result.mobilePhone()); // should remain unchanged

        verify(customerRepository).save(any(Customer.class));
    }
}
