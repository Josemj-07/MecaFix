package com.mecafix.application.category.usecase.listcategories;

import com.mecafix.application.category.mapper.CategoryMapper;
import com.mecafix.application.category.port.out.CategoryRepositoryPort;
import com.mecafix.domain.model.entity.product.Category;

import java.util.List;

public class ListCategoriesService implements ListCategoriesUseCase {

    private final CategoryRepositoryPort categoryRepository;

    public ListCategoriesService(CategoryRepositoryPort categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public ListCategoriesResult execute(ListCategoriesCommand command) {

        List<Category> categories = categoryRepository.findAll();

        return CategoryMapper.toListResult(categories);
    }
}
