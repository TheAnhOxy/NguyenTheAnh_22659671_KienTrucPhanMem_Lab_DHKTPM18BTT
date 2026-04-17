package com.fit;

import lombok.Data;

@Data
class OrderView {
    private String orderId;
    private double totalPrice = 0;
    private String status = "DRAFT";
}