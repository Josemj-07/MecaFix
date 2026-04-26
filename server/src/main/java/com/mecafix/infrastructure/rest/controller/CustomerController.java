package com.mecafix.infrastructure.rest.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.mecafix.application.customer.usecase.createcustomer.CreateCustomerCommand;
import com.mecafix.application.customer.usecase.createcustomer.CreateCustomerResult;
import com.mecafix.application.customer.usecase.createcustomer.CreateCustomerUseCase;
import com.mecafix.application.customer.usecase.getcustomer.GetCustomerCommand;
import com.mecafix.application.customer.usecase.getcustomer.GetCustomerResult;
import com.mecafix.application.customer.usecase.getcustomer.GetCustomerUseCase;
import com.mecafix.application.customer.usecase.getcustomervehicles.GetCustomerVehiclesCommand;
import com.mecafix.application.customer.usecase.getcustomervehicles.GetCustomerVehiclesResult;
import com.mecafix.application.customer.usecase.getcustomervehicles.GetCustomerVehiclesUseCase;
import com.mecafix.application.customer.usecase.listcustomers.ListCustomersCommand;
import com.mecafix.application.customer.usecase.listcustomers.ListCustomersResult;
import com.mecafix.application.customer.usecase.listcustomers.ListCustomersUseCase;
import com.mecafix.application.customer.usecase.updatecustomer.UpdateCustomerCommand;
import com.mecafix.application.customer.usecase.updatecustomer.UpdateCustomerUseCase;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/customers")
@Slf4j
public class CustomerController {

    private final CreateCustomerUseCase createCustomerUseCase;
    private final GetCustomerUseCase getCustomerUseCase;
    private final GetCustomerVehiclesUseCase getCustomerVehiclesUseCase;
    private final ListCustomersUseCase listCustomersUseCase;
    private final UpdateCustomerUseCase updateCustomerUseCase;

    public CustomerController(
            CreateCustomerUseCase createCustomerUseCase,
            GetCustomerUseCase getCustomerUseCase,
            GetCustomerVehiclesUseCase getCustomerVehiclesUseCase,
            ListCustomersUseCase listCustomersUseCase,
            UpdateCustomerUseCase updateCustomerUseCase) {
        this.createCustomerUseCase = createCustomerUseCase;
        this.getCustomerUseCase = getCustomerUseCase;
        this.getCustomerVehiclesUseCase = getCustomerVehiclesUseCase;
        this.listCustomersUseCase = listCustomersUseCase;
        this.updateCustomerUseCase = updateCustomerUseCase;
    }

    @PostMapping
    public ResponseEntity<CreateCustomerResult> create(
            @RequestBody CreateCustomerCommand command) {
        log.info("REST | POST /customers | email={}", command.email());
        CreateCustomerResult result = createCustomerUseCase.execute(command);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(result.id())
                .toUri();
        return ResponseEntity.created(location).body(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GetCustomerResult> getById(
            @PathVariable String id) {
        log.debug("REST | GET /customers/{}", id);
        GetCustomerResult result = getCustomerUseCase.execute(new GetCustomerCommand(id));
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}/vehicles")
    public ResponseEntity<GetCustomerVehiclesResult> getVehicles(
            @PathVariable String id) {
        log.debug("REST | GET /customers/{}/vehicles", id);
        GetCustomerVehiclesResult result = getCustomerVehiclesUseCase.execute(new GetCustomerVehiclesCommand(id));
        return ResponseEntity.ok(result);
    }

    @GetMapping
    public ResponseEntity<ListCustomersResult> listAll() {
        log.debug("REST | GET /customers");
        ListCustomersResult result = listCustomersUseCase.execute(new ListCustomersCommand());
        return ResponseEntity.ok(result);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Void> update(
            @PathVariable String id,
            @RequestBody UpdateCustomerBody body) {
        log.info("REST | PATCH /customers/{}", id);
        UpdateCustomerCommand command = new UpdateCustomerCommand(id, body.email(), body.mobilePhone(), body.nationalId());
        updateCustomerUseCase.execute(command);
        return ResponseEntity.noContent().build();
    }

    public record UpdateCustomerBody(String email, String mobilePhone, String nationalId) {}
}
