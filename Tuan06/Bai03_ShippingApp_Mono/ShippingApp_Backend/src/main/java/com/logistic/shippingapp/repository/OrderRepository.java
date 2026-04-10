package com.logistic.shippingapp.repository;

import com.logistic.shippingapp.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {}