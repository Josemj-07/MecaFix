package com.mecafix.application.mechanic.usecase.getmechanicsbyspecialty;

import com.mecafix.application.mechanic.mapper.MechanicMapper;
import com.mecafix.application.mechanic.port.out.MechanicRepositoryPort;
import com.mecafix.domain.model.entity.person.Mechanic;
import com.mecafix.domain.model.enums.Specialty;

import java.util.List;

public class GetMechanicsBySpecialtyService implements GetMechanicsBySpecialtyUseCase {

    private final MechanicRepositoryPort mechanicRepository;

    public GetMechanicsBySpecialtyService(MechanicRepositoryPort mechanicRepository) {
        this.mechanicRepository = mechanicRepository;
    }

    @Override
    public GetMechanicsBySpecialtyResult execute(GetMechanicsBySpecialtyCommand command) {

        Specialty specialty = Specialty.valueOf(command.specialty());

        List<Mechanic> mechanics = mechanicRepository.findBySpecialty(specialty);

        return MechanicMapper.toGetBySpecialtyResult(mechanics);
    }
}
