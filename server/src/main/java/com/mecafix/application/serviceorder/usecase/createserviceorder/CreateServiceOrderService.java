package com.mecafix.application.serviceorder.usecase.createserviceorder;

import com.mecafix.application.mechanic.port.out.MechanicRepositoryPort;
import com.mecafix.application.quote.port.out.QuoteRepositoryPort;
import com.mecafix.application.service.port.out.ServiceRepositoryPort;
import com.mecafix.application.serviceorder.mapper.ServiceOrderMapper;
import com.mecafix.application.serviceorder.port.out.ServiceOrderRepositoryPort;
import com.mecafix.domain.exceptions.InvalidServiceOrderException;
import com.mecafix.domain.model.entity.order.ServiceOrder;
import com.mecafix.domain.model.entity.order.Task;
import com.mecafix.domain.model.entity.person.Mechanic;
import com.mecafix.domain.model.entity.quote.Quote;
import com.mecafix.domain.model.entity.service.Service;
import com.mecafix.domain.model.entity.service.ServiceDetail;
import com.mecafix.domain.model.enums.QuoteStatus;
import com.mecafix.shared.exceptions.MechanicNotFoundException;
import com.mecafix.shared.exceptions.QuoteNotFoundException;
import com.mecafix.shared.exceptions.ServiceNotFoundException;

import java.util.List;
import java.util.UUID;

public class CreateServiceOrderService implements CreateServiceOrderUseCase {

    private final ServiceOrderRepositoryPort serviceOrderRepository;
    private final QuoteRepositoryPort quoteRepository;
    private final MechanicRepositoryPort mechanicRepository;
    private final ServiceRepositoryPort serviceRepository;

    public CreateServiceOrderService(ServiceOrderRepositoryPort serviceOrderRepository,
                                     QuoteRepositoryPort quoteRepository,
                                     MechanicRepositoryPort mechanicRepository,
                                     ServiceRepositoryPort serviceRepository) {
        this.serviceOrderRepository = serviceOrderRepository;
        this.quoteRepository = quoteRepository;
        this.mechanicRepository = mechanicRepository;
        this.serviceRepository = serviceRepository;
    }

    @Override
    public CreateServiceOrderResult execute(CreateServiceOrderCommand command) {
        Quote quote = quoteRepository.findById(UUID.fromString(command.quoteId()))
                .orElseThrow(() -> new QuoteNotFoundException("Quote not found with id " + command.quoteId()));

        if (quote.getStatus() != QuoteStatus.APPROVED) {
            throw new InvalidServiceOrderException("Order can only be created from an APPROVED quote");
        }

        List<Task> tasks = command.tasks().stream().map(taskCommand -> {
            Mechanic mechanic = mechanicRepository.findById(UUID.fromString(taskCommand.mechanicId()))
                    .orElseThrow(() -> new MechanicNotFoundException("Mechanic not found with id " + taskCommand.mechanicId()));
            Service service = serviceRepository.findById(UUID.fromString(taskCommand.serviceId()))
                    .orElseThrow(() -> new ServiceNotFoundException("Service not found with id " + taskCommand.serviceId()));
            ServiceDetail serviceDetail = ServiceDetail.create(service);
            return Task.create(mechanic, serviceDetail);
        }).toList();

        ServiceOrder serviceOrder = ServiceOrder.create(quote, tasks);

        serviceOrderRepository.save(serviceOrder);

        return ServiceOrderMapper.toCreateResult(serviceOrder);
    }
}
