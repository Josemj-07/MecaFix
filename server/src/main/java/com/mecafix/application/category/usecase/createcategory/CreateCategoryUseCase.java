package com.mecafix.application.category.usecase.createcategory;

import com.mecafix.application.category.mapper.CategoryMapper;
import com.mecafix.application.category.port.out.CategoryRepositoryPort;
import com.mecafix.domain.model.entity.product.Category;
import com.mecafix.shared.exceptions.CategoryAlreadyExistsException;

public class CreateCategoryService implements CreateCategoryUseCase {

    private final CategoryRepositoryPort categoryRepository;

    public CreateCategoryService(CategoryRepositoryPort categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public CreateCategoryResult execute(CreateCategoryCommand command) {

        if (categoryRepository.existsByName(command.name())) {
            throw new CategoryAlreadyExistsException("Category already exists with name " + command.name());
        }

        Category category = Category.create(command.name());

        categoryRepository.save(category);

        return CategoryMapper.toCreateResult(category);
    }
}
