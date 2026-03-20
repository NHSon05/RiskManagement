package net.javaguides.risk_management_web.controller;

import net.javaguides.risk_management_web.dto.LoginRequest;
import net.javaguides.risk_management_web.dto.LoginResponse; // Quan trọng
import net.javaguides.risk_management_web.dto.RegisterRequest;
import net.javaguides.risk_management_web.entity.User;
import net.javaguides.risk_management_web.service.AuthService;
import org.springframework.http.ResponseEntity; // Quan trọng
import org.springframework.web.bind.annotation.*;

import java.util.Map; // Quan trọng

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public User register(@RequestBody RegisterRequest req) {
        return authService.register(req);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest req) { // Sửa kiểu trả về thành LoginResponse
        return authService.login(req);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        return ResponseEntity.ok(Map.of("message", "Đăng xuất thành công!"));
    }
}