package com.mecafix.application.quote.usecase.approvequote;

import com.mecafix.application.quote.mapper.QuoteMapper;
import com.mecafix.domain.model.entity.quote.Quote;
import com.mecafix.domain.port.quote.QuoteRepositoryPort;


import java.util.UUID;

public class ApproveQuoteUseCase {

    private final QuoteRepositoryPort quoteRepository;

    public ApproveQuoteUseCase(QuoteRepositoryPort quoteRepository) {
        this.quoteRepository = quoteRepository;
    }


    public ApproveQuoteResult execute(ApproveQuoteCommand command) {

        Quote quote = quoteRepository.findById(UUID.fromString(command.quoteId()))
                .orElseThrow(() -> new RuntimeException("Quote not found with id " + command.quoteId()));

        quote.approve();

        quoteRepository.save(quote);

        return QuoteMapper.toApproveResult(quote);
    }
}
