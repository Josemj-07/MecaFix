package com.mecafix.adapter.out.persistence.repository;

import com.mecafix.adapter.out.persistence.entity.TaskJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface TaskJpaRepository extends JpaRepository<TaskJpaEntity, UUID> {
    List<TaskJpaEntity> findByServiceOrderId(UUID serviceOrderId);
}