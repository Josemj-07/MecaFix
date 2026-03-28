package com.mecafix.application.mechanic.usecase.getmechanic;

import com.mecafix.application.mechanic.mapper.MechanicMapper;
import com.mecafix.application.mechanic.port.out.MechanicRepositoryPort;
import com.mecafix.domain.model.entity.person.Mechanic;
import com.mecafix.shared.exceptions.MechanicNotFoundException;

import java.util.UUID;

public class GetMechanicService implements GetMechanicUseCase {

    private final MechanicRepositoryPort mechanicRepository;

    public GetMechanicService(MechanicRepositoryPort mechanicRepository) {
        this.mechanicRepository = mechanicRepository;
    }

    @Override
    public GetMechanicResult execute(GetMechanicCommand command) {

        Mechanic mechanic = mechanicRepository.findById(UUID.fromString(command.mechanicId()))
                .orElseThrow(() -> new MechanicNotFoundException("Mechanic not found with id " + command.mechanicId()));

        return MechanicMapper.toGetResult(mechanic);
    }
}
