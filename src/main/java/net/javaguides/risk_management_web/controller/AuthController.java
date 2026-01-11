package net.javaguides.risk_management_web.controller;

import net.javaguides.risk_management_web.dto.LoginRequest;
import net.javaguides.risk_management_web.dto.RegisterRequest;
import net.javaguides.risk_management_web.entity.User;
import net.javaguides.risk_management_web.service.AuthService;
import org.springframework.web.bind.annotation.*;

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
    public User login(@RequestBody LoginRequest req) {
        return authService.login(req);
    }
}

