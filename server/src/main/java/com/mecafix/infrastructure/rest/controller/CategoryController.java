package com.mecafix.infrastructure.rest.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.mecafix.application.category.usecase.createcategory.CreateCategoryCommand;
import com.mecafix.application.category.usecase.createcategory.CreateCategoryResult;
import com.mecafix.application.category.usecase.createcategory.CreateCategoryUseCase;
import com.mecafix.application.category.usecase.getcategory.GetCategoryCommand;
import com.mecafix.application.category.usecase.getcategory.GetCategoryResult;
import com.mecafix.application.category.usecase.getcategory.GetCategoryUseCase;
import com.mecafix.application.category.usecase.listcategories.ListCategoriesCommand;
import com.mecafix.application.category.usecase.listcategories.ListCategoriesResult;
import com.mecafix.application.category.usecase.listcategories.ListCategoriesUseCase;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/categories")
@Slf4j
public class CategoryController {

    private final CreateCategoryUseCase createCategoryUseCase;
    private final GetCategoryUseCase getCategoryUseCase;
    private final ListCategoriesUseCase listCategoriesUseCase;

    public CategoryController(
            CreateCategoryUseCase createCategoryUseCase,
            GetCategoryUseCase getCategoryUseCase,
            ListCategoriesUseCase listCategoriesUseCase) {
        this.createCategoryUseCase = createCategoryUseCase;
        this.getCategoryUseCase = getCategoryUseCase;
        this.listCategoriesUseCase = listCategoriesUseCase;
    }

    @PostMapping
    public ResponseEntity<CreateCategoryResult> create(
            @RequestBody CreateCategoryCommand command) {
        log.info("REST | POST /categories | name={}", command.name());
        CreateCategoryResult result = createCategoryUseCase.execute(command);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(result.id())
                .toUri();
        return ResponseEntity.created(location).body(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GetCategoryResult> getById(
            @PathVariable String id) {
        log.debug("REST | GET /categories/{}", id);
        GetCategoryResult result = getCategoryUseCase.execute(new GetCategoryCommand(id));
        return ResponseEntity.ok(result);
    }

    @GetMapping
    public ResponseEntity<ListCategoriesResult> listAll() {
        log.debug("REST | GET /categories");
        ListCategoriesResult result = listCategoriesUseCase.execute(new ListCategoriesCommand());
        return ResponseEntity.ok(result);
    }
}
