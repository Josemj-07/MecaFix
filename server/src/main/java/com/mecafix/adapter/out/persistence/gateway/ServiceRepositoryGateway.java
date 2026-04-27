package com.mecafix.adapter.out.persistence.gateway;

import com.mecafix.adapter.out.persistence.mapper.ServiceMapper;
import com.mecafix.adapter.out.persistence.repository.ServiceJpaRepository;
import com.mecafix.domain.model.entity.service.Service;
import com.mecafix.domain.port.service.ServiceRepositoryPort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
@RequiredArgsConstructor
public class ServiceRepositoryGateway implements ServiceRepositoryPort {

    private final ServiceJpaRepository serviceJpaRepository;

    @Override
    public void save(Service service) {
        serviceJpaRepository.save(ServiceMapper.toPersistence(service));
    }

    @Override
    public Optional<Service> findById(UUID id) {
        return serviceJpaRepository.findById(id)
                .map(ServiceMapper::toDomain);
    }

    @Override
    public List<Service> findAll() {
        return serviceJpaRepository.findAll().stream()
                .map(ServiceMapper::toDomain)
                .toList();
    }
}
