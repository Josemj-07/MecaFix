package com.mecafix.application.service.usecase.createservice;

import com.mecafix.application.service.port.out.ServiceRepositoryPort;
import com.mecafix.domain.model.entity.service.Service;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class CreateServiceServiceTest {

    @Mock
    private ServiceRepositoryPort serviceRepository;

    private CreateServiceService createServiceService;

    @BeforeEach
    void setUp() {
        createServiceService = new CreateServiceService(serviceRepository);
    }

    @Test
    void execute_ShouldCreateAndSaveService() {
        CreateServiceCommand command = new CreateServiceCommand("Oil Change", "Engine oil change", BigDecimal.valueOf(100.0));

        CreateServiceResult result = createServiceService.execute(command);

        assertNotNull(result.id());
        assertEquals("Oil Change", result.name());
        assertEquals(BigDecimal.valueOf(100.0), result.laborPrice());

        verify(serviceRepository).save(any(Service.class));
    }
}
