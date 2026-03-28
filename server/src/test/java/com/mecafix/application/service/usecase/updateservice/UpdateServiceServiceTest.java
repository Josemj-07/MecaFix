package com.mecafix.application.service.usecase.updateservice;

import com.mecafix.application.service.port.out.ServiceRepositoryPort;
import com.mecafix.domain.model.entity.service.Service;
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

    private UpdateServiceService updateServiceService;

    @BeforeEach
    void setUp() {
        updateServiceService = new UpdateServiceService(serviceRepository);
    }

    @Test
    void execute_ShouldUpdateDescription() {
        Service service = Service.create("Oil Change", "Old desc", BigDecimal.TEN);
        when(serviceRepository.findById(service.getId())).thenReturn(Optional.of(service));

        UpdateServiceCommand command = new UpdateServiceCommand(service.getId().toString(), "New desc", null);

        UpdateServiceResult result = updateServiceService.execute(command);

        assertEquals("New desc", result.description());

        verify(serviceRepository).save(any(Service.class));
    }
}
