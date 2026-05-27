package com.mecafix.application.product.mapper;

import com.mecafix.application.product.usecase.createproduct.CreateProductResult;
import com.mecafix.application.product.usecase.getproduct.GetProductResult;
import com.mecafix.application.product.usecase.listproducts.ListProductsResult;
import com.mecafix.application.product.usecase.updateproductprice.UpdateProductPriceResult;
import com.mecafix.application.product.usecase.updateproductstock.UpdateProductStockResult;
import com.mecafix.domain.model.entity.product.Product;

import java.util.List;

public class ProductMapper {

    private ProductMapper() { }

    public static CreateProductResult toCreateResult(Product product) {
        return new CreateProductResult(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice().purchasePrice(),
                product.getPrice().salePrice(),
                product.getStock(),
                product.getCategory().getName()
        );
    }

    public static GetProductResult toGetResult(Product product) {
        return new GetProductResult(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice().purchasePrice(),
                product.getPrice().salePrice(),
                product.getStock(),
                product.getCategory().getName()
        );
    }

    public static ListProductsResult toListResult(List<Product> products) {
        List<ListProductsResult.ProductResult> results = products.stream()
                .map(ProductMapper::toProductResult)
                .toList();
        return new ListProductsResult(results);
    }

    public static UpdateProductStockResult toUpdateStockResult(Product product) {
        return new UpdateProductStockResult(
                product.getId(),
                product.getName(),
                product.getStock()
        );
    }

    public static UpdateProductPriceResult toUpdatePriceResult(Product product) {
        return new UpdateProductPriceResult(
                product.getId(),
                product.getName(),
                product.getPrice().purchasePrice(),
                product.getPrice().salePrice()
        );
    }

    private static ListProductsResult.ProductResult toProductResult(Product product) {
        return new ListProductsResult.ProductResult(
                product.getId(),
                product.getName(),
                product.getPrice().salePrice(),
                product.getStock(),
                product.getCategory().getName()
        );
    }
}
