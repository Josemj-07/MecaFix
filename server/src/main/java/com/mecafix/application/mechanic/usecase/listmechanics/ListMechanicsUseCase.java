package com.mecafix.application.mechanic.usecase.listmechanics;

import com.mecafix.application.mechanic.mapper.MechanicMapper;
import com.mecafix.domain.model.entity.person.Mechanic;
import com.mecafix.domain.port.mechanic.MechanicRepositoryPort;

import java.util.List;

public class ListMechanicsUseCase {

    private final MechanicRepositoryPort mechanicRepository;

    public ListMechanicsUseCase(MechanicRepositoryPort mechanicRepository) {
        this.mechanicRepository = mechanicRepository;
    }

    public ListMechanicsResult execute(ListMechanicsCommand command) {

        List<Mechanic> mechanics = mechanicRepository.findAll();

        return MechanicMapper.toListResult(mechanics);
    }
}
