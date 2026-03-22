package com.mecafix.domain.model.valueobject;

import com.mecafix.domain.model.valueobject.Price;
import com.mecafix.shared.exceptions.InvalidQuoteException;

import java.math.BigDecimal;

public class QuoteProductDetail {

    private final Product product;
    private final int quantity;
    private final Price appliedPrice;

    public QuoteProductDetail(Product product, int quantity) {
        if (product == null) {
            throw new InvalidQuoteException("Product must not be null");
        }
        if (quantity <= 0) {
            throw new InvalidQuoteException("Quantity must be greater than zero");
        }
        this.product = product;
        this.quantity = quantity;
        this.appliedPrice = product.getPrice();
    }

    public Product getProduct() {
        return product;
    }

    public int getQuantity() {
        return quantity;
    }

    public Price getAppliedPrice() {
        return appliedPrice;
    }

    public BigDecimal calculateSubTotal() {
        return appliedPrice.salePrice().multiply(BigDecimal.valueOf(quantity));
    }

}
