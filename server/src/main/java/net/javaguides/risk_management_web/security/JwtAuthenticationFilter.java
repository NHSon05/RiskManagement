package net.javaguides.risk_management_web.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import net.javaguides.risk_management_web.util.JwtUtil;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    public JwtAuthenticationFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        // 1. get context from header Authorization
        final String authHeader = request.getHeader("Authorization");

        // 2. Check header contain Token?
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response); // Không có token thì cho đi tiếp (tới SecurityConfig xử lý)
            return;
        }
        // 3. Split token
        final String jwt = authHeader.substring(7);

        // 4. Validate token và set thông tin vào SecurityContext
        if (jwtUtil.validateToken(jwt)) {
            String email = jwtUtil.extractEmail(jwt);

            // Check SecurityContext has info?
            if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {

                // (Authentication Token)
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        email,
                        null,
                        new ArrayList<>()
                );

                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // Save card to SecurityContext (để báo với Spring là user login)
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        // Accept request continue to Controller
        filterChain.doFilter(request, response);
    }
}