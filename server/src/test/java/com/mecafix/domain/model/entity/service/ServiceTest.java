package com.mecafix.domain.model.entity.service;

import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class ServiceTest {

    @Test
    void testCreateService_ShouldCreateSuccessfully() {
        Service service = Service.create("Oil Change", "Engine oil change", BigDecimal.valueOf(100.0));

        assertNotNull(service.getId());
        assertEquals("Oil Change", service.getName());
        assertEquals("Engine oil change", service.getDescription());
        assertEquals(BigDecimal.valueOf(100.0), service.getLaborPrice());
    }

    @Test
    void testChangeDescription_ShouldUpdateDescription() {
        Service service = Service.create("Brakes", "Old desc", BigDecimal.valueOf(50.0));
        
        service.changeDescription("New desc");
        
        assertEquals("New desc", service.getDescription());
    }
}
