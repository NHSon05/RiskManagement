package net.javaguides.risk_management_web.service;

import net.javaguides.risk_management_web.dto.LoginRequest;
import net.javaguides.risk_management_web.dto.LoginResponse;
import net.javaguides.risk_management_web.dto.RegisterRequest;
import net.javaguides.risk_management_web.dto.UserResponse;
import net.javaguides.risk_management_web.entity.User;
import net.javaguides.risk_management_web.repository.UserRepository;
import net.javaguides.risk_management_web.util.PasswordUtil;
import net.javaguides.risk_management_web.util.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil; // Thêm JwtUtil

    public AuthService(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    public User register(RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email đã được sử dụng!");
        }
        if (req.getPassword() == null || !req.getPassword().equals(req.getConfirmPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Mật khẩu xác nhận không khớp!");
        }

        User user = new User();
        user.setName(req.getName());
        user.setEmail(req.getEmail());
        user.setPhoneNumber(req.getPhoneNumber());
        user.setCompany(req.getCompany());
        user.setPassword(PasswordUtil.hash(req.getPassword()));
        user.setRole("USER");
        user.setActive(true);

        return userRepository.save(user);
    }

    // PHƯƠNG THỨC LOGIN MỚI - Đảm bảo chỉ có DUY NHẤT một hàm login này
    public LoginResponse login(LoginRequest req) {
        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tài khoản hoặc mật khẩu không đúng!"));

        if (!PasswordUtil.matches(req.getPassword(), user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tài khoản hoặc mật khẩu không đúng!");
        }

        String token = jwtUtil.generateToken(user.getEmail());
        return new LoginResponse("Đăng nhập thành công!", token, user.getId());
    }
    // PHƯƠNG THỨC RESPONSE THÔNG TIN USER
    public UserResponse getCurrentUserInfo(String email) {
        // Tìm user theo email (hoặc username) trích xuất được từ token
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy user"));
        // Map từ Entity sang DTO
        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setPhoneNumber(user.getPhoneNumber());
        response.setCompany(user.getCompany());
        response.setActive(user.isActive());

        return response;
    }
}