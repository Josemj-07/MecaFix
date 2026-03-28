package com.mecafix.application.serviceorder.usecase.completetask;

import java.util.UUID;

public record CompleteTaskResult(
        UUID taskId,
        String status) {
}
