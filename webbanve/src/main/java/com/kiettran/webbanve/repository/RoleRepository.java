package com.kiettran.webbanve.repository;

import com.kiettran.webbanve.entity.Role;
import com.kiettran.webbanve.enums.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleName name);
}
