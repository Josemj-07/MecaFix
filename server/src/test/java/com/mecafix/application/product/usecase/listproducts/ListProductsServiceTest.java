package com.mecafix.application.product.usecase.listproducts;

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
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ListProductsServiceTest {

    @Mock
    private ProductRepositoryPort productRepository;

    private ListProductsService listProductsService;

    @BeforeEach
    void setUp() {
        listProductsService = new ListProductsService(productRepository);
    }

    @Test
    void execute_ShouldReturnAllProducts() {
        Category category = Category.create("Cat");
        Product p1 = Product.create("P1", "D1", new Price(BigDecimal.ONE, BigDecimal.TEN), 10, category);
        Product p2 = Product.create("P2", "D2", new Price(BigDecimal.TEN, BigDecimal.TEN), 5, category);

        when(productRepository.findAll()).thenReturn(List.of(p1, p2));

        ListProductsResult result = listProductsService.execute(new ListProductsCommand());

        assertEquals(2, result.products().size());
    }
}
