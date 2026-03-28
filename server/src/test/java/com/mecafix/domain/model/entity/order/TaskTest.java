package com.mecafix.domain.model.entity.order;

import com.mecafix.domain.model.entity.person.Mechanic;
import com.mecafix.domain.model.entity.service.ServiceDetail;
import com.mecafix.domain.model.enums.TaskStatus;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.mock;

class TaskTest {

    @Test
    void testCreateTask_ShouldInitAsPending() {
        Mechanic mechanic = mock(Mechanic.class);
        ServiceDetail serviceDetail = mock(ServiceDetail.class);

        Task task = Task.create(mechanic, serviceDetail);

        assertNotNull(task.getId());
        assertEquals(mechanic, task.getMechanic());
        assertEquals(serviceDetail, task.getServiceDetail());
        assertEquals(TaskStatus.PENDING, task.getStatus());
    }

    @Test
    void testMarkInProgress() {
        Task task = Task.create(mock(Mechanic.class), mock(ServiceDetail.class));

        task.markInProgress();

        assertEquals(TaskStatus.IN_PROGRESS, task.getStatus());
    }

    @Test
    void testMarkFinished() {
        Task task = Task.create(mock(Mechanic.class), mock(ServiceDetail.class));
        task.markInProgress();
        task.markFinished();

        assertEquals(TaskStatus.FINISHED, task.getStatus());
    }
}
