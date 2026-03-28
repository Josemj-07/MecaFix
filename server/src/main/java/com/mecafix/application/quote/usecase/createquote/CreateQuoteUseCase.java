package com.mecafix.application.quote.usecase.createquote;

public interface CreateQuoteUseCase {
    CreateQuoteResult execute(CreateQuoteCommand command);
}
