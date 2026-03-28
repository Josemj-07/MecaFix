package com.mecafix.application.quote.usecase.getquote;

public interface GetQuoteUseCase {
    GetQuoteResult execute(GetQuoteCommand command);
}
