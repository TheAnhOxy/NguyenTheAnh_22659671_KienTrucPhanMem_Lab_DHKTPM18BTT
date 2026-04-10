package com.food.dto.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
public class PaymentResponse {
    private Long transactionId;
    private Long orderId;
    private String status;
    private String message;
}