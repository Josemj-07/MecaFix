package com.mecafix.application.service.usecase.getservice;

import com.mecafix.domain.model.entity.service.Service;
import com.mecafix.application.exceptions.ServiceNotFoundException;
import com.mecafix.domain.port.service.ServiceRepositoryPort;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class GetServiceServiceTest {

    @Mock
    private ServiceRepositoryPort serviceRepository;

    private GetServiceUseCase getServiceUseCase;

    @BeforeEach
    void setUp() {
        getServiceUseCase = new GetServiceUseCase(serviceRepository);
    }

    @Test
    void execute_ShouldReturnService_WhenExists() {
        Service service = Service.create("Test", "Desc", BigDecimal.valueOf(50));
        when(serviceRepository.findById(service.getId())).thenReturn(Optional.of(service));

        GetServiceResult result = getServiceUseCase.execute(new GetServiceCommand(service.getId().toString()));

        assertNotNull(result);
        assertEquals(service.getId(), result.id());
        assertEquals("Test", result.name());
    }

    @Test
    void execute_ShouldThrowException_WhenNotFound() {
        UUID id = UUID.randomUUID();
        when(serviceRepository.findById(any())).thenReturn(Optional.empty());

        assertThrows(ServiceNotFoundException.class, () -> getServiceUseCase.execute(new GetServiceCommand(id.toString())));
    }
}
