package com.mecafix.application.category.usecase.getcategory;

import java.util.UUID;

public record GetCategoryResult(
        UUID id,
        String name) {
}
