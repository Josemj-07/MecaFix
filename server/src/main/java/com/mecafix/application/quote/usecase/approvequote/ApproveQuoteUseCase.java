package com.mecafix.application.quote.usecase.approvequote;

import com.mecafix.application.quote.mapper.QuoteMapper;
import com.mecafix.application.quote.port.out.QuoteRepositoryPort;
import com.mecafix.domain.model.entity.quote.Quote;
import com.mecafix.shared.exceptions.QuoteNotFoundException;

import java.util.UUID;

public class ApproveQuoteService implements ApproveQuoteUseCase {

    private final QuoteRepositoryPort quoteRepository;

    public ApproveQuoteService(QuoteRepositoryPort quoteRepository) {
        this.quoteRepository = quoteRepository;
    }

    @Override
    public ApproveQuoteResult execute(ApproveQuoteCommand command) {

        Quote quote = quoteRepository.findById(UUID.fromString(command.quoteId()))
                .orElseThrow(() -> new QuoteNotFoundException("Quote not found with id " + command.quoteId()));

        quote.approve();

        quoteRepository.save(quote);

        return QuoteMapper.toApproveResult(quote);
    }
}
