package com.mecafix.application.customer.usecase.createcustomer;

import com.mecafix.domain.model.entity.person.Customer;
import com.mecafix.domain.port.customer.CustomerRepositoryPort;
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

    private CreateCustomerUseCase createCustomerUseCase;

    @BeforeEach
    void setUp() {
        createCustomerUseCase = new CreateCustomerUseCase(customerRepository);
    }

    @Test
    void execute_ShouldCreateAndSaveCustomer() {
        // Arrange
        CreateCustomerCommand command = new CreateCustomerCommand("Jane", "Doe", "jane.doe@example.com", "+9876543210",
                "87654321");

        // Act
        CreateCustomerResult result = createCustomerUseCase.execute(command);

        // Assert
        assertNotNull(result.id());
        assertEquals("Jane", result.firstName());
        assertEquals("Doe", result.lastName());
        assertEquals("jane.doe@example.com", result.email());

        // Verify repository interaction
        verify(customerRepository).save(any(Customer.class));
    }
}
