package com.mecafix.application.payment.usecase.validatepayment;

public interface ValidatePaymentUseCase {
    ValidatePaymentResult execute(ValidatePaymentCommand command);
}
