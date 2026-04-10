package com.logistic.shippingapp.repository;

import com.logistic.shippingapp.entity.Shipping;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShippingRepository extends JpaRepository<Shipping, Long> {}
