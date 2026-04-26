package com.mecafix.infrastructure.rest.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.mecafix.application.product.usecase.createproduct.CreateProductCommand;
import com.mecafix.application.product.usecase.createproduct.CreateProductResult;
import com.mecafix.application.product.usecase.createproduct.CreateProductUseCase;
import com.mecafix.application.product.usecase.getproduct.GetProductCommand;
import com.mecafix.application.product.usecase.getproduct.GetProductResult;
import com.mecafix.application.product.usecase.getproduct.GetProductUseCase;
import com.mecafix.application.product.usecase.listproducts.ListProductsCommand;
import com.mecafix.application.product.usecase.listproducts.ListProductsResult;
import com.mecafix.application.product.usecase.listproducts.ListProductsUseCase;
import com.mecafix.application.product.usecase.updateproductprice.UpdateProductPriceCommand;
import com.mecafix.application.product.usecase.updateproductprice.UpdateProductPriceUseCase;
import com.mecafix.application.product.usecase.updateproductstock.UpdateProductStockCommand;
import com.mecafix.application.product.usecase.updateproductstock.UpdateProductStockUseCase;

import java.math.BigDecimal;
import java.net.URI;

@RestController
@RequestMapping("/api/v1/products")
@Slf4j
public class ProductController {

    private final CreateProductUseCase createProductUseCase;
    private final GetProductUseCase getProductUseCase;
    private final ListProductsUseCase listProductsUseCase;
    private final UpdateProductPriceUseCase updateProductPriceUseCase;
    private final UpdateProductStockUseCase updateProductStockUseCase;

    public ProductController(
            CreateProductUseCase createProductUseCase,
            GetProductUseCase getProductUseCase,
            ListProductsUseCase listProductsUseCase,
            UpdateProductPriceUseCase updateProductPriceUseCase,
            UpdateProductStockUseCase updateProductStockUseCase) {
        this.createProductUseCase = createProductUseCase;
        this.getProductUseCase = getProductUseCase;
        this.listProductsUseCase = listProductsUseCase;
        this.updateProductPriceUseCase = updateProductPriceUseCase;
        this.updateProductStockUseCase = updateProductStockUseCase;
    }

    @PostMapping
    public ResponseEntity<CreateProductResult> create(
            @RequestBody CreateProductCommand command) {
        log.info("REST | POST /products | name={}", command.name());
        CreateProductResult result = createProductUseCase.execute(command);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(result.id())
                .toUri();
        return ResponseEntity.created(location).body(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GetProductResult> getById(
            @PathVariable String id) {
        log.debug("REST | GET /products/{}", id);
        GetProductResult result = getProductUseCase.execute(new GetProductCommand(id));
        return ResponseEntity.ok(result);
    }

    @GetMapping
    public ResponseEntity<ListProductsResult> listAll() {
        log.debug("REST | GET /products");
        ListProductsResult result = listProductsUseCase.execute(new ListProductsCommand());
        return ResponseEntity.ok(result);
    }

    @PatchMapping("/{id}/price")
    public ResponseEntity<Void> updatePrice(
            @PathVariable String id,
            @RequestBody UpdateProductPriceBody body) {
        log.info("REST | PATCH /products/{}/price", id);
        UpdateProductPriceCommand command = new UpdateProductPriceCommand(id, body.purchasePrice(), body.salePrice());
        updateProductPriceUseCase.execute(command);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/stock")
    public ResponseEntity<Void> updateStock(
            @PathVariable String id,
            @RequestBody UpdateProductStockBody body) {
        log.info("REST | PATCH /products/{}/stock", id);
        UpdateProductStockCommand command = new UpdateProductStockCommand(id, body.quantity(), body.operation());
        updateProductStockUseCase.execute(command);
        return ResponseEntity.noContent().build();
    }

    public record UpdateProductPriceBody(BigDecimal purchasePrice, BigDecimal salePrice) {}
    public record UpdateProductStockBody(int quantity, String operation) {}
}
