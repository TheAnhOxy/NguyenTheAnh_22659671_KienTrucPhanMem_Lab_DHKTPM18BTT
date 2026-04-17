package com.logistic.shippingapp.repository;

import com.logistic.shippingapp.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {}