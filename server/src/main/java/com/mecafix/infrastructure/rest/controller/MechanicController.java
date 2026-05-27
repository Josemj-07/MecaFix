package com.mecafix.infrastructure.rest.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.mecafix.application.mechanic.usecase.createmechanic.CreateMechanicCommand;
import com.mecafix.application.mechanic.usecase.createmechanic.CreateMechanicResult;
import com.mecafix.application.mechanic.usecase.createmechanic.CreateMechanicUseCase;
import com.mecafix.application.mechanic.usecase.getmechanic.GetMechanicCommand;
import com.mecafix.application.mechanic.usecase.getmechanic.GetMechanicResult;
import com.mecafix.application.mechanic.usecase.getmechanic.GetMechanicUseCase;
import com.mecafix.application.mechanic.usecase.getmechanicsbyspecialty.GetMechanicsBySpecialtyCommand;
import com.mecafix.application.mechanic.usecase.getmechanicsbyspecialty.GetMechanicsBySpecialtyResult;
import com.mecafix.application.mechanic.usecase.getmechanicsbyspecialty.GetMechanicsBySpecialtyUseCase;
import com.mecafix.application.mechanic.usecase.listmechanics.ListMechanicsCommand;
import com.mecafix.application.mechanic.usecase.listmechanics.ListMechanicsResult;
import com.mecafix.application.mechanic.usecase.listmechanics.ListMechanicsUseCase;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/mechanics")
@Slf4j
public class MechanicController {

    private final CreateMechanicUseCase createMechanicUseCase;
    private final GetMechanicUseCase getMechanicUseCase;
    private final GetMechanicsBySpecialtyUseCase getMechanicsBySpecialtyUseCase;
    private final ListMechanicsUseCase listMechanicsUseCase;

    public MechanicController(
            CreateMechanicUseCase createMechanicUseCase,
            GetMechanicUseCase getMechanicUseCase,
            GetMechanicsBySpecialtyUseCase getMechanicsBySpecialtyUseCase,
            ListMechanicsUseCase listMechanicsUseCase) {
        this.createMechanicUseCase = createMechanicUseCase;
        this.getMechanicUseCase = getMechanicUseCase;
        this.getMechanicsBySpecialtyUseCase = getMechanicsBySpecialtyUseCase;
        this.listMechanicsUseCase = listMechanicsUseCase;
    }

    @PostMapping
    public ResponseEntity<CreateMechanicResult> create(
            @RequestBody CreateMechanicCommand command) {
        log.info("REST | POST /mechanics | email={}", command.email());
        CreateMechanicResult result = createMechanicUseCase.execute(command);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(result.id())
                .toUri();
        return ResponseEntity.created(location).body(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GetMechanicResult> getById(
            @PathVariable String id) {
        log.debug("REST | GET /mechanics/{}", id);
        GetMechanicResult result = getMechanicUseCase.execute(new GetMechanicCommand(id));
        return ResponseEntity.ok(result);
    }

    @GetMapping
    public ResponseEntity<ListMechanicsResult> listAll() {
        log.debug("REST | GET /mechanics");
        ListMechanicsResult result = listMechanicsUseCase.execute(new ListMechanicsCommand());
        return ResponseEntity.ok(result);
    }

    @GetMapping("/specialty/{specialty}")
    public ResponseEntity<GetMechanicsBySpecialtyResult> getBySpecialty(
            @PathVariable String specialty) {
        log.debug("REST | GET /mechanics/specialty/{}", specialty);
        GetMechanicsBySpecialtyResult result = getMechanicsBySpecialtyUseCase.execute(
                new GetMechanicsBySpecialtyCommand(specialty));
        return ResponseEntity.ok(result);
    }
}
