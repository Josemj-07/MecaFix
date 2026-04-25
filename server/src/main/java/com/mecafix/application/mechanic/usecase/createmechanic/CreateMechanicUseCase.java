package com.mecafix.application.mechanic.usecase.createmechanic;

import com.mecafix.application.mechanic.mapper.MechanicMapper;

import com.mecafix.domain.model.entity.person.Mechanic;
import com.mecafix.domain.model.enums.Specialty;
import com.mecafix.domain.model.valueobject.Dni;
import com.mecafix.domain.model.valueobject.Email;
import com.mecafix.domain.model.valueobject.MobilePhone;
import com.mecafix.application.exceptions.MechanicAlreadyExistsException;
import com.mecafix.domain.port.mechanic.MechanicRepositoryPort;

public class  CreateMechanicUseCase {

    private final MechanicRepositoryPort mechanicRepository;

    public CreateMechanicUseCase(MechanicRepositoryPort mechanicRepository) {
        this.mechanicRepository = mechanicRepository;
    }

    public CreateMechanicResult execute(CreateMechanicCommand command) {

        if (mechanicRepository.existsByDni(command.nationalId())) {
            throw new MechanicAlreadyExistsException("Mechanic already registered with DNI " + command.nationalId());
        }

        Mechanic mechanic = Mechanic.create(
                command.firstName(),
                command.lastName(),
                new Email(command.email()),
                new MobilePhone(command.mobilePhone()),
                new Dni(command.nationalId()),
                Specialty.valueOf(command.specialty()));

        mechanicRepository.save(mechanic);

        return MechanicMapper.toCreateResult(mechanic);
    }
}
