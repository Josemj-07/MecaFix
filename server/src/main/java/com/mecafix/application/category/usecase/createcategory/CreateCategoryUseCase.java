package com.mecafix.application.category.usecase.createcategory;

import com.mecafix.application.category.mapper.CategoryMapper;
import com.mecafix.domain.model.entity.product.Category;
import com.mecafix.domain.port.category.CategoryRepositoryPort;
import com.mecafix.application.exceptions.CategoryAlreadyExistsException;

public class CreateCategoryUseCase {

    private final CategoryRepositoryPort categoryRepository;

    public CreateCategoryUseCase(CategoryRepositoryPort categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public CreateCategoryResult execute(CreateCategoryCommand command) {

        if (categoryRepository.existsByName(command.name())) {
            throw new CategoryAlreadyExistsException("Category already exists with name " + command.name());
        }

        Category category = Category.create(command.name());

        categoryRepository.save(category);

        return CategoryMapper.toCreateResult(category);
    }
}
