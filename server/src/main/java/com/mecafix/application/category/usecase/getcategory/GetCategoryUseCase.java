package com.mecafix.application.category.usecase.getcategory;

import com.mecafix.application.category.mapper.CategoryMapper;
import com.mecafix.application.category.port.out.CategoryRepositoryPort;
import com.mecafix.domain.model.entity.product.Category;
import com.mecafix.shared.exceptions.CategoryNotFoundException;

import java.util.UUID;

public class GetCategoryService implements GetCategoryUseCase {

    private final CategoryRepositoryPort categoryRepository;

    public GetCategoryService(CategoryRepositoryPort categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public GetCategoryResult execute(GetCategoryCommand command) {

        Category category = categoryRepository.findById(UUID.fromString(command.categoryId()))
                .orElseThrow(() -> new CategoryNotFoundException("Category not found with id " + command.categoryId()));

        return CategoryMapper.toGetResult(category);
    }
}
