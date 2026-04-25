package com.mecafix.application.quote.usecase.rejectquote;

import com.mecafix.application.quote.mapper.QuoteMapper;
import com.mecafix.domain.port.quote.QuoteRepositoryPort;
import com.mecafix.domain.model.entity.quote.Quote;


import java.util.UUID;

public class RejectQuoteUseCase {

    private final QuoteRepositoryPort quoteRepository;

    public RejectQuoteUseCase(QuoteRepositoryPort quoteRepository) {
        this.quoteRepository = quoteRepository;
    }


    public RejectQuoteResult execute(RejectQuoteCommand command) {

        Quote quote = quoteRepository.findById(UUID.fromString(command.quoteId()))
                .orElseThrow(() -> new RuntimeException("Quote not found with id " + command.quoteId()));

        quote.reject();

        quoteRepository.save(quote);

        return QuoteMapper.toRejectResult(quote);
    }
}
