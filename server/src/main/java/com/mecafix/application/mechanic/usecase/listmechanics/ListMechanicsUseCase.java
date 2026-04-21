package com.mecafix.application.mechanic.usecase.listmechanics;

import com.mecafix.application.mechanic.mapper.MechanicMapper;
import com.mecafix.application.mechanic.port.out.MechanicRepositoryPort;
import com.mecafix.domain.model.entity.person.Mechanic;

import java.util.List;

public class ListMechanicsService implements ListMechanicsUseCase {

    private final MechanicRepositoryPort mechanicRepository;

    public ListMechanicsService(MechanicRepositoryPort mechanicRepository) {
        this.mechanicRepository = mechanicRepository;
    }

    @Override
    public ListMechanicsResult execute(ListMechanicsCommand command) {

        List<Mechanic> mechanics = mechanicRepository.findAll();

        return MechanicMapper.toListResult(mechanics);
    }
}
