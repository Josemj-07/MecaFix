package com.mecafix.application.payment.usecase.getpayment;

public interface GetPaymentUseCase {
    GetPaymentResult execute(GetPaymentCommand command);
}
