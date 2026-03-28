package com.mecafix.application.mechanic.mapper;

import com.mecafix.application.mechanic.usecase.createmechanic.CreateMechanicResult;
import com.mecafix.application.mechanic.usecase.getmechanic.GetMechanicResult;
import com.mecafix.application.mechanic.usecase.getmechanicsbyspecialty.GetMechanicsBySpecialtyResult;
import com.mecafix.application.mechanic.usecase.listmechanics.ListMechanicsResult;
import com.mecafix.domain.model.entity.person.Mechanic;

import java.util.List;

public class MechanicMapper {

    private MechanicMapper() {
    }

    public static CreateMechanicResult toCreateResult(Mechanic mechanic) {
        return new CreateMechanicResult(
                mechanic.getId(),
                mechanic.getFirstName(),
                mechanic.getLastName(),
                mechanic.getEmail().address(),
                mechanic.getSpecialty().name());
    }

    public static GetMechanicResult toGetResult(Mechanic mechanic) {
        return new GetMechanicResult(
                mechanic.getId(),
                mechanic.getFirstName(),
                mechanic.getLastName(),
                mechanic.getEmail().address(),
                mechanic.getMobilePhone().mobilePhone(),
                mechanic.getSpecialty().name());
    }

    public static ListMechanicsResult toListResult(List<Mechanic> mechanics) {
        List<ListMechanicsResult.MechanicResult> results = mechanics.stream()
                .map(MechanicMapper::toMechanicResult)
                .toList();
        return new ListMechanicsResult(results);
    }

    public static GetMechanicsBySpecialtyResult toGetBySpecialtyResult(List<Mechanic> mechanics) {
        List<ListMechanicsResult.MechanicResult> results = mechanics.stream()
                .map(MechanicMapper::toMechanicResult)
                .toList();
        return new GetMechanicsBySpecialtyResult(results);
    }

    private static ListMechanicsResult.MechanicResult toMechanicResult(Mechanic mechanic) {
        return new ListMechanicsResult.MechanicResult(
                mechanic.getId(),
                mechanic.getFirstName(),
                mechanic.getLastName(),
                mechanic.getSpecialty().name(),
                mechanic.getDni().dni());
    }
}
