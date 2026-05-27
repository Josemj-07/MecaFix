package com.mecafix.adapter.out.persistence.repository;

import com.mecafix.adapter.out.persistence.entity.ServiceOrderJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ServiceOrderJpaRepository extends JpaRepository<ServiceOrderJpaEntity, UUID> {

}