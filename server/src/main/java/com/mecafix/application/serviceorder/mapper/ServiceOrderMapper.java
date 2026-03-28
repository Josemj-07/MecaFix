package com.mecafix.application.serviceorder.mapper;

import com.mecafix.application.serviceorder.usecase.advanceorderstatus.AdvanceOrderStatusResult;
import com.mecafix.application.serviceorder.usecase.completetask.CompleteTaskResult;
import com.mecafix.application.serviceorder.usecase.createserviceorder.CreateServiceOrderResult;
import com.mecafix.application.serviceorder.usecase.getserviceorder.GetServiceOrderResult;
import com.mecafix.application.serviceorder.usecase.listserviceorders.ListServiceOrdersResult;
import com.mecafix.application.serviceorder.usecase.starttask.StartTaskResult;
import com.mecafix.domain.model.entity.order.ServiceOrder;
import com.mecafix.domain.model.entity.order.Task;

import java.util.List;

public class ServiceOrderMapper {

    private ServiceOrderMapper() { }

    public static CreateServiceOrderResult toCreateResult(ServiceOrder serviceOrder) {
        return new CreateServiceOrderResult(
                serviceOrder.getId(),
                serviceOrder.getQuote().getId(),
                serviceOrder.getOrderStatus().name(),
                serviceOrder.getCreationDate()
        );
    }

    public static AdvanceOrderStatusResult toAdvanceStatusResult(ServiceOrder serviceOrder) {
        return new AdvanceOrderStatusResult(
                serviceOrder.getId(),
                serviceOrder.getOrderStatus().name()
        );
    }

    public static StartTaskResult toStartTaskResult(Task task) {
        return new StartTaskResult(
                task.getId(),
                task.getStatus().name()
        );
    }

    public static CompleteTaskResult toCompleteTaskResult(Task task) {
        return new CompleteTaskResult(
                task.getId(),
                task.getStatus().name()
        );
    }

    public static GetServiceOrderResult toGetResult(ServiceOrder serviceOrder) {
        return new GetServiceOrderResult(
                serviceOrder.getId(),
                serviceOrder.getQuote().getId(),
                serviceOrder.getOrderStatus().name(),
                serviceOrder.getCreationDate(),
                serviceOrder.getTasks().stream().map(ServiceOrderMapper::toTaskResult).toList()
        );
    }

    public static ListServiceOrdersResult toListResult(List<ServiceOrder> serviceOrders) {
        List<ListServiceOrdersResult.ServiceOrderResult> results = serviceOrders.stream()
                .map(ServiceOrderMapper::toServiceOrderResult)
                .toList();
        return new ListServiceOrdersResult(results);
    }

    private static GetServiceOrderResult.TaskResult toTaskResult(Task task) {
        return new GetServiceOrderResult.TaskResult(
                task.getId(),
                task.getMechanic().getFirstName() + " " + task.getMechanic().getLastName(),
                task.getServiceDetail().getService().getName(),
                task.getStatus().name()
        );
    }

    private static ListServiceOrdersResult.ServiceOrderResult toServiceOrderResult(ServiceOrder serviceOrder) {
        return new ListServiceOrdersResult.ServiceOrderResult(
                serviceOrder.getId(),
                serviceOrder.getQuote().getId(),
                serviceOrder.getOrderStatus().name(),
                serviceOrder.getCreationDate()
        );
    }
}
