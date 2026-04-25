package com.mecafix.domain.model.entity.order;

import com.mecafix.domain.exceptions.InvalidServiceOrderException;
import com.mecafix.domain.model.entity.person.Mechanic;
import com.mecafix.domain.model.entity.service.ServiceDetail;
import com.mecafix.domain.model.enums.TaskStatus;
import com.mecafix.domain.exceptions.InvalidTaskException;

import java.time.LocalDateTime;
import java.util.UUID;

public class Task {

    private final UUID id;
    private final Mechanic mechanic;
    private final ServiceDetail serviceDetail;
    private TaskStatus status;
    private final LocalDateTime creationDate;
    private LocalDateTime finishedDate;

    public static Task create(Mechanic mechanic, ServiceDetail serviceDetail) {
        return new Task(mechanic, serviceDetail);
    }

    public static Task reBuild(String id, Mechanic mechanic, ServiceDetail serviceDetail) {
        return new Task(id, mechanic, serviceDetail);
    }

    private Task(Mechanic mechanic, ServiceDetail serviceDetail) {
        if (mechanic == null) throw new InvalidTaskException("Mechanic must not be null");
        if (serviceDetail == null) throw new InvalidTaskException("Service detail must not be null");

        this.id = UUID.randomUUID();
        this.mechanic = mechanic;
        this.serviceDetail = serviceDetail;
        this.status = TaskStatus.PENDING;
        this. creationDate = LocalDateTime.now();

    }

    private Task(String id, Mechanic mechanic, ServiceDetail serviceDetail) {
        if (mechanic == null) throw new InvalidTaskException("Mechanic must not be null");
        if (serviceDetail == null) throw new InvalidTaskException("Service detail must not be null");
        if(id == null) throw new InvalidServiceOrderException("id must not be null");

        this.id = UUID.fromString(id);
        this.mechanic = mechanic;
        this.serviceDetail = serviceDetail;
        this.status = TaskStatus.PENDING;
        this. creationDate = LocalDateTime.now();
    }


    public void markInProgress() {
        if (status != TaskStatus.PENDING) throw new InvalidTaskException("Only a pending task can be marked as in progress");
        this.status = TaskStatus.IN_PROGRESS;
    }

    public void markFinished() {
        if (status != TaskStatus.IN_PROGRESS)
            throw new InvalidTaskException("Only an in progress task can be marked as finished");
        this.status = TaskStatus.FINISHED;
        this.finishedDate = LocalDateTime.now();
    }

    public UUID getId() { return id; }
    public Mechanic getMechanic() { return mechanic; }
    public ServiceDetail getServiceDetail() { return serviceDetail; }
    public TaskStatus getStatus() { return status; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Task)) return false;
        Task that = (Task) o;

        return id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return this.id.hashCode();
    }

}
