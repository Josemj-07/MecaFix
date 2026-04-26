package com.mecafix.infrastructure.rest.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.mecafix.application.payment.usecase.getpayment.GetPaymentCommand;
import com.mecafix.application.payment.usecase.getpayment.GetPaymentResult;
import com.mecafix.application.payment.usecase.getpayment.GetPaymentUseCase;
import com.mecafix.application.payment.usecase.registerpayment.RegisterPaymentCommand;
import com.mecafix.application.payment.usecase.registerpayment.RegisterPaymentResult;
import com.mecafix.application.payment.usecase.registerpayment.RegisterPaymentUseCase;
import com.mecafix.application.payment.usecase.validatepayment.ValidatePaymentCommand;
import com.mecafix.application.payment.usecase.validatepayment.ValidatePaymentUseCase;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/payments")
@Slf4j
public class PaymentController {

    private final GetPaymentUseCase getPaymentUseCase;
    private final RegisterPaymentUseCase registerPaymentUseCase;
    private final ValidatePaymentUseCase validatePaymentUseCase;

    public PaymentController(
            GetPaymentUseCase getPaymentUseCase,
            RegisterPaymentUseCase registerPaymentUseCase,
            ValidatePaymentUseCase validatePaymentUseCase) {
        this.getPaymentUseCase = getPaymentUseCase;
        this.registerPaymentUseCase = registerPaymentUseCase;
        this.validatePaymentUseCase = validatePaymentUseCase;
    }

    @PostMapping
    public ResponseEntity<RegisterPaymentResult> register(
            @RequestBody RegisterPaymentCommand command) {
        log.info("REST | POST /payments | serviceOrderId={}", command.serviceOrderId());
        RegisterPaymentResult result = registerPaymentUseCase.execute(command);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(result.id())
                .toUri();
        return ResponseEntity.created(location).body(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GetPaymentResult> getById(
            @PathVariable String id) {
        log.debug("REST | GET /payments/{}", id);
        GetPaymentResult result = getPaymentUseCase.execute(new GetPaymentCommand(id));
        return ResponseEntity.ok(result);
    }

    @PatchMapping("/{id}/validate")
    public ResponseEntity<Void> validate(
            @PathVariable String id) {
        log.info("REST | PATCH /payments/{}/validate", id);
        validatePaymentUseCase.execute(new ValidatePaymentCommand(id));
        return ResponseEntity.noContent().build();
    }
}
