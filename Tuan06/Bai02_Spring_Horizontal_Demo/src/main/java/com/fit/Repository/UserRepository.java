package com.fit.Repository;

import com.fit.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query(value = "SELECT * FROM user_male", nativeQuery = true)
    List<User> findAllMale();

    @Query(value = "SELECT * FROM user_female", nativeQuery = true)
    List<User> findAllFemale();
}