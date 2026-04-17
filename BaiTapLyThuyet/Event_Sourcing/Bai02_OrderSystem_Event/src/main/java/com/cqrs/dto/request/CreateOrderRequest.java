package com.cqrs.dto.request;

import lombok.Data;

@Data
public class CreateOrderRequest {
    private String productName;
    private double price;
}