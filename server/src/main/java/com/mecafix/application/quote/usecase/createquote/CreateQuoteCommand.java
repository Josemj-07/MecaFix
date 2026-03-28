package com.mecafix.application.quote.usecase.createquote;

import java.util.List;

public record CreateQuoteCommand(
        String customerId,
        String vehicleId,
        List<PayableItemCommand> items) {
    public record PayableItemCommand(
            String type,
            String itemId,
            Long quantity) {
    }
}
