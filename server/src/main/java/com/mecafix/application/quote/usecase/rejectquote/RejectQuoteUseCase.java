package com.mecafix.application.quote.usecase.rejectquote;

import com.mecafix.application.quote.mapper.QuoteMapper;
import com.mecafix.application.quote.port.out.QuoteRepositoryPort;
import com.mecafix.domain.model.entity.quote.Quote;
import com.mecafix.shared.exceptions.QuoteNotFoundException;

import java.util.UUID;

public class RejectQuoteService implements RejectQuoteUseCase {

    private final QuoteRepositoryPort quoteRepository;

    public RejectQuoteService(QuoteRepositoryPort quoteRepository) {
        this.quoteRepository = quoteRepository;
    }

    @Override
    public RejectQuoteResult execute(RejectQuoteCommand command) {

        Quote quote = quoteRepository.findById(UUID.fromString(command.quoteId()))
                .orElseThrow(() -> new QuoteNotFoundException("Quote not found with id " + command.quoteId()));

        quote.reject();

        quoteRepository.save(quote);

        return QuoteMapper.toRejectResult(quote);
    }
}
