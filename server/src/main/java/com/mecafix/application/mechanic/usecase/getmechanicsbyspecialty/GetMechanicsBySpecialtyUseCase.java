package com.mecafix.application.mechanic.usecase.getmechanicsbyspecialty;

import com.mecafix.application.mechanic.mapper.MechanicMapper;

import com.mecafix.domain.model.entity.person.Mechanic;
import com.mecafix.domain.model.enums.Specialty;
import com.mecafix.domain.port.mechanic.MechanicRepositoryPort;

import java.util.List;

public class GetMechanicsBySpecialtyUseCase {

    private final MechanicRepositoryPort mechanicRepository;

    public GetMechanicsBySpecialtyUseCase(MechanicRepositoryPort mechanicRepository) {
        this.mechanicRepository = mechanicRepository;
    }

    public GetMechanicsBySpecialtyResult execute(GetMechanicsBySpecialtyCommand command) {

        Specialty specialty = Specialty.valueOf(command.specialty());

        List<Mechanic> mechanics = mechanicRepository.findBySpecialty(specialty);

        return MechanicMapper.toGetBySpecialtyResult(mechanics);
    }
}
