package com.kiettran.webbanve.repository;

import com.kiettran.webbanve.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
