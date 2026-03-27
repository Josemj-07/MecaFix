package com.mecafix.domain.model.entity.product;

import com.mecafix.domain.exceptions.InvalidProductDetailException;
import com.mecafix.domain.exceptions.InvalidProductException;
import com.mecafix.domain.model.contract.IPayable;
import com.mecafix.domain.model.valueobject.Price;

import java.math.BigDecimal;
import java.util.UUID;

public class ProductDetail implements IPayable {
    private final UUID id;
    private final Product product;
    private final Long quantity;
    private final Price appliedPrice;

    public static ProductDetail create(Product product, Long quantity) {
        return new ProductDetail(product, quantity);
    }

    private ProductDetail(Product product, Long quantity) {
        if (product == null) throw new InvalidProductDetailException("Product must not be null");
        if(quantity == null) throw new InvalidProductDetailException("Quantity must not be null");
        if (quantity <= 0) throw new InvalidProductDetailException("Quantity must be greater than zero");
        if(quantity > product.getStock()) throw new InvalidProductException("Insufficient stock for the requested quantity");

        this.id = UUID.randomUUID();
        this.product = product;
        this.quantity = quantity;
        this.appliedPrice = product.getPrice();
    }

    public Product getProduct() {
        return product;
    }

    public Long getQuantity() {
        return quantity;
    }

    public Price getAppliedPrice() {
        return appliedPrice;
    }

    @Override
    public BigDecimal calculateSubTotal() {
        return appliedPrice.salePrice().multiply(BigDecimal.valueOf(quantity));
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ProductDetail)) return false;
        ProductDetail that = (ProductDetail) o;
        return this.id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }

}
