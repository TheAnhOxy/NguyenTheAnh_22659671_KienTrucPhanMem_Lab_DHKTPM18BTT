package com.logistic.shippingapp.model.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class OrderRequestDTO {
    @NotNull
    private Long userId;
    @Min(1) private Double totalPrice;
    @NotBlank
    private String address;
    @NotBlank private String paymentMethod;
}