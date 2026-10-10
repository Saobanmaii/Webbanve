package com.kiettran.webbanve.config;

import com.kiettran.webbanve.security.CustomUserDetailService;
import com.kiettran.webbanve.security.JwtAuthFilter;
import com.kiettran.webbanve.security.JwtUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    private final JwtUtil jwtUtil;
    private final CustomUserDetailService userDetailsService;
    private final List<String> allowedOrigins;

    public SecurityConfig(JwtUtil jwtUtil, CustomUserDetailService userDetailsService,
                          @Value("${app.cors.allowed-origins}") List<String> allowedOrigins) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
        this.allowedOrigins = allowedOrigins;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/**", "/swagger-ui/**", "/swagger-ui.html", "/v3/api-docs/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/movies/**", "/cinemas/**", "/rooms/**", "/showtimes/**").permitAll()
                        .requestMatchers("/reports/**", "/seats/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/movies/**", "/cinemas/**", "/rooms/**", "/showtimes/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PATCH, "/movies/**", "/cinemas/**", "/rooms/**", "/showtimes/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/movies/**", "/cinemas/**", "/rooms/**", "/showtimes/**").hasRole("ADMIN")
                        .requestMatchers("/bookings/**").authenticated()
                        .anyRequest().authenticated()
                )
                .addFilterBefore(new JwtAuthFilter(jwtUtil, userDetailsService), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        // Dung pattern de cho phep ca link preview cua Vercel, vd https://*.vercel.app
        config.setAllowedOriginPatterns(allowedOrigins.stream().map(String::trim).toList());
        config.setAllowedMethods(List.of("GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
