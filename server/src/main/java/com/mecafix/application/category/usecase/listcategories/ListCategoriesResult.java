package com.mecafix.application.category.usecase.listcategories;

import java.util.List;
import java.util.UUID;

public record ListCategoriesResult(
        List<CategoryResult> categories) {
    public record CategoryResult(
            UUID id,
            String name) {
    }
}
