package com.logistic.shippingapp.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Entity @Table(name = "shippings")
@Data @NoArgsConstructor @AllArgsConstructor
public class Shipping {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne @JoinColumn(name = "order_id")
    private Order order;
    private String address;
    private String trackingNumber;
    private String status;
}