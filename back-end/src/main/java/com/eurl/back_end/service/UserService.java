package com.eurl.back_end.service;

import java.util.UUID;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.eurl.back_end.dto.UserRecordDto;
import com.eurl.back_end.model.UserModel;
import com.eurl.back_end.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class UserService {
    
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public UserModel createUser(UserRecordDto userRecordDto) {
        UserModel user = new UserModel();
        user.setActive(true);
        user.setName(userRecordDto.name());
        user.setPassword(passwordEncoder.encode(userRecordDto.password()));
        return userRepository.save(user);
    }

    @Transactional
    public UserModel getById(UUID id) {
        return userRepository.findById(id).get();
    }
}
