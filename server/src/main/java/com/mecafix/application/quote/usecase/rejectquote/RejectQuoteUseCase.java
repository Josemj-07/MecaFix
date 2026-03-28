package com.mecafix.application.quote.usecase.rejectquote;

public interface RejectQuoteUseCase {
    RejectQuoteResult execute(RejectQuoteCommand command);
}
