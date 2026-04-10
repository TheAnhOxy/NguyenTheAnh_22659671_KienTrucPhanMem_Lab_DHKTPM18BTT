package com.logistic.shippingapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.logistic.shippingapp.entity.User;
public interface UserRepository extends JpaRepository<User, Long> {}