package com.kiettran.webbanve.auth;

import com.kiettran.webbanve.auth.dto.AuthResponse;
import com.kiettran.webbanve.auth.dto.LoginRequest;
import com.kiettran.webbanve.auth.dto.RegisterRequest;
import com.kiettran.webbanve.entity.Role;
import com.kiettran.webbanve.entity.User;
import com.kiettran.webbanve.enums.RoleName;
import com.kiettran.webbanve.exception.ConflictException;
import com.kiettran.webbanve.exception.ResourceNotFoundException;
import com.kiettran.webbanve.repository.RoleRepository;
import com.kiettran.webbanve.repository.UserRepository;
import com.kiettran.webbanve.security.JwtUtil;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final MessageSource messageSource;

    public AuthService(UserRepository userRepository, RoleRepository roleRepository,
                       PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager,
                       JwtUtil jwtUtil, MessageSource messageSource) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.messageSource = messageSource;
    }

    @Transactional
    public AuthResponse register(RegisterRequest req) {
        if (userRepository.findByUsername(req.getUsername()).isPresent()) {
            throw new ConflictException(messageSource.getMessage("auth.username.exists", null, LocaleContextHolder.getLocale()));
        }
        Role roleUser = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new ResourceNotFoundException(messageSource.getMessage("role.notfound", new Object[]{RoleName.ROLE_USER.name()}, LocaleContextHolder.getLocale())));

        User user = new User();
        user.setUsername(req.getUsername());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setEmail(req.getEmail());
        user.setFullName(req.getFullName());
        user.setEnabled(true);
        user.setRoles(List.of(roleUser));
        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getUsername());
        return new AuthResponse(token, user.getUsername(), List.of(RoleName.ROLE_USER.name()), user.getId());
    }

    public AuthResponse login(LoginRequest req) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getUsername(), req.getPassword()));

        List<String> roles = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();
        User user = userRepository.findByUsername(req.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException(messageSource.getMessage("user.notfound", null, LocaleContextHolder.getLocale())));
        String token = jwtUtil.generateToken(req.getUsername());
        return new AuthResponse(token, req.getUsername(), roles, user.getId());
    }
}
