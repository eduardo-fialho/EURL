package com.eurl.back_end.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eurl.back_end.model.UrlModel;

import java.util.Optional;
import java.util.Set;


public interface UrlRepository extends JpaRepository<UrlModel, UUID> {
    public Boolean existsByShortUrlCode(String shortUrlCode);

    public Optional<UrlModel> findByShortUrlCode(String shortUrlCode);

    public Set<UrlModel> findAllByUserIdAndActiveTrue(UUID userId);
}
