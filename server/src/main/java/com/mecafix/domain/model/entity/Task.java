/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mecafix.domain.model.entity;

import com.mecafix.domain.model.enums.TaskStatus;
import com.mecafix.domain.model.valueobject.ServiceDetail;
import com.mecafix.shared.exceptions.InvalidTaskException;

public class Task {

    private final Long id;
    private final Mechanic mechanic;
    private final ServiceDetail serviceDetail;
    private TaskStatus status;

    public Task(Long id, Mechanic mechanic, ServiceDetail serviceDetail) {

        if (id == null || id <= 0) throw new InvalidTaskException("Id must be a positive number");
        if (mechanic == null) throw new InvalidTaskException("Mechanic must not be null");
        if (serviceDetail == null) throw new InvalidTaskException("Service detail must not be null");

        this.id = id;
        this.mechanic = mechanic;
        this.serviceDetail = serviceDetail;
        this.status = TaskStatus.PENDING;

    }

    // ── State management ──────────────────────────────────────────────────────

    public void markInProgress() {
        if (status != TaskStatus.PENDING) throw new InvalidTaskException("Only a pending task can be marked as in progress");
        this.status = TaskStatus.IN_PROGRESS;
    }

    public void markFinished() {
        if (status != TaskStatus.IN_PROGRESS) throw new InvalidTaskException("Only an in progress task can be marked as finished");
        this.status = TaskStatus.FINISHED;
    }

    // ── Getters ───────────────────────────────────────────────────────────────

    public Long getId() { return id; }
    public Mechanic getMechanic() { return mechanic; }
    public ServiceDetail getServiceDetail() { return serviceDetail; }
    public TaskStatus getStatus() { return status; }

}
