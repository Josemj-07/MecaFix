package com.mecafix.adapter.out.persistence.mapper;

import com.mecafix.adapter.out.persistence.entity.MechanicJpaEntity;
import com.mecafix.domain.model.entity.person.Mechanic;

public class MechanicMapper {
    public static MechanicJpaEntity toPersistence(Mechanic mechanic) {
        return new MechanicJpaEntity(
                mechanic.getId(), mechanic.getFirstName(), mechanic.getLastName(),
                mechanic.getEmail().address(), mechanic.getMobilePhone().mobilePhone(),
                mechanic.getDni().dni(), mechanic.getSpecialty()
        );
    }

    public static Mechanic toDomain(MechanicJpaEntity mechanicJpaEntity) {
        return Mechanic.reBuild(
                mechanicJpaEntity.getId(), mechanicJpaEntity.getFirstName(), mechanicJpaEntity.getLastName(),
                mechanicJpaEntity.getEmail(), mechanicJpaEntity.getMobilePhone(),
                mechanicJpaEntity.getDni(), mechanicJpaEntity.getSpecialty()
        );
    }
}
