package com.mecafix.domain.model.entity.product;

import com.mecafix.domain.model.valueobject.Price;
import com.mecafix.domain.exceptions.InvalidProductException;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

class ProductTest {

    @Test
    void testCreateProduct_ShouldCreateSuccessfully() {
        Category category = Category.create("Filters");
        Product product = Product.create("Oil Filter", "Generic oil filter", new Price(BigDecimal.valueOf(10.0), BigDecimal.valueOf(20.0)), 50, category);

        assertNotNull(product.getId());
        assertEquals("Oil Filter", product.getName());
        assertEquals(50, product.getStock());
    }

    @Test
    void testIncreaseStock_ShouldAddStock() {
        Category category = Category.create("Filters");
        Product product = Product.create("Oil Filter", "Generic oil filter", new Price(BigDecimal.valueOf(10.0), BigDecimal.valueOf(20.0)), 50, category);

        product.increaseStock(10);

        assertEquals(60, product.getStock());
    }

    @Test
    void testDecreaseStock_ShouldSubtractStock() {
        Category category = Category.create("Filters");
        Product product = Product.create("Oil Filter", "Generic oil filter", new Price(BigDecimal.valueOf(10.0), BigDecimal.valueOf(20.0)), 50, category);

        product.decreaseStock(10);

        assertEquals(40, product.getStock());
    }

    @Test
    void testDecreaseStock_ShouldThrowExceptionWhenInsufficientStock() {
        Category category = Category.create("Filters");
        Product product = Product.create("Oil Filter", "Generic oil filter", new Price(BigDecimal.valueOf(10.0), BigDecimal.valueOf(20.0)), 10, category);

        assertThrows(InvalidProductException.class, () -> product.decreaseStock(20));
    }
}
