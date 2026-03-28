package com.mecafix.application.category.usecase.createcategory;

import java.util.UUID;

public record CreateCategoryResult(
        UUID id,
        String name) {
}
