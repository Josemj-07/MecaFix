package com.mecafix.application.service.usecase.listservices;

import com.mecafix.domain.model.entity.service.Service;
import com.mecafix.domain.port.service.ServiceRepositoryPort;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ListServicesServiceTest {

    @Mock
    private ServiceRepositoryPort serviceRepository;

    private ListServicesUseCase listServicesUseCase;

    @BeforeEach
    void setUp() {
        listServicesUseCase = new ListServicesUseCase(serviceRepository);
    }

    @Test
    void execute_ShouldReturnAllServices() {
        Service s1 = Service.create("S1", "D1", BigDecimal.TEN);
        Service s2 = Service.create("S2", "D2", BigDecimal.ONE);

        when(serviceRepository.findAll()).thenReturn(List.of(s1, s2));

        ListServicesResult result = listServicesUseCase.execute(new ListServicesCommand());

        assertEquals(2, result.services().size());
    }
}
