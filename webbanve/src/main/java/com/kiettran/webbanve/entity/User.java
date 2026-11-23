package com.kiettran.webbanve.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Entity
@Table(name = "user")
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "username", nullable = false, length = 255)
    private String username;
    @Column(name = "password", nullable = false, length = 255)
    private String password;
    @Column(name = "email", nullable = false, length = 255)
    private String email;
    @Column(name = "full_name", nullable = false, length = 255)
    private String fullName;
    @Column(name = "enabled", nullable = false)
    private Boolean enabled;

    // Dung Set (khong phai List) -> Hibernate tao khoa chinh (user_id, role_id) cho bang noi.
    // MySQL tren cloud (vd Aiven) bat sql_require_primary_key nen bang khong co khoa chinh se khong tao duoc.
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_role",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
    private Set<Role> roles;
}
