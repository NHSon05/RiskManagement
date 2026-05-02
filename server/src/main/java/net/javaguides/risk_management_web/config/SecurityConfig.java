package net.javaguides.risk_management_web.config;

import net.javaguides.risk_management_web.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                // Tắt CSRF (Cross-Site Request Forgery) vì chúng ta dùng JWT (stateless)
                .csrf(AbstractHttpConfigurer::disable)

                // Authorization setup for endpoint
                .authorizeHttpRequests(auth -> auth
                        // Accept everyone access to API login và register without token
                        .requestMatchers("/auth/login", "/auth/register", "/error").permitAll()
                        // all another request (như /auth/me, /auth/logout...) have to have validated
                        // token
                        .anyRequest().authenticated())

                // Đặt Session Management by STATELESS (Spring Security won't save session on
                // server)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public org.springframework.web.cors.CorsConfigurationSource corsConfigurationSource() {
        org.springframework.web.cors.CorsConfiguration configuration = new org.springframework.web.cors.CorsConfiguration();

        // Thay localhost:5174 bằng port React/Vite thực tế của bạn nếu có thay đổi
        configuration.setAllowedOrigins(
                java.util.List.of("http://localhost:5173", "http://localhost:3000", "http://localhost:5174"));

        configuration.setAllowedMethods(java.util.Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(java.util.Arrays.asList("Authorization", "Content-Type"));
        configuration.setAllowCredentials(true); // Quan trọng nếu có gửi kèm token/cookie

        org.springframework.web.cors.UrlBasedCorsConfigurationSource source = new org.springframework.web.cors.UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
