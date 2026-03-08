package com.eurl.back_end.service;

import java.util.HashSet;
import java.util.Random;
import java.util.Set;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.eurl.back_end.dto.request.UrlCreateRequestDto;
import com.eurl.back_end.dto.response.UrlResponseDto;
import com.eurl.back_end.model.UrlModel;
import com.eurl.back_end.repository.UrlRepository;

import jakarta.transaction.Transactional;

@Service
public class UrlService {
    
    private final Integer shortUrlLength = 5;
    private final UrlRepository urlRepository;
    private final UserService userService;

    public UrlService(UrlRepository urlRepository, UserService userService) {
        this.urlRepository = urlRepository;
        this.userService = userService;
    }

    @Transactional
    public UrlModel createUrl(UrlCreateRequestDto urlDto) {
        UrlModel url = new UrlModel();
        url.setUser(userService.findById(urlDto.userId()));
        url.setActive(true);
        url.setNumClicks(0l);
        String originalUrl = urlDto.originalUrl();
        if (!originalUrl.startsWith("http://") && !originalUrl.startsWith("https://")) originalUrl = "https://" + originalUrl; 
        url.setOriginalUrl(originalUrl);
        String shortUrlCode = generateShortUrlCode(shortUrlLength);
        url.setShortUrl("http://localhost:8080/" + shortUrlCode); //Definir domínio em .env
        url.setShortUrlCode(shortUrlCode);
        return urlRepository.save(url);
    }

    @Transactional
    public String findOriginalUrlAndIncrement(String shortUrlCode) {
        UrlModel url = urlRepository.findByShortUrlCode(shortUrlCode).get();
        url.setNumClicks(url.getNumClicks() + 1);
        return url.getOriginalUrl();
    }

    @Transactional
    public Set<UrlResponseDto> getAllUrlsByUserId(UUID id) {
        Set<UrlModel> urlsAllData = urlRepository.findAllByUserIdAndActiveTrue(id);
        Set<UrlResponseDto> urlsData = new HashSet<>();
        for(UrlModel e : urlsAllData) urlsData.add(new UrlResponseDto(e.getId(), e.getOriginalUrl(), e.getShortUrl(), e.getNumClicks()));
        return urlsData;
    }

    @Transactional
    public UrlResponseDto findUrlById(UUID id) {
        UrlModel url = urlRepository.findById(id).get();
        return new UrlResponseDto(url.getId(), url.getOriginalUrl(), url.getShortUrl(), url.getNumClicks());
    }

    @Transactional
    public void disableUrl(UUID id) {
        UrlModel url = urlRepository.findById(id).get();
        url.setActive(false);
    }

    private String generateShortUrlCode(int length) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        String shortUrlCode;
        Random random = new Random();
        do {
            StringBuilder stringBuilder = new StringBuilder();
            for(int i = 0; i < length; i++) {
                int index = random.nextInt(characters.length());
                stringBuilder.append(characters.charAt(index));
            }
            shortUrlCode = stringBuilder.toString();
        } while(urlRepository.existsByShortUrlCode(shortUrlCode));
        return shortUrlCode;
    }
}
