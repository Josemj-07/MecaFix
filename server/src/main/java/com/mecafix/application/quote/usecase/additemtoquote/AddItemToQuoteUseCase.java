package com.mecafix.application.quote.usecase.additemtoquote;

import com.mecafix.application.quote.mapper.QuoteMapper;
import com.mecafix.application.product.port.out.ProductRepositoryPort;
import com.mecafix.application.quote.port.out.QuoteRepositoryPort;
import com.mecafix.application.service.port.out.ServiceRepositoryPort;
import com.mecafix.domain.model.contract.IPayable;
import com.mecafix.domain.model.entity.product.Product;
import com.mecafix.domain.model.entity.product.ProductDetail;
import com.mecafix.domain.model.entity.quote.Quote;
import com.mecafix.domain.model.entity.service.Service;
import com.mecafix.domain.model.entity.service.ServiceDetail;
import com.mecafix.shared.exceptions.QuoteNotFoundException;

import java.util.UUID;

public class AddItemToQuoteService implements AddItemToQuoteUseCase {

    private final QuoteRepositoryPort quoteRepository;
    private final ServiceRepositoryPort serviceRepository;
    private final ProductRepositoryPort productRepository;

    public AddItemToQuoteService(QuoteRepositoryPort quoteRepository,
            ServiceRepositoryPort serviceRepository,
            ProductRepositoryPort productRepository) {
        this.quoteRepository = quoteRepository;
        this.serviceRepository = serviceRepository;
        this.productRepository = productRepository;
    }

    @Override
    public AddItemToQuoteResult execute(AddItemToQuoteCommand command) {

        Quote quote = quoteRepository.findById(UUID.fromString(command.quoteId()))
                .orElseThrow(() -> new QuoteNotFoundException("Quote not found with id " + command.quoteId()));

        IPayable payableItem = resolvePayableItem(command);

        quote.addPayable(payableItem);

        quoteRepository.save(quote);

        return QuoteMapper.toAddItemResult(quote);
    }

    private IPayable resolvePayableItem(AddItemToQuoteCommand command) {
        return switch (command.type().toUpperCase()) {
            case "SERVICE" -> {
                Service service = serviceRepository.findById(UUID.fromString(command.itemId()))
                        .orElseThrow(
                                () -> new IllegalArgumentException("Service not found with id " + command.itemId()));
                yield ServiceDetail.create(service);
            }
            case "PRODUCT" -> {
                Product product = productRepository.findById(UUID.fromString(command.itemId()))
                        .orElseThrow(
                                () -> new IllegalArgumentException("Product not found with id " + command.itemId()));
                yield ProductDetail.create(product, command.quantity());
            }
            default -> throw new IllegalArgumentException("Unknown payable item type: " + command.type());
        };
    }
}
