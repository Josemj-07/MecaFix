package com.mecafix.infrastructure.rest.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.mecafix.application.serviceorder.usecase.advanceorderstatus.AdvanceOrderStatusCommand;
import com.mecafix.application.serviceorder.usecase.advanceorderstatus.AdvanceOrderStatusUseCase;
import com.mecafix.application.serviceorder.usecase.completetask.CompleteTaskCommand;
import com.mecafix.application.serviceorder.usecase.completetask.CompleteTaskUseCase;
import com.mecafix.application.serviceorder.usecase.createserviceorder.CreateServiceOrderCommand;
import com.mecafix.application.serviceorder.usecase.createserviceorder.CreateServiceOrderResult;
import com.mecafix.application.serviceorder.usecase.createserviceorder.CreateServiceOrderUseCase;
import com.mecafix.application.serviceorder.usecase.getserviceorder.GetServiceOrderCommand;
import com.mecafix.application.serviceorder.usecase.getserviceorder.GetServiceOrderResult;
import com.mecafix.application.serviceorder.usecase.getserviceorder.GetServiceOrderUseCase;
import com.mecafix.application.serviceorder.usecase.listserviceorders.ListServiceOrdersCommand;
import com.mecafix.application.serviceorder.usecase.listserviceorders.ListServiceOrdersResult;
import com.mecafix.application.serviceorder.usecase.listserviceorders.ListServiceOrdersUseCase;
import com.mecafix.application.serviceorder.usecase.starttask.StartTaskCommand;
import com.mecafix.application.serviceorder.usecase.starttask.StartTaskUseCase;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/service-orders")
@Slf4j
public class ServiceOrderController {

    private final AdvanceOrderStatusUseCase advanceOrderStatusUseCase;
    private final CompleteTaskUseCase completeTaskUseCase;
    private final CreateServiceOrderUseCase createServiceOrderUseCase;
    private final GetServiceOrderUseCase getServiceOrderUseCase;
    private final ListServiceOrdersUseCase listServiceOrdersUseCase;
    private final StartTaskUseCase startTaskUseCase;

    public ServiceOrderController(
            AdvanceOrderStatusUseCase advanceOrderStatusUseCase,
            CompleteTaskUseCase completeTaskUseCase,
            CreateServiceOrderUseCase createServiceOrderUseCase,
            GetServiceOrderUseCase getServiceOrderUseCase,
            ListServiceOrdersUseCase listServiceOrdersUseCase,
            StartTaskUseCase startTaskUseCase) {
        this.advanceOrderStatusUseCase = advanceOrderStatusUseCase;
        this.completeTaskUseCase = completeTaskUseCase;
        this.createServiceOrderUseCase = createServiceOrderUseCase;
        this.getServiceOrderUseCase = getServiceOrderUseCase;
        this.listServiceOrdersUseCase = listServiceOrdersUseCase;
        this.startTaskUseCase = startTaskUseCase;
    }

    @PostMapping
    public ResponseEntity<CreateServiceOrderResult> create(
            @RequestBody CreateServiceOrderCommand command) {
        log.info("REST | POST /service-orders | quoteId={}", command.quoteId());
        CreateServiceOrderResult result = createServiceOrderUseCase.execute(command);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(result.id())
                .toUri();
        return ResponseEntity.created(location).body(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GetServiceOrderResult> getById(
            @PathVariable String id) {
        log.debug("REST | GET /service-orders/{}", id);
        GetServiceOrderResult result = getServiceOrderUseCase.execute(new GetServiceOrderCommand(id));
        return ResponseEntity.ok(result);
    }

    @GetMapping
    public ResponseEntity<ListServiceOrdersResult> listAll() {
        log.debug("REST | GET /service-orders");
        ListServiceOrdersResult result = listServiceOrdersUseCase.execute(new ListServiceOrdersCommand());
        return ResponseEntity.ok(result);
    }

    @PatchMapping("/{id}/advance-status")
    public ResponseEntity<Void> advanceStatus(
            @PathVariable String id) {
        log.info("REST | PATCH /service-orders/{}/advance-status", id);
        advanceOrderStatusUseCase.execute(new AdvanceOrderStatusCommand(id));
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{serviceOrderId}/tasks/{taskId}/start")
    public ResponseEntity<Void> startTask(
            @PathVariable String serviceOrderId,
            @PathVariable String taskId) {
        log.info("REST | PATCH /service-orders/{}/tasks/{}/start", serviceOrderId, taskId);
        startTaskUseCase.execute(new StartTaskCommand(serviceOrderId, taskId));
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{serviceOrderId}/tasks/{taskId}/complete")
    public ResponseEntity<Void> completeTask(
            @PathVariable String serviceOrderId,
            @PathVariable String taskId) {
        log.info("REST | PATCH /service-orders/{}/tasks/{}/complete", serviceOrderId, taskId);
        completeTaskUseCase.execute(new CompleteTaskCommand(serviceOrderId, taskId));
        return ResponseEntity.noContent().build();
    }
}
