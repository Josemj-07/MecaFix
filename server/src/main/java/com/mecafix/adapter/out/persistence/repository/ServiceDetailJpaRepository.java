package com.mecafix.adapter.out.persistence.repository;

import com.mecafix.adapter.out.persistence.entity.ServiceDetailJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ServiceDetailJpaRepository extends JpaRepository<ServiceDetailJpaEntity, UUID> {

}