package com.mecafix.application.serviceorder.usecase.advanceorderstatus;

import java.util.UUID;

public record AdvanceOrderStatusResult(
        UUID id,
        String orderStatus) {
}
