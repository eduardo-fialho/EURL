package com.eurl.back_end.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eurl.back_end.config.TokenConfig;
import com.eurl.back_end.dto.request.LoginRequestDto;
import com.eurl.back_end.dto.request.RegisterUserRequestDto;
import com.eurl.back_end.dto.response.LoginResponseDto;
import com.eurl.back_end.dto.response.RegisterUserResponseDto;
import com.eurl.back_end.model.UserModel;
import com.eurl.back_end.service.UserService;


@RestController
@RequestMapping("/auth")
public class AuthController {
    
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final TokenConfig tokenConfig;

    public AuthController(UserService userService, AuthenticationManager authenticationManager, TokenConfig tokenConfig) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.tokenConfig = tokenConfig;
    }
    
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto loginRequestDto) {
        UsernamePasswordAuthenticationToken userAndPass = new UsernamePasswordAuthenticationToken(loginRequestDto.email(), loginRequestDto.password());
        Authentication authentication = authenticationManager.authenticate(userAndPass);
        UserModel user = (UserModel) authentication.getPrincipal();
        String token = tokenConfig.generateToken(user);
        return ResponseEntity.ok(new LoginResponseDto(token));
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterUserResponseDto> register(@RequestBody RegisterUserRequestDto registerUserRequestDto) {
        UserModel newUser = userService.createUser(registerUserRequestDto); 
        return ResponseEntity.status(HttpStatus.CREATED).body(new RegisterUserResponseDto(newUser.getName(), newUser.getEmail()));
    }
    
}
