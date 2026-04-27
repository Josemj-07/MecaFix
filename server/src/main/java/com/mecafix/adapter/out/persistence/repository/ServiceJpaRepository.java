package com.mecafix.adapter.out.persistence.repository;

import com.mecafix.adapter.out.persistence.entity.ServiceJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ServiceJpaRepository extends JpaRepository<ServiceJpaEntity, UUID> {

}