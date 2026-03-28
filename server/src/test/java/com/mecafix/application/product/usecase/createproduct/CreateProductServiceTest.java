package com.mecafix.application.product.usecase.createproduct;

import com.mecafix.application.category.port.out.CategoryRepositoryPort;
import com.mecafix.application.product.port.out.ProductRepositoryPort;
import com.mecafix.domain.model.entity.product.Category;
import com.mecafix.domain.model.entity.product.Product;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CreateProductServiceTest {

    @Mock
    private ProductRepositoryPort productRepository;

    @Mock
    private CategoryRepositoryPort categoryRepository;

    private CreateProductService createProductService;

    @BeforeEach
    void setUp() {
        createProductService = new CreateProductService(productRepository, categoryRepository);
    }

    @Test
    void execute_ShouldCreateProductAndSave() {
        Category category = Category.create("Filters");
        when(categoryRepository.findById(category.getId())).thenReturn(Optional.of(category));

        CreateProductCommand command = new CreateProductCommand("Oil Filter", "Desc", BigDecimal.valueOf(5), BigDecimal.valueOf(10), 100, category.getId().toString());

        CreateProductResult result = createProductService.execute(command);

        assertNotNull(result.id());
        assertEquals("Oil Filter", result.name());
        assertEquals(100, result.stock());
        assertEquals("Filters", result.categoryName());

        verify(productRepository).save(any(Product.class));
    }
}
