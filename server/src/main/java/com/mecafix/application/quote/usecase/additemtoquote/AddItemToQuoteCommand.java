package com.mecafix.application.quote.usecase.additemtoquote;

public record AddItemToQuoteCommand(
        String quoteId,
        String type,
        String itemId,
        Long quantity) {
}
