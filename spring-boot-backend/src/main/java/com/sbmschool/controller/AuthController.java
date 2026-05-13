package com.sbmschool.controller;

import com.sbmschool.dto.LoginRequest;
import com.sbmschool.model.User;
import com.sbmschool.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        // Simple mock login for demonstration
        return userRepository.findByUsername(loginRequest.getUsername())
                .map(user -> {
                    Map<String, Object> response = new HashMap<>();
                    response.put("token", "mock-jwt-token-" + user.getUsername());
                    response.put("username", user.getUsername());
                    response.put("role", user.getRole());
                    return ResponseEntity.ok(response);
                })
                .orElse(ResponseEntity.status(401).body("Invalid credentials"));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        user.setRole("ROLE_STUDENT");
        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(savedUser);
    }
}
