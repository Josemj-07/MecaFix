package com.mecafix.application.quote.usecase.listcustomerquotes;

import com.mecafix.application.quote.mapper.QuoteMapper;
import com.mecafix.domain.model.entity.quote.Quote;
import com.mecafix.domain.port.quote.QuoteRepositoryPort;

import java.util.List;
import java.util.UUID;

public class  ListCustomerQuotesUseCase {

    private final QuoteRepositoryPort quoteRepository;

    public ListCustomerQuotesUseCase(QuoteRepositoryPort quoteRepository) {
        this.quoteRepository = quoteRepository;
    }


    public ListCustomerQuotesResult execute(ListCustomerQuotesCommand command) {

        List<Quote> quotes = quoteRepository.findByCustomerId(UUID.fromString(command.customerId()));

        return QuoteMapper.toListCustomerQuotesResult(quotes);
    }
}
