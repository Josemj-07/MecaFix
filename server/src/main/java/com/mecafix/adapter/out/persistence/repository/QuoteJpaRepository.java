package com.mecafix.adapter.out.persistence.repository;

import com.mecafix.adapter.out.persistence.entity.QuoteJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface QuoteJpaRepository extends JpaRepository<QuoteJpaEntity, UUID> {
    List<QuoteJpaEntity> findByVehicleCustomerId(UUID customerId);
}