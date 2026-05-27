package com.mecafix.application.category.usecase.getcategory;

import com.mecafix.application.category.mapper.CategoryMapper;
import com.mecafix.domain.model.entity.product.Category;
import com.mecafix.domain.port.category.CategoryRepositoryPort;
import com.mecafix.application.exceptions.CategoryNotFoundException;

import java.util.UUID;

public class GetCategoryUseCase {

    private final CategoryRepositoryPort categoryRepository;

    public GetCategoryUseCase(CategoryRepositoryPort categoryRepository) {
        this.categoryRepository = categoryRepository;
    }


    public GetCategoryResult execute(GetCategoryCommand command) {

        Category category = categoryRepository.findById(UUID.fromString(command.categoryId()))
                .orElseThrow(() -> new CategoryNotFoundException("Category not found with id " + command.categoryId()));

        return CategoryMapper.toGetResult(category);
    }
}
