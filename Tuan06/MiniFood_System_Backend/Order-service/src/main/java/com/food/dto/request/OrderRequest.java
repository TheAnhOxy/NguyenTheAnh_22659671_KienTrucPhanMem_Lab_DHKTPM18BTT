package com.food.dto.request;

import lombok.Data;

@Data
public class OrderRequest {
    private Long userId;
    private Long foodId;
    private Integer quantity;
    private String paymentMethod;
}