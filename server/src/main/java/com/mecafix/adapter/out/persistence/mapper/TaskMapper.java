package com.mecafix.adapter.out.persistence.mapper;

import com.mecafix.adapter.out.persistence.entity.MechanicJpaEntity;
import com.mecafix.adapter.out.persistence.entity.ServiceJpaEntity;
import com.mecafix.adapter.out.persistence.entity.ServiceOrderJpaEntity;
import com.mecafix.adapter.out.persistence.entity.TaskJpaEntity;
import com.mecafix.domain.model.entity.order.Task;
import com.mecafix.domain.model.entity.person.Mechanic;
import com.mecafix.domain.model.entity.service.ServiceDetail;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class TaskMapper {
    public static TaskJpaEntity toPersistence(Task task, MechanicJpaEntity mechanicJpa,
                                               ServiceOrderJpaEntity serviceOrderJpa,
                                               ServiceJpaEntity serviceJpa) {
        return new TaskJpaEntity(
                task.getId(), mechanicJpa, task.getStatus(),
                task.getCreationDate(), task.getFinishedDate(),
                serviceOrderJpa, serviceJpa
        );
    }

    public static Task toDomain(TaskJpaEntity taskJpa, Mechanic mechanic, ServiceDetail serviceDetail) {
        return Task.reBuild(taskJpa.getId(), mechanic, serviceDetail,
                taskJpa.getStatus(), taskJpa.getCreationDate(),
                taskJpa.getFinisedhDate()
        );
    }
}
