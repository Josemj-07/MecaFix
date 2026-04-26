package com.mecafix.infrastructure.rest.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.mecafix.application.vehicle.usecase.register.RegisterVehicleCommand;
import com.mecafix.application.vehicle.usecase.register.RegisterVehicleResult;
import com.mecafix.application.vehicle.usecase.register.RegisterVehicleUseCase;
import com.mecafix.application.vehicle.usecase.update.UpdateVehicleCommand;
import com.mecafix.application.vehicle.usecase.update.UpdateVehicleUseCase;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/vehicles")
@Slf4j
public class VehicleController {

    private final RegisterVehicleUseCase registerVehicleUseCase;
    private final UpdateVehicleUseCase updateVehicleUseCase;

    public VehicleController(
            RegisterVehicleUseCase registerVehicleUseCase,
            UpdateVehicleUseCase updateVehicleUseCase) {
        this.registerVehicleUseCase = registerVehicleUseCase;
        this.updateVehicleUseCase = updateVehicleUseCase;
    }

    @PostMapping
    public ResponseEntity<RegisterVehicleResult> register(
            @RequestBody RegisterVehicleCommand command) {
        log.info("REST | POST /vehicles | plate={}", command.plate());
        RegisterVehicleResult result = registerVehicleUseCase.execute(command);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(result.id())
                .toUri();
        return ResponseEntity.created(location).body(result);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Void> update(
            @PathVariable String id,
            @RequestBody UpdateVehicleBody body) {
        log.info("REST | PATCH /vehicles/{}", id);
        UpdateVehicleCommand command = new UpdateVehicleCommand(id, body.mileage(), body.color());
        updateVehicleUseCase.execute(command);
        return ResponseEntity.noContent().build();
    }

    public record UpdateVehicleBody(Long mileage, String color) {}
}
