package com.mecafix.adapter.out.persistence.mapper;

import com.mecafix.adapter.out.persistence.entity.ProductDetailJpaEntity;
import com.mecafix.adapter.out.persistence.entity.ProductJpaEntity;
import com.mecafix.adapter.out.persistence.entity.QuoteJpaEntity;
import com.mecafix.domain.model.entity.product.Product;
import com.mecafix.domain.model.entity.product.ProductDetail;


public class ProductDetailMapper {
    public static ProductDetailJpaEntity toPersistence(ProductDetail productDetail, ProductJpaEntity productDetailJpaEntity, QuoteJpaEntity quoteJpaEntity) {
        return new ProductDetailJpaEntity(
                productDetail.getId(), productDetail.getQuantity(), productDetail.getAppliedPrice().salePrice(),
                productDetailJpaEntity , quoteJpaEntity
        );
    }

    public static ProductDetail toDomain(ProductDetailJpaEntity productDetailJpa, Product product) {
        return ProductDetail.reBuild(productDetailJpa.getId(), product ,productDetailJpa.getQuantity());
    }
}
