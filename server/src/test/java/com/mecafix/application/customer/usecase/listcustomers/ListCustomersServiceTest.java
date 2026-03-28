package com.mecafix.application.customer.usecase.listcustomers;

import com.mecafix.application.customer.port.out.CustomerRepositoryPort;
import com.mecafix.domain.model.entity.person.Customer;
import com.mecafix.domain.model.valueobject.Dni;
import com.mecafix.domain.model.valueobject.Email;
import com.mecafix.domain.model.valueobject.MobilePhone;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ListCustomersServiceTest {

    @Mock
    private CustomerRepositoryPort customerRepository;

    private ListCustomersService listCustomersService;

    @BeforeEach
    void setUp() {
        listCustomersService = new ListCustomersService(customerRepository);
    }

    @Test
    void execute_ShouldReturnListOfCustomers() {
        Customer c1 = Customer.create("A", "B", new Email("a@b.com"), new MobilePhone("+1111111111"),
                new Dni("11111111"));
        Customer c2 = Customer.create("C", "D", new Email("c@d.com"), new MobilePhone("+2222222222"),
                new Dni("22222222"));

        when(customerRepository.findAll()).thenReturn(List.of(c1, c2));

        ListCustomersResult result = listCustomersService.execute(new ListCustomersCommand());

        assertEquals(2, result.customers().size());
    }
}
