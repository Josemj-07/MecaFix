package com.mecafix.adapter.out.persistence.mapper;

import com.mecafix.adapter.out.persistence.entity.CategoryJpaEntity;
import com.mecafix.domain.model.entity.product.Category;

public class CategoryMapper {
    public static CategoryJpaEntity toPersistence(Category category) {
        return new CategoryJpaEntity(category.getId(), category.getName());
    }

    public static Category toDomain(CategoryJpaEntity categoryJpaEntity) {
        return Category.reBuild(categoryJpaEntity.getId(), categoryJpaEntity.getName());
    }
}
