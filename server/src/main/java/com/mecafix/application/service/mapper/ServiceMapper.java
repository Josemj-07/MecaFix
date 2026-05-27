package com.mecafix.application.service.mapper;

import com.mecafix.application.service.usecase.createservice.CreateServiceResult;
import com.mecafix.application.service.usecase.getservice.GetServiceResult;
import com.mecafix.application.service.usecase.listservices.ListServicesResult;
import com.mecafix.application.service.usecase.updateservice.UpdateServiceResult;
import com.mecafix.domain.model.entity.service.Service;

import java.util.List;

public class ServiceMapper {

    private ServiceMapper() { }

    public static CreateServiceResult toCreateResult(Service service) {
        return new CreateServiceResult(
                service.getId(),
                service.getName(),
                service.getDescription(),
                service.getLaborPrice()
        );
    }

    public static GetServiceResult toGetResult(Service service) {
        return new GetServiceResult(
                service.getId(),
                service.getName(),
                service.getDescription(),
                service.getLaborPrice()
        );
    }

    public static ListServicesResult toListResult(List<Service> services) {
        List<ListServicesResult.ServiceResult> results = services.stream()
                .map(ServiceMapper::toServiceResult)
                .toList();
        return new ListServicesResult(results);
    }

    public static UpdateServiceResult toUpdateResult(Service service) {
        return new UpdateServiceResult(
                service.getId(),
                service.getName(),
                service.getDescription(),
                service.getLaborPrice()
        );
    }

    private static ListServicesResult.ServiceResult toServiceResult(Service service) {
        return new ListServicesResult.ServiceResult(
                service.getId(),
                service.getName(),
                service.getDescription(),
                service.getLaborPrice()
        );
    }
}
