package com.food.repository;

import com.food.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT u FROM User u WHERE u.username = :login OR u.phone = :login")
    Optional<User> findByUsernameOrPhone(@Param("login") String login);

    boolean existsByUsername(String username);
    boolean existsByPhone(String phone);
}