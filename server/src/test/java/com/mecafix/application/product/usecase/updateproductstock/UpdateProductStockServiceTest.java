package com.mecafix.application.product.usecase.updateproductstock;

import com.mecafix.domain.model.entity.product.Category;
import com.mecafix.domain.model.entity.product.Product;
import com.mecafix.domain.model.valueobject.Price;
import com.mecafix.domain.port.product.ProductRepositoryPort;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UpdateProductStockServiceTest {

    @Mock
    private ProductRepositoryPort productRepository;

    private UpdateProductStockUseCase updateProductStockUseCase;

    @BeforeEach
    void setUp() {
        updateProductStockUseCase = new UpdateProductStockUseCase(productRepository);
    }

    @Test
    void execute_ShouldIncreaseStock() {
        Category category = Category.create("Cat");
        Product product = Product.create("P1", "D1", new Price(BigDecimal.ONE, BigDecimal.TEN), 10, category);
        when(productRepository.findById(product.getId())).thenReturn(Optional.of(product));

        UpdateProductStockCommand command = new UpdateProductStockCommand(product.getId().toString(), 5, "INCREASE");
        UpdateProductStockResult result = updateProductStockUseCase.execute(command);

        assertEquals(15, result.stock());
        verify(productRepository).save(any(Product.class));
    }
    
    @Test
    void execute_ShouldDecreaseStock() {
        Category category = Category.create("Cat");
        Product product = Product.create("P1", "D1", new Price(BigDecimal.ONE, BigDecimal.TEN), 10, category);
        when(productRepository.findById(product.getId())).thenReturn(Optional.of(product));

        UpdateProductStockCommand command = new UpdateProductStockCommand(product.getId().toString(), 5, "DECREASE");
        UpdateProductStockResult result = updateProductStockUseCase.execute(command);

        assertEquals(5, result.stock());
        verify(productRepository).save(any(Product.class));
    }
    
    @Test
    void execute_ShouldThrowException_WhenInvalidOperation() {
        Category category = Category.create("Cat");
        Product product = Product.create("P1", "D1", new Price(BigDecimal.ONE, BigDecimal.TEN), 10, category);
        when(productRepository.findById(product.getId())).thenReturn(Optional.of(product));

        UpdateProductStockCommand command = new UpdateProductStockCommand(product.getId().toString(), 5, "INVALID");
        assertThrows(IllegalArgumentException.class, () -> updateProductStockUseCase.execute(command));
    }
}
