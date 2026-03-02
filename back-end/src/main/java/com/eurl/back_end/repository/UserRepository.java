package com.eurl.back_end.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eurl.back_end.model.UserModel;
import java.util.Optional;


public interface UserRepository extends JpaRepository<UserModel, UUID> {
    public Optional<UserModel> findUserModelByEmail(String email);
}
