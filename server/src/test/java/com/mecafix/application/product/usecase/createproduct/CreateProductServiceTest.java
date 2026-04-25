package com.mecafix.application.product.usecase.createproduct;

import com.mecafix.domain.model.entity.product.Category;
import com.mecafix.domain.model.entity.product.Product;
import com.mecafix.domain.port.category.CategoryRepositoryPort;
import com.mecafix.domain.port.product.ProductRepositoryPort;
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

    private CreateProductUseCase createProductUseCase;

    @BeforeEach
    void setUp() {
        createProductUseCase = new CreateProductUseCase(productRepository, categoryRepository);
    }

    @Test
    void execute_ShouldCreateProductAndSave() {
        Category category = Category.create("Filters");
        when(categoryRepository.findById(category.getId())).thenReturn(Optional.of(category));

        CreateProductCommand command = new CreateProductCommand("Oil Filter", "Desc", BigDecimal.valueOf(5), BigDecimal.valueOf(10), 100, category.getId().toString());

        CreateProductResult result = createProductUseCase.execute(command);

        assertNotNull(result.id());
        assertEquals("Oil Filter", result.name());
        assertEquals(100, result.stock());
        assertEquals("Filters", result.categoryName());

        verify(productRepository).save(any(Product.class));
    }
}
