package com.eurl.back_end.service;

import java.util.Random;

import org.springframework.stereotype.Service;

import com.eurl.back_end.dto.UrlRecordDto;
import com.eurl.back_end.model.UrlModel;
import com.eurl.back_end.repository.UrlRepository;

import jakarta.transaction.Transactional;

@Service
public class UrlService {
    
    private final Integer shortUrlLength = 5;
    private final UrlRepository urlRepository;

    public UrlService(UrlRepository urlRepository) {
        this.urlRepository = urlRepository;
    }

    @Transactional
    public UrlModel createUrl(UrlRecordDto urlRecordDto) {
        UrlModel url = new UrlModel();
        url.setActive(true);
        url.setNumClicks(0l);
        url.setOriginalUrl(urlRecordDto.originalUrl());
        String shortUrl = generateShortUrl(shortUrlLength);
        url.setShortUrl(shortUrl);
        return urlRepository.save(url);
    }

    public String generateShortUrl(int length) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        String shortUrl;
        do {
            Random random = new Random();
            StringBuilder stringBuilder = new StringBuilder();
            for(int i = 0; i < length; i++) {
                int index = random.nextInt(characters.length());
                stringBuilder.append(characters.charAt(index));
            }
            shortUrl = stringBuilder.toString();
        } while(urlRepository.existsByShortUrl(shortUrl));
        return shortUrl;
    }
}
