package com.mecafix.application.mechanic.usecase.getmechanicsbyspecialty;

import com.mecafix.application.mechanic.usecase.listmechanics.ListMechanicsResult;

import java.util.List;

public record GetMechanicsBySpecialtyResult(
        List<ListMechanicsResult.MechanicResult> mechanics) {
}
