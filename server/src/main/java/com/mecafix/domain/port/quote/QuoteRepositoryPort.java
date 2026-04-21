package com.mecafix.domain.port.quote;

import com.mecafix.domain.model.entity.quote.Quote;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface QuoteRepositoryPort {
    void save(Quote quote);

    Optional<Quote> findById(UUID id);

    List<Quote> findByCustomerId(UUID customerId);
}
