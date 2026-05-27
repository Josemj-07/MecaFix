package com.mecafix.application.mechanic.usecase.getmechanic;

import com.mecafix.application.mechanic.mapper.MechanicMapper;

import com.mecafix.domain.model.entity.person.Mechanic;
import com.mecafix.application.exceptions.MechanicNotFoundException;
import com.mecafix.domain.port.mechanic.MechanicRepositoryPort;

import java.util.UUID;

public class GetMechanicUseCase {

    private final MechanicRepositoryPort mechanicRepository;

    public GetMechanicUseCase(MechanicRepositoryPort mechanicRepository) {
        this.mechanicRepository = mechanicRepository;
    }

    public GetMechanicResult execute(GetMechanicCommand command) {

        Mechanic mechanic = mechanicRepository.findById(UUID.fromString(command.mechanicId()))
                .orElseThrow(() -> new MechanicNotFoundException("Mechanic not found with id " + command.mechanicId()));

        return MechanicMapper.toGetResult(mechanic);
    }
}
