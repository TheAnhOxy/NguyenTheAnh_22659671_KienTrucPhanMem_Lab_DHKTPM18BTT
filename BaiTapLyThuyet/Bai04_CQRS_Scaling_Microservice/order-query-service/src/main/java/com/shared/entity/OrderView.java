package com.shared.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "order_view")
public class OrderView  {

    @Id
    private Long id;

    @Column(name = "product_name")
    private String productName;
    private double price;
    private String status;
}
