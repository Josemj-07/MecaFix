package com.mecafix.adapter.out.persistence.mapper;

import com.mecafix.adapter.out.persistence.entity.CategoryJpaEntity;
import com.mecafix.adapter.out.persistence.entity.ProductJpaEntity;
import com.mecafix.domain.model.entity.product.Category;
import com.mecafix.domain.model.entity.product.Product;
import com.mecafix.domain.model.valueobject.Price;

public class ProductMapper {
    public static ProductJpaEntity toPersistence(Product product, CategoryJpaEntity categoryJpaEntity) {
        return new ProductJpaEntity(product.getId(), product.getName(), product.getDescription(),
                product.getPrice().purchasePrice(), product.getPrice().salePrice(), (long)product.getStock(), categoryJpaEntity);
    }

    public static Product toDomain(ProductJpaEntity productJpaEntity, Category category) {
        return Product.reBuild(productJpaEntity.getID(),
                productJpaEntity.getName(), productJpaEntity.getDescription(),
                new Price(productJpaEntity.getPurchasePrice(), productJpaEntity.getSalePrice()), (int)productJpaEntity.getStock(),
                category);
    }
}
