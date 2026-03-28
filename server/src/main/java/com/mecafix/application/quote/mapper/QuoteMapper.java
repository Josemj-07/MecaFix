package com.mecafix.application.quote.mapper;

import com.mecafix.application.quote.usecase.additemtoquote.AddItemToQuoteResult;
import com.mecafix.application.quote.usecase.approvequote.ApproveQuoteResult;
import com.mecafix.application.quote.usecase.createquote.CreateQuoteResult;
import com.mecafix.application.quote.usecase.getquote.GetQuoteResult;
import com.mecafix.application.quote.usecase.listcustomerquotes.ListCustomerQuotesResult;
import com.mecafix.application.quote.usecase.rejectquote.RejectQuoteResult;
import com.mecafix.domain.model.contract.IPayable;
import com.mecafix.domain.model.entity.product.ProductDetail;
import com.mecafix.domain.model.entity.quote.Quote;
import com.mecafix.domain.model.entity.service.ServiceDetail;

import java.util.List;

public class QuoteMapper {

    private QuoteMapper() {
    }

    public static CreateQuoteResult toCreateResult(Quote quote) {
        return new CreateQuoteResult(
                quote.getId(),
                quote.getCustomer().getId(),
                quote.getCustomer().getFullName(),
                quote.getVehicle().getId(),
                quote.getVehicle().getPlate(),
                quote.getStatus().name(),
                quote.getTotalAmount(),
                quote.getCreatedDate());
    }

    public static AddItemToQuoteResult toAddItemResult(Quote quote) {
        return new AddItemToQuoteResult(
                quote.getId(),
                quote.getStatus().name(),
                quote.getTotalAmount(),
                quote.getPayable().size());
    }

    public static GetQuoteResult toGetResult(Quote quote) {
        List<GetQuoteResult.PayableItemResult> items = quote.getPayable().stream()
                .map(QuoteMapper::toPayableItemResult)
                .toList();

        return new GetQuoteResult(
                quote.getId(),
                quote.getCustomer().getId(),
                quote.getCustomer().getFullName(),
                quote.getVehicle().getId(),
                quote.getVehicle().getPlate(),
                quote.getStatus().name(),
                quote.getTotalAmount(),
                quote.getCreatedDate(),
                items);
    }

    public static ListCustomerQuotesResult toListCustomerQuotesResult(List<Quote> quotes) {
        List<ListCustomerQuotesResult.QuoteSummaryResult> results = quotes.stream()
                .map(quote -> new ListCustomerQuotesResult.QuoteSummaryResult(
                        quote.getId(),
                        quote.getVehicle().getId(),
                        quote.getVehicle().getPlate(),
                        quote.getStatus().name(),
                        quote.getTotalAmount(),
                        quote.getCreatedDate()))
                .toList();
        return new ListCustomerQuotesResult(results);
    }

    public static ApproveQuoteResult toApproveResult(Quote quote) {
        return new ApproveQuoteResult(
                quote.getId(),
                quote.getStatus().name(),
                quote.getTotalAmount());
    }

    public static RejectQuoteResult toRejectResult(Quote quote) {
        return new RejectQuoteResult(
                quote.getId(),
                quote.getStatus().name());
    }

    private static GetQuoteResult.PayableItemResult toPayableItemResult(IPayable payable) {
        if (payable instanceof ServiceDetail serviceDetail) {
            return new GetQuoteResult.PayableItemResult(
                    "SERVICE",
                    serviceDetail.getService().getName(),
                    serviceDetail.calculateSubTotal());
        } else if (payable instanceof ProductDetail productDetail) {
            return new GetQuoteResult.PayableItemResult(
                    "PRODUCT",
                    productDetail.getProduct().getName(),
                    productDetail.calculateSubTotal());
        }
        return new GetQuoteResult.PayableItemResult(
                "UNKNOWN",
                "Unknown item",
                payable.calculateSubTotal());
    }
}
