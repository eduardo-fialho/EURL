package com.eurl.back_end.service;

import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.eurl.back_end.dto.request.RegisterUserRequestDto;
import com.eurl.back_end.model.UserModel;
import com.eurl.back_end.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class UserService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public UserModel createUser(RegisterUserRequestDto registerDto) {
        UserModel user = new UserModel();
        user.setActive(true);
        user.setName(registerDto.name());
        user.setEmail(registerDto.email());
        user.setPassword(passwordEncoder.encode(registerDto.password()));
        return userRepository.save(user);
    }

    @Transactional
    public UserModel findById(UUID id) {
        return userRepository.findById(id).get();
    }
}
