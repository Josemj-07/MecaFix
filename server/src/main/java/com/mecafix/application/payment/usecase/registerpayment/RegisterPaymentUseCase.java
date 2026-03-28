package com.mecafix.application.payment.usecase.registerpayment;

public interface RegisterPaymentUseCase {
    RegisterPaymentResult execute(RegisterPaymentCommand command);
}
