package com.mecafix.application.quote.usecase.listcustomerquotes;

import com.mecafix.application.quote.mapper.QuoteMapper;
import com.mecafix.application.quote.port.out.QuoteRepositoryPort;
import com.mecafix.domain.model.entity.quote.Quote;

import java.util.List;
import java.util.UUID;

public class ListCustomerQuotesService implements ListCustomerQuotesUseCase {

    private final QuoteRepositoryPort quoteRepository;

    public ListCustomerQuotesService(QuoteRepositoryPort quoteRepository) {
        this.quoteRepository = quoteRepository;
    }

    @Override
    public ListCustomerQuotesResult execute(ListCustomerQuotesCommand command) {

        List<Quote> quotes = quoteRepository.findByCustomerId(UUID.fromString(command.customerId()));

        return QuoteMapper.toListCustomerQuotesResult(quotes);
    }
}
