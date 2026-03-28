package com.mecafix.application.serviceorder.usecase.createserviceorder;

import com.mecafix.application.mechanic.port.out.MechanicRepositoryPort;
import com.mecafix.application.quote.port.out.QuoteRepositoryPort;
import com.mecafix.application.service.port.out.ServiceRepositoryPort;
import com.mecafix.application.serviceorder.port.out.ServiceOrderRepositoryPort;
import com.mecafix.domain.exceptions.InvalidServiceOrderException;
import com.mecafix.domain.model.entity.order.ServiceOrder;
import com.mecafix.domain.model.entity.person.Mechanic;
import com.mecafix.domain.model.entity.quote.Quote;
import com.mecafix.domain.model.entity.service.Service;
import com.mecafix.domain.model.enums.QuoteStatus;
import com.mecafix.shared.exceptions.QuoteNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CreateServiceOrderServiceTest {

    @Mock
    private ServiceOrderRepositoryPort serviceOrderRepository;
    @Mock
    private QuoteRepositoryPort quoteRepository;
    @Mock
    private MechanicRepositoryPort mechanicRepository;
    @Mock
    private ServiceRepositoryPort serviceRepository;

    private CreateServiceOrderService createServiceOrderService;

    @BeforeEach
    void setUp() {
        createServiceOrderService = new CreateServiceOrderService(serviceOrderRepository, quoteRepository,
                mechanicRepository, serviceRepository);
    }

    @Test
    void execute_ShouldThrowException_WhenQuoteNotApproved() {
        UUID quoteId = UUID.randomUUID();
        Quote unapprovedQuote = mock(Quote.class);
        when(unapprovedQuote.getStatus()).thenReturn(QuoteStatus.PENDING);

        when(quoteRepository.findById(quoteId)).thenReturn(Optional.of(unapprovedQuote));

        CreateServiceOrderCommand command = new CreateServiceOrderCommand(quoteId.toString(), List.of());

        assertThrows(InvalidServiceOrderException.class, () -> createServiceOrderService.execute(command));
    }

    @Test
    void execute_ShouldCreateServiceOrder_WhenQuoteIsApproved() {
        UUID quoteId = UUID.randomUUID();
        Quote approvedQuote = mock(Quote.class);
        when(approvedQuote.getId()).thenReturn(quoteId);
        when(approvedQuote.getStatus()).thenReturn(QuoteStatus.APPROVED);
        when(quoteRepository.findById(quoteId)).thenReturn(Optional.of(approvedQuote));

        Mechanic mechanic = mock(Mechanic.class);
        when(mechanicRepository.findById(any())).thenReturn(Optional.of(mechanic));

        Service service = mock(Service.class);
        when(serviceRepository.findById(any())).thenReturn(Optional.of(service));

        CreateServiceOrderCommand.TaskCommand tc = new CreateServiceOrderCommand.TaskCommand(
                UUID.randomUUID().toString(), UUID.randomUUID().toString());
        CreateServiceOrderCommand command = new CreateServiceOrderCommand(quoteId.toString(), List.of(tc));

        CreateServiceOrderResult result = createServiceOrderService.execute(command);

        assertNotNull(result);
        verify(serviceOrderRepository).save(any(ServiceOrder.class));
    }
}
