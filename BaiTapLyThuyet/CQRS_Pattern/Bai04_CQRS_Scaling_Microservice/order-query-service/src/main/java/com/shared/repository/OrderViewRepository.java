package com.shared.repository;

import com.shared.entity.OrderView;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderViewRepository extends JpaRepository<OrderView, Long> {
}