package net.javaguides.risk_management_web.service;

import net.javaguides.risk_management_web.dto.LoginRequest;
import net.javaguides.risk_management_web.dto.RegisterRequest;
import net.javaguides.risk_management_web.entity.User;
import net.javaguides.risk_management_web.repository.UserRepository;
import net.javaguides.risk_management_web.util.PasswordUtil;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User register(RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email đã được sử dụng!");
        }

        if (req.getPassword() == null || !req.getPassword().equals(req.getConfirmPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Mật khẩu xác nhận không khớp!");
        }

        // 3. Lưu User
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

    public User login(LoginRequest req) {
        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tài khoản hoặc mật khẩu không đúng!"));

        if (!PasswordUtil.matches(req.getPassword(), user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tài khoản hoặc mật khẩu không đúng!");
        }

        return user;
    }
}