package com.mecafix.application.serviceorder.usecase.starttask;

import java.util.UUID;

public record StartTaskResult(
        UUID taskId,
        String status) {
}
