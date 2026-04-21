package com.mecafix.application.quote.usecase.createquote;

import com.mecafix.application.customer.port.out.CustomerRepositoryPort;
import com.mecafix.application.quote.mapper.QuoteMapper;
import com.mecafix.application.product.port.out.ProductRepositoryPort;
import com.mecafix.application.quote.port.out.QuoteRepositoryPort;
import com.mecafix.application.service.port.out.ServiceRepositoryPort;
import com.mecafix.application.vehicle.port.out.VehicleRepositoryPort;
import com.mecafix.domain.model.contract.IPayable;
import com.mecafix.domain.model.entity.person.Customer;
import com.mecafix.domain.model.entity.product.Product;
import com.mecafix.domain.model.entity.product.ProductDetail;
import com.mecafix.domain.model.entity.quote.Quote;
import com.mecafix.domain.model.entity.service.Service;
import com.mecafix.domain.model.entity.service.ServiceDetail;
import com.mecafix.domain.model.entity.vehicle.Vehicle;
import com.mecafix.shared.exceptions.CustomerNotFoundException;
import com.mecafix.shared.exceptions.VehicleNotFoundException;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class CreateQuoteService implements CreateQuoteUseCase {

    private final QuoteRepositoryPort quoteRepository;
    private final CustomerRepositoryPort customerRepository;
    private final VehicleRepositoryPort vehicleRepository;
    private final ServiceRepositoryPort serviceRepository;
    private final ProductRepositoryPort productRepository;

    public CreateQuoteService(QuoteRepositoryPort quoteRepository,
            CustomerRepositoryPort customerRepository,
            VehicleRepositoryPort vehicleRepository,
            ServiceRepositoryPort serviceRepository,
            ProductRepositoryPort productRepository) {
        this.quoteRepository = quoteRepository;
        this.customerRepository = customerRepository;
        this.vehicleRepository = vehicleRepository;
        this.serviceRepository = serviceRepository;
        this.productRepository = productRepository;
    }

    @Override
    public CreateQuoteResult execute(CreateQuoteCommand command) {

        Customer customer = customerRepository.findById(UUID.fromString(command.customerId()))
                .orElseThrow(() -> new CustomerNotFoundException("Customer not found with id " + command.customerId()));

        Vehicle vehicle = vehicleRepository.findById(UUID.fromString(command.vehicleId()))
                .orElseThrow(() -> new VehicleNotFoundException("Vehicle not found with id " + command.vehicleId()));

        List<IPayable> payableItems = new ArrayList<>();

        if (command.items() != null) {
            for (CreateQuoteCommand.PayableItemCommand item : command.items()) {
                payableItems.add(resolvePayableItem(item));
            }
        }

        Quote quote = Quote.create(customer, vehicle, payableItems);

        quoteRepository.save(quote);

        return QuoteMapper.toCreateResult(quote);
    }

    private IPayable resolvePayableItem(CreateQuoteCommand.PayableItemCommand item) {
        return switch (item.type().toUpperCase()) {
            case "SERVICE" -> {
                Service service = serviceRepository.findById(UUID.fromString(item.itemId()))
                        .orElseThrow(() -> new IllegalArgumentException("Service not found with id " + item.itemId()));
                yield ServiceDetail.create(service);
            }
            case "PRODUCT" -> {
                Product product = productRepository.findById(UUID.fromString(item.itemId()))
                        .orElseThrow(() -> new IllegalArgumentException("Product not found with id " + item.itemId()));
                yield ProductDetail.create(product, item.quantity());
            }
            default -> throw new IllegalArgumentException("Unknown payable item type: " + item.type());
        };
    }
}
