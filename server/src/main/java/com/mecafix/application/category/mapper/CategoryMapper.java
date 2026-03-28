package com.mecafix.application.category.mapper;

import com.mecafix.application.category.usecase.createcategory.CreateCategoryResult;
import com.mecafix.application.category.usecase.getcategory.GetCategoryResult;
import com.mecafix.application.category.usecase.listcategories.ListCategoriesResult;
import com.mecafix.domain.model.entity.product.Category;

import java.util.List;

public class CategoryMapper {

    private CategoryMapper() {
    }

    public static CreateCategoryResult toCreateResult(Category category) {
        return new CreateCategoryResult(
                category.getId(),
                category.getName());
    }

    public static GetCategoryResult toGetResult(Category category) {
        return new GetCategoryResult(
                category.getId(),
                category.getName());
    }

    public static ListCategoriesResult toListResult(List<Category> categories) {
        List<ListCategoriesResult.CategoryResult> results = categories.stream()
                .map(category -> new ListCategoriesResult.CategoryResult(
                        category.getId(),
                        category.getName()))
                .toList();
        return new ListCategoriesResult(results);
    }
}
