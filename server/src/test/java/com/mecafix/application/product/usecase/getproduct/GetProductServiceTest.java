package com.mecafix.application.product.usecase.getproduct;

import com.mecafix.application.product.port.out.ProductRepositoryPort;
import com.mecafix.domain.model.entity.product.Category;
import com.mecafix.domain.model.entity.product.Product;
import com.mecafix.domain.model.valueobject.Price;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class GetProductServiceTest {

    @Mock
    private ProductRepositoryPort productRepository;

    private GetProductService getProductService;

    @BeforeEach
    void setUp() {
        getProductService = new GetProductService(productRepository);
    }

    @Test
    void execute_ShouldReturnProduct_WhenItExists() {
        Category category = Category.create("Cat");
        Product product = Product.create("Tire", "A tire", new Price(BigDecimal.TEN, BigDecimal.valueOf(20)), 4, category);
        when(productRepository.findById(product.getId())).thenReturn(Optional.of(product));

        GetProductResult result = getProductService.execute(new GetProductCommand(product.getId().toString()));

        assertNotNull(result);
        assertEquals(product.getId(), result.id());
        assertEquals("Tire", result.name());
    }
}
