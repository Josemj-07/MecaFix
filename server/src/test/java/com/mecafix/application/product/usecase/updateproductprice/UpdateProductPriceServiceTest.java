package com.mecafix.application.product.usecase.updateproductprice;


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
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UpdateProductPriceServiceTest {

    @Mock
    private ProductRepositoryPort productRepository;

    private UpdateProductPriceUseCase updateProductPriceUseCase;

    @BeforeEach
    void setUp() {
        updateProductPriceUseCase = new UpdateProductPriceUseCase(productRepository);
    }

    @Test
    void execute_ShouldUpdatePrice() {
        Category category = Category.create("Cat");
        Product product = Product.create("P1", "D1", new Price(BigDecimal.ONE, BigDecimal.TEN), 10, category);
        when(productRepository.findById(product.getId())).thenReturn(Optional.of(product));

        UpdateProductPriceCommand command = new UpdateProductPriceCommand(product.getId().toString(), BigDecimal.valueOf(5), BigDecimal.valueOf(15));
        UpdateProductPriceResult result = updateProductPriceUseCase.execute(command);

        assertEquals(BigDecimal.valueOf(5), result.purchasePrice());
        assertEquals(BigDecimal.valueOf(15), result.salePrice());

        verify(productRepository).save(any(Product.class));
    }
}
