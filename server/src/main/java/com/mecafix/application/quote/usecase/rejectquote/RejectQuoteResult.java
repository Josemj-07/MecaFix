package com.mecafix.application.quote.usecase.rejectquote;

import java.util.UUID;

public record RejectQuoteResult(
        UUID id,
        String status) {
}
