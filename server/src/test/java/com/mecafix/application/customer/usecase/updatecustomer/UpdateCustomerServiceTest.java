package com.mecafix.application.customer.usecase.updatecustomer;

import com.mecafix.application.customer.port.out.CustomerRepositoryPort;
import com.mecafix.domain.model.entity.person.Customer;
import com.mecafix.domain.model.valueobject.Dni;
import com.mecafix.domain.model.valueobject.Email;
import com.mecafix.domain.model.valueobject.MobilePhone;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UpdateCustomerServiceTest {

    @Mock
    private CustomerRepositoryPort customerRepository;

    private UpdateCustomerService updateCustomerService;

    @BeforeEach
    void setUp() {
        updateCustomerService = new UpdateCustomerService(customerRepository);
    }

    @Test
    void execute_ShouldUpdateAndSaveCustomer() {
        Customer customer = Customer.create("Jack", "Smith", new Email("jack@smith.com"),
                new MobilePhone("+1112223333"), new Dni("11111111"));
        when(customerRepository.findById(customer.getId())).thenReturn(Optional.of(customer));

        UpdateCustomerCommand command = new UpdateCustomerCommand(customer.getId().toString(), "new@smith.com", null,
                null);

        UpdateCustomerResult result = updateCustomerService.execute(command);

        assertEquals("new@smith.com", result.email());
        assertEquals("+1112223333", result.mobilePhone()); // should remain unchanged

        verify(customerRepository).save(any(Customer.class));
    }
}
