package com.mecafix.infrastructure.rest.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.mecafix.application.quote.usecase.additemtoquote.AddItemToQuoteCommand;
import com.mecafix.application.quote.usecase.additemtoquote.AddItemToQuoteResult;
import com.mecafix.application.quote.usecase.additemtoquote.AddItemToQuoteUseCase;
import com.mecafix.application.quote.usecase.approvequote.ApproveQuoteCommand;
import com.mecafix.application.quote.usecase.approvequote.ApproveQuoteResult;
import com.mecafix.application.quote.usecase.approvequote.ApproveQuoteUseCase;
import com.mecafix.application.quote.usecase.createquote.CreateQuoteCommand;
import com.mecafix.application.quote.usecase.createquote.CreateQuoteResult;
import com.mecafix.application.quote.usecase.createquote.CreateQuoteUseCase;
import com.mecafix.application.quote.usecase.getquote.GetQuoteCommand;
import com.mecafix.application.quote.usecase.getquote.GetQuoteResult;
import com.mecafix.application.quote.usecase.getquote.GetQuoteUseCase;
import com.mecafix.application.quote.usecase.listcustomerquotes.ListCustomerQuotesCommand;
import com.mecafix.application.quote.usecase.listcustomerquotes.ListCustomerQuotesResult;
import com.mecafix.application.quote.usecase.listcustomerquotes.ListCustomerQuotesUseCase;
import com.mecafix.application.quote.usecase.rejectquote.RejectQuoteCommand;
import com.mecafix.application.quote.usecase.rejectquote.RejectQuoteUseCase;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/quotes")
@Slf4j
public class QuoteController {

    private final AddItemToQuoteUseCase addItemToQuoteUseCase;
    private final ApproveQuoteUseCase approveQuoteUseCase;
    private final CreateQuoteUseCase createQuoteUseCase;
    private final GetQuoteUseCase getQuoteUseCase;
    private final ListCustomerQuotesUseCase listCustomerQuotesUseCase;
    private final RejectQuoteUseCase rejectQuoteUseCase;

    public QuoteController(
            AddItemToQuoteUseCase addItemToQuoteUseCase,
            ApproveQuoteUseCase approveQuoteUseCase,
            CreateQuoteUseCase createQuoteUseCase,
            GetQuoteUseCase getQuoteUseCase,
            ListCustomerQuotesUseCase listCustomerQuotesUseCase,
            RejectQuoteUseCase rejectQuoteUseCase) {
        this.addItemToQuoteUseCase = addItemToQuoteUseCase;
        this.approveQuoteUseCase = approveQuoteUseCase;
        this.createQuoteUseCase = createQuoteUseCase;
        this.getQuoteUseCase = getQuoteUseCase;
        this.listCustomerQuotesUseCase = listCustomerQuotesUseCase;
        this.rejectQuoteUseCase = rejectQuoteUseCase;
    }

    @PostMapping
    public ResponseEntity<CreateQuoteResult> create(
            @RequestBody CreateQuoteCommand command) {
        log.info("REST | POST /quotes | customerId={}", command.customerId());
        CreateQuoteResult result = createQuoteUseCase.execute(command);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(result.id())
                .toUri();
        return ResponseEntity.created(location).body(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GetQuoteResult> getById(
            @PathVariable String id) {
        log.debug("REST | GET /quotes/{}", id);
        GetQuoteResult result = getQuoteUseCase.execute(new GetQuoteCommand(id));
        return ResponseEntity.ok(result);
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<ListCustomerQuotesResult> listByCustomer(
            @PathVariable String customerId) {
        log.debug("REST | GET /quotes/customer/{}", customerId);
        ListCustomerQuotesResult result = listCustomerQuotesUseCase.execute(
                new ListCustomerQuotesCommand(customerId));
        return ResponseEntity.ok(result);
    }

    @PostMapping("/{id}/items")
    public ResponseEntity<AddItemToQuoteResult> addItem(
            @PathVariable String id,
            @RequestBody AddItemToQuoteBody body) {
        log.info("REST | POST /quotes/{}/items", id);
        AddItemToQuoteCommand command = new AddItemToQuoteCommand(id, body.type(), body.itemId(), body.quantity());
        AddItemToQuoteResult result = addItemToQuoteUseCase.execute(command);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @PatchMapping("/{id}/approve")
    public ResponseEntity<ApproveQuoteResult> approve(
            @PathVariable String id) {
        log.info("REST | PATCH /quotes/{}/approve", id);
        ApproveQuoteResult result = approveQuoteUseCase.execute(new ApproveQuoteCommand(id));
        return ResponseEntity.ok(result);
    }

    @PatchMapping("/{id}/reject")
    public ResponseEntity<Void> reject(
            @PathVariable String id) {
        log.info("REST | PATCH /quotes/{}/reject", id);
        rejectQuoteUseCase.execute(new RejectQuoteCommand(id));
        return ResponseEntity.noContent().build();
    }

    public record AddItemToQuoteBody(String type, String itemId, Long quantity) {
    }
}
