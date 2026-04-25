package com.mecafix.application.category.usecase.listcategories;

import com.mecafix.application.category.mapper.CategoryMapper;
import com.mecafix.domain.model.entity.product.Category;
import com.mecafix.domain.port.category.CategoryRepositoryPort;

import java.util.List;

public class  ListCategoriesUseCase {

    private final CategoryRepositoryPort categoryRepository;

    public ListCategoriesUseCase(CategoryRepositoryPort categoryRepository) {
        this.categoryRepository = categoryRepository;
    }


    public ListCategoriesResult execute(ListCategoriesCommand command) {

        List<Category> categories = categoryRepository.findAll();

        return CategoryMapper.toListResult(categories);
    }
}
