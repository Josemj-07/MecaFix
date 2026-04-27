package com.mecafix.adapter.out.persistence.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;

import java.math.BigDecimal;
import java.util.UUID;

public interface PayableJpa {
    BigDecimal getAppliedPrice();
}
