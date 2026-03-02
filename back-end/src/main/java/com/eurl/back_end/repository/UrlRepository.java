package com.eurl.back_end.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eurl.back_end.model.UrlModel;

public interface UrlRepository extends JpaRepository<UrlModel, UUID> {
    public Boolean existsByShortUrl(String shortUrl);
}
