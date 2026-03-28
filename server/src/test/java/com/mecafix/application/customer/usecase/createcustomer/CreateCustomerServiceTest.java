package com.mecafix.application.customer.usecase.createcustomer;

import com.mecafix.application.customer.port.out.CustomerRepositoryPort;
import com.mecafix.domain.model.entity.person.Customer;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class CreateCustomerServiceTest {

    @Mock
    private CustomerRepositoryPort customerRepository;

    private CreateCustomerService createCustomerService;

    @BeforeEach
    void setUp() {
        createCustomerService = new CreateCustomerService(customerRepository);
    }

    @Test
    void execute_ShouldCreateAndSaveCustomer() {
        // Arrange
        CreateCustomerCommand command = new CreateCustomerCommand("Jane", "Doe", "jane.doe@example.com", "+9876543210",
                "87654321");

        // Act
        CreateCustomerResult result = createCustomerService.execute(command);

        // Assert
        assertNotNull(result.id());
        assertEquals("Jane", result.firstName());
        assertEquals("Doe", result.lastName());
        assertEquals("jane.doe@example.com", result.email());

        // Verify repository interaction
        verify(customerRepository).save(any(Customer.class));
    }
}
