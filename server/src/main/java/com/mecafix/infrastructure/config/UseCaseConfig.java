package com.mecafix.infrastructure.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.mecafix.domain.port.category.CategoryRepositoryPort;
import com.mecafix.domain.port.customer.CustomerRepositoryPort;
import com.mecafix.domain.port.mechanic.MechanicRepositoryPort;
import com.mecafix.domain.port.payment.PaymentRepositoryPort;
import com.mecafix.domain.port.product.ProductRepositoryPort;
import com.mecafix.domain.port.quote.QuoteRepositoryPort;
import com.mecafix.domain.port.service.ServiceRepositoryPort;
import com.mecafix.domain.port.serviceorder.ServiceOrderRepositoryPort;
import com.mecafix.domain.port.vehicle.VehicleRepositoryPort;

import com.mecafix.application.category.usecase.createcategory.CreateCategoryUseCase;
import com.mecafix.application.category.usecase.getcategory.GetCategoryUseCase;
import com.mecafix.application.category.usecase.listcategories.ListCategoriesUseCase;

import com.mecafix.application.customer.usecase.createcustomer.CreateCustomerUseCase;
import com.mecafix.application.customer.usecase.getcustomer.GetCustomerUseCase;
import com.mecafix.application.customer.usecase.getcustomervehicles.GetCustomerVehiclesUseCase;
import com.mecafix.application.customer.usecase.listcustomers.ListCustomersUseCase;
import com.mecafix.application.customer.usecase.updatecustomer.UpdateCustomerUseCase;

import com.mecafix.application.mechanic.usecase.createmechanic.CreateMechanicUseCase;
import com.mecafix.application.mechanic.usecase.getmechanic.GetMechanicUseCase;
import com.mecafix.application.mechanic.usecase.getmechanicsbyspecialty.GetMechanicsBySpecialtyUseCase;
import com.mecafix.application.mechanic.usecase.listmechanics.ListMechanicsUseCase;

import com.mecafix.application.payment.usecase.getpayment.GetPaymentUseCase;
import com.mecafix.application.payment.usecase.registerpayment.RegisterPaymentUseCase;
import com.mecafix.application.payment.usecase.validatepayment.ValidatePaymentUseCase;

import com.mecafix.application.product.usecase.createproduct.CreateProductUseCase;
import com.mecafix.application.product.usecase.getproduct.GetProductUseCase;
import com.mecafix.application.product.usecase.listproducts.ListProductsUseCase;
import com.mecafix.application.product.usecase.updateproductprice.UpdateProductPriceUseCase;
import com.mecafix.application.product.usecase.updateproductstock.UpdateProductStockUseCase;

import com.mecafix.application.quote.usecase.additemtoquote.AddItemToQuoteUseCase;
import com.mecafix.application.quote.usecase.approvequote.ApproveQuoteUseCase;
import com.mecafix.application.quote.usecase.createquote.CreateQuoteUseCase;
import com.mecafix.application.quote.usecase.getquote.GetQuoteUseCase;
import com.mecafix.application.quote.usecase.listcustomerquotes.ListCustomerQuotesUseCase;
import com.mecafix.application.quote.usecase.rejectquote.RejectQuoteUseCase;

import com.mecafix.application.service.usecase.createservice.CreateServiceUseCase;
import com.mecafix.application.service.usecase.getservice.GetServiceUseCase;
import com.mecafix.application.service.usecase.listservices.ListServicesUseCase;
import com.mecafix.application.service.usecase.updateservice.UpdateServiceUseCase;

import com.mecafix.application.serviceorder.usecase.advanceorderstatus.AdvanceOrderStatusUseCase;
import com.mecafix.application.serviceorder.usecase.completetask.CompleteTaskUseCase;
import com.mecafix.application.serviceorder.usecase.createserviceorder.CreateServiceOrderUseCase;
import com.mecafix.application.serviceorder.usecase.getserviceorder.GetServiceOrderUseCase;
import com.mecafix.application.serviceorder.usecase.listserviceorders.ListServiceOrdersUseCase;
import com.mecafix.application.serviceorder.usecase.starttask.StartTaskUseCase;

import com.mecafix.application.vehicle.usecase.register.RegisterVehicleUseCase;
import com.mecafix.application.vehicle.usecase.update.UpdateVehicleUseCase;

@Configuration
public class UseCaseConfig {

    // ── Category ──────────────────────────────────────────────
    @Bean
    public CreateCategoryUseCase createCategoryUseCase(
            CategoryRepositoryPort categoryRepository) {
        return new CreateCategoryUseCase(categoryRepository);
    }

    @Bean
    public GetCategoryUseCase getCategoryUseCase(
            CategoryRepositoryPort categoryRepository) {
        return new GetCategoryUseCase(categoryRepository);
    }

    @Bean
    public ListCategoriesUseCase listCategoriesUseCase(
            CategoryRepositoryPort categoryRepository) {
        return new ListCategoriesUseCase(categoryRepository);
    }

    // ── Customer ──────────────────────────────────────────────
    @Bean
    public CreateCustomerUseCase createCustomerUseCase(
            CustomerRepositoryPort customerRepository) {
        return new CreateCustomerUseCase(customerRepository);
    }

    @Bean
    public GetCustomerUseCase getCustomerUseCase(
            CustomerRepositoryPort customerRepository) {
        return new GetCustomerUseCase(customerRepository);
    }

    @Bean
    public GetCustomerVehiclesUseCase getCustomerVehiclesUseCase(
            CustomerRepositoryPort customerRepository) {
        return new GetCustomerVehiclesUseCase(customerRepository);
    }

    @Bean
    public ListCustomersUseCase listCustomersUseCase(
            CustomerRepositoryPort customerRepository) {
        return new ListCustomersUseCase(customerRepository);
    }

    @Bean
    public UpdateCustomerUseCase updateCustomerUseCase(
            CustomerRepositoryPort customerRepository) {
        return new UpdateCustomerUseCase(customerRepository);
    }

    // ── Mechanic ──────────────────────────────────────────────
    @Bean
    public CreateMechanicUseCase createMechanicUseCase(
            MechanicRepositoryPort mechanicRepository) {
        return new CreateMechanicUseCase(mechanicRepository);
    }

    @Bean
    public GetMechanicUseCase getMechanicUseCase(
            MechanicRepositoryPort mechanicRepository) {
        return new GetMechanicUseCase(mechanicRepository);
    }

    @Bean
    public GetMechanicsBySpecialtyUseCase getMechanicsBySpecialtyUseCase(
            MechanicRepositoryPort mechanicRepository) {
        return new GetMechanicsBySpecialtyUseCase(mechanicRepository);
    }

    @Bean
    public ListMechanicsUseCase listMechanicsUseCase(
            MechanicRepositoryPort mechanicRepository) {
        return new ListMechanicsUseCase(mechanicRepository);
    }

    // ── Payment ───────────────────────────────────────────────
    @Bean
    public GetPaymentUseCase getPaymentUseCase(
            PaymentRepositoryPort paymentRepository) {
        return new GetPaymentUseCase(paymentRepository);
    }

    @Bean
    public RegisterPaymentUseCase registerPaymentUseCase(
            PaymentRepositoryPort paymentRepository,
            ServiceOrderRepositoryPort serviceOrderRepository) {
        return new RegisterPaymentUseCase(paymentRepository, serviceOrderRepository);
    }

    @Bean
    public ValidatePaymentUseCase validatePaymentUseCase(
            PaymentRepositoryPort paymentRepository) {
        return new ValidatePaymentUseCase(paymentRepository);
    }

    // ── Product ───────────────────────────────────────────────
    @Bean
    public CreateProductUseCase createProductUseCase(
            ProductRepositoryPort productRepository,
            CategoryRepositoryPort categoryRepository) {
        return new CreateProductUseCase(productRepository, categoryRepository);
    }

    @Bean
    public GetProductUseCase getProductUseCase(
            ProductRepositoryPort productRepository) {
        return new GetProductUseCase(productRepository);
    }

    @Bean
    public ListProductsUseCase listProductsUseCase(
            ProductRepositoryPort productRepository) {
        return new ListProductsUseCase(productRepository);
    }

    @Bean
    public UpdateProductPriceUseCase updateProductPriceUseCase(
            ProductRepositoryPort productRepository) {
        return new UpdateProductPriceUseCase(productRepository);
    }

    @Bean
    public UpdateProductStockUseCase updateProductStockUseCase(
            ProductRepositoryPort productRepository) {
        return new UpdateProductStockUseCase(productRepository);
    }

    // ── Quote ─────────────────────────────────────────────────
    @Bean
    public AddItemToQuoteUseCase addItemToQuoteUseCase(
            QuoteRepositoryPort quoteRepository,
            ServiceRepositoryPort serviceRepository,
            ProductRepositoryPort productRepository) {
        return new AddItemToQuoteUseCase(quoteRepository, serviceRepository, productRepository);
    }

    @Bean
    public ApproveQuoteUseCase approveQuoteUseCase(
            QuoteRepositoryPort quoteRepository) {
        return new ApproveQuoteUseCase(quoteRepository);
    }

    @Bean
    public CreateQuoteUseCase createQuoteUseCase(
            QuoteRepositoryPort quoteRepository,
            CustomerRepositoryPort customerRepository,
            VehicleRepositoryPort vehicleRepository,
            ServiceRepositoryPort serviceRepository,
            ProductRepositoryPort productRepository) {
        return new CreateQuoteUseCase(quoteRepository, customerRepository, vehicleRepository, serviceRepository, productRepository);
    }

    @Bean
    public GetQuoteUseCase getQuoteUseCase(
            QuoteRepositoryPort quoteRepository) {
        return new GetQuoteUseCase(quoteRepository);
    }

    @Bean
    public ListCustomerQuotesUseCase listCustomerQuotesUseCase(
            QuoteRepositoryPort quoteRepository) {
        return new ListCustomerQuotesUseCase(quoteRepository);
    }

    @Bean
    public RejectQuoteUseCase rejectQuoteUseCase(
            QuoteRepositoryPort quoteRepository) {
        return new RejectQuoteUseCase(quoteRepository);
    }

    // ── Service ───────────────────────────────────────────────
    @Bean
    public CreateServiceUseCase createServiceUseCase(
            ServiceRepositoryPort serviceRepository) {
        return new CreateServiceUseCase(serviceRepository);
    }

    @Bean
    public GetServiceUseCase getServiceUseCase(
            ServiceRepositoryPort serviceRepository) {
        return new GetServiceUseCase(serviceRepository);
    }

    @Bean
    public ListServicesUseCase listServicesUseCase(
            ServiceRepositoryPort serviceRepository) {
        return new ListServicesUseCase(serviceRepository);
    }

    @Bean
    public UpdateServiceUseCase updateServiceUseCase(
            ServiceRepositoryPort serviceRepository) {
        return new UpdateServiceUseCase(serviceRepository);
    }

    // ── Service Order ─────────────────────────────────────────
    @Bean
    public AdvanceOrderStatusUseCase advanceOrderStatusUseCase(
            ServiceOrderRepositoryPort serviceOrderRepository) {
        return new AdvanceOrderStatusUseCase(serviceOrderRepository);
    }

    @Bean
    public CompleteTaskUseCase completeTaskUseCase(
            ServiceOrderRepositoryPort serviceOrderRepository) {
        return new CompleteTaskUseCase(serviceOrderRepository);
    }

    @Bean
    public CreateServiceOrderUseCase createServiceOrderUseCase(
            ServiceOrderRepositoryPort serviceOrderRepository,
            QuoteRepositoryPort quoteRepository,
            MechanicRepositoryPort mechanicRepository,
            ServiceRepositoryPort serviceRepository) {
        return new CreateServiceOrderUseCase(serviceOrderRepository, quoteRepository, mechanicRepository, serviceRepository);
    }

    @Bean
    public GetServiceOrderUseCase getServiceOrderUseCase(
            ServiceOrderRepositoryPort serviceOrderRepository) {
        return new GetServiceOrderUseCase(serviceOrderRepository);
    }

    @Bean
    public ListServiceOrdersUseCase listServiceOrdersUseCase(
            ServiceOrderRepositoryPort serviceOrderRepository) {
        return new ListServiceOrdersUseCase(serviceOrderRepository);
    }

    @Bean
    public StartTaskUseCase startTaskUseCase(
            ServiceOrderRepositoryPort serviceOrderRepository) {
        return new StartTaskUseCase(serviceOrderRepository);
    }

    // ── Vehicle ───────────────────────────────────────────────
    @Bean
    public RegisterVehicleUseCase registerVehicleUseCase(
            CustomerRepositoryPort customerRepository,
            VehicleRepositoryPort vehicleRepository) {
        return new RegisterVehicleUseCase(customerRepository, vehicleRepository);
    }

    @Bean
    public UpdateVehicleUseCase updateVehicleUseCase(
            VehicleRepositoryPort vehicleRepository) {
        return new UpdateVehicleUseCase(vehicleRepository);
    }

    // ── Security ──────────────────────────────────────────────
    @Bean
    public org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder();
    }
}
