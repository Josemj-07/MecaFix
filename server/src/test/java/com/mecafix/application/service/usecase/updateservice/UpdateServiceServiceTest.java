package com.mecafix.application.service.usecase.updateservice;

import com.mecafix.domain.model.entity.service.Service;
import com.mecafix.domain.port.service.ServiceRepositoryPort;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UpdateServiceServiceTest {

    @Mock
    private ServiceRepositoryPort serviceRepository;

    private UpdateServiceUseCase updateServiceUseCase;

    @BeforeEach
    void setUp() {
        updateServiceUseCase = new UpdateServiceUseCase(serviceRepository);
    }

    @Test
    void execute_ShouldUpdateDescription() {
        Service service = Service.create("Oil Change", "Old desc", BigDecimal.TEN);
        when(serviceRepository.findById(service.getId())).thenReturn(Optional.of(service));

        UpdateServiceCommand command = new UpdateServiceCommand(service.getId().toString(), "New desc", null);

        UpdateServiceResult result = updateServiceUseCase.execute(command);

        assertEquals("New desc", result.description());

        verify(serviceRepository).save(any(Service.class));
    }
}
