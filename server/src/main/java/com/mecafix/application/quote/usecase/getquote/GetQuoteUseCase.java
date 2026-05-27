package com.mecafix.application.quote.usecase.getquote;

import com.mecafix.application.quote.mapper.QuoteMapper;
import com.mecafix.domain.model.entity.quote.Quote;
import com.mecafix.domain.port.quote.QuoteRepositoryPort;


import java.util.UUID;

public class GetQuoteUseCase {

    private final QuoteRepositoryPort quoteRepository;

    public GetQuoteUseCase(QuoteRepositoryPort quoteRepository) {
        this.quoteRepository = quoteRepository;
    }

    public GetQuoteResult execute(GetQuoteCommand command) {

        Quote quote = quoteRepository.findById(UUID.fromString(command.quoteId()))
                .orElseThrow(() -> new RuntimeException("Quote not found with id " + command.quoteId()));

        return QuoteMapper.toGetResult(quote);
    }
}
