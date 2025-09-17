package com.skopjemarathon.controller;

import com.skopjemarathon.model.User;
import com.skopjemarathon.dto.LoginRequest;
import com.skopjemarathon.dto.LoginResponse;
import com.skopjemarathon.dto.RegisterRequest;
import com.skopjemarathon.service.AuthenticationService;
import com.skopjemarathon.service.JwtService;
import org.springframework.http.ResponseEntity;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final JwtService jwtService;

    public AuthenticationController(AuthenticationService authenticationService, JwtService jwtService) {
        this.authenticationService = authenticationService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@Valid @RequestBody RegisterRequest registerRequest) {
        User user = authenticationService.register(registerRequest);

        return ResponseEntity.ok(user);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        User user = authenticationService.login(loginRequest);
        String token = jwtService.generateToken(user);
        LoginResponse response = new LoginResponse(token, jwtService.getExpirationTime());
        return ResponseEntity.ok(response);
    }
}