package com.mecafix.adapter.out.persistence.entity;

import com.mecafix.domain.model.enums.TaskStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "task")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TaskJpaEntity {
    @Id
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "id_mechanic")
    private MechanicJpaEntity mechanic;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private TaskStatus status;

    @Column(name = "creationdate", nullable = false)
    private LocalDateTime creationDate;

    @Column(name = "finisheddate")
    private LocalDateTime finisedhDate;

    @JoinColumn(name = "id_service_order")
    @ManyToOne
    private ServiceOrderJpaEntity serviceOrder;

    @ManyToOne
    @JoinColumn(name = "id_service")
    private ServiceJpaEntity service;

}
