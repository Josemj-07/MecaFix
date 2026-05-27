package com.mecafix.infrastructure.rest.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.mecafix.application.service.usecase.createservice.CreateServiceCommand;
import com.mecafix.application.service.usecase.createservice.CreateServiceResult;
import com.mecafix.application.service.usecase.createservice.CreateServiceUseCase;
import com.mecafix.application.service.usecase.getservice.GetServiceCommand;
import com.mecafix.application.service.usecase.getservice.GetServiceResult;
import com.mecafix.application.service.usecase.getservice.GetServiceUseCase;
import com.mecafix.application.service.usecase.listservices.ListServicesCommand;
import com.mecafix.application.service.usecase.listservices.ListServicesResult;
import com.mecafix.application.service.usecase.listservices.ListServicesUseCase;
import com.mecafix.application.service.usecase.updateservice.UpdateServiceCommand;
import com.mecafix.application.service.usecase.updateservice.UpdateServiceUseCase;

import java.math.BigDecimal;
import java.net.URI;

@RestController
@RequestMapping("/api/v1/services")
@Slf4j
public class ServiceController {

    private final CreateServiceUseCase createServiceUseCase;
    private final GetServiceUseCase getServiceUseCase;
    private final ListServicesUseCase listServicesUseCase;
    private final UpdateServiceUseCase updateServiceUseCase;

    public ServiceController(
            CreateServiceUseCase createServiceUseCase,
            GetServiceUseCase getServiceUseCase,
            ListServicesUseCase listServicesUseCase,
            UpdateServiceUseCase updateServiceUseCase) {
        this.createServiceUseCase = createServiceUseCase;
        this.getServiceUseCase = getServiceUseCase;
        this.listServicesUseCase = listServicesUseCase;
        this.updateServiceUseCase = updateServiceUseCase;
    }

    @PostMapping
    public ResponseEntity<CreateServiceResult> create(
            @RequestBody CreateServiceCommand command) {
        log.info("REST | POST /services | name={}", command.name());
        CreateServiceResult result = createServiceUseCase.execute(command);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(result.id())
                .toUri();
        return ResponseEntity.created(location).body(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GetServiceResult> getById(
            @PathVariable String id) {
        log.debug("REST | GET /services/{}", id);
        GetServiceResult result = getServiceUseCase.execute(new GetServiceCommand(id));
        return ResponseEntity.ok(result);
    }

    @GetMapping
    public ResponseEntity<ListServicesResult> listAll() {
        log.debug("REST | GET /services");
        ListServicesResult result = listServicesUseCase.execute(new ListServicesCommand());
        return ResponseEntity.ok(result);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Void> update(
            @PathVariable String id,
            @RequestBody UpdateServiceBody body) {
        log.info("REST | PATCH /services/{}", id);
        UpdateServiceCommand command = new UpdateServiceCommand(id, body.description(), body.laborPrice());
        updateServiceUseCase.execute(command);
        return ResponseEntity.noContent().build();
    }

    public record UpdateServiceBody(String description, BigDecimal laborPrice) {
    }
}
