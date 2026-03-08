package com.eurl.back_end.controller;

import java.net.URI;
import java.util.Set;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eurl.back_end.dto.request.UrlCreateRequestDto;
import com.eurl.back_end.dto.response.UrlResponseDto;
import com.eurl.back_end.model.UrlModel;
import com.eurl.back_end.service.UrlService;



@RestController
@RequestMapping
public class UrlController {

    private final UrlService urlService;

    public UrlController(UrlService urlService) {
        this.urlService = urlService;
    }

    @GetMapping("/{url}")
    public ResponseEntity<Void> redirectToShortUrl(@PathVariable String url) {
        return ResponseEntity.status(HttpStatus.FOUND)
                .location(URI.create(urlService.findOriginalUrlAndIncrement(url)))
                .build();
    }

    @PostMapping("/url")
    public ResponseEntity<UrlResponseDto> createNewUrl(@RequestBody UrlCreateRequestDto urlCreateRequestDto) {
        UrlModel url = urlService.createUrl(urlCreateRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(new UrlResponseDto(url.getId(), url.getOriginalUrl(), url.getShortUrl(), url.getNumClicks()));
    }

    @GetMapping("/url/all/{userId}")
    public ResponseEntity<Set<UrlResponseDto>> getAllUrlsData(@PathVariable UUID userId) {
        return ResponseEntity.ok(urlService.getAllUrlsByUserId(userId));
    }

    @GetMapping("/url/{id}")
    public ResponseEntity<UrlResponseDto> getUrlData(@PathVariable UUID id) {
        return ResponseEntity.ok(urlService.findUrlById(id));
    }

    @DeleteMapping("/url/{id}")
    public ResponseEntity<String> deleteUrl(@PathVariable UUID id) {
        urlService.disableUrl(id);
        return ResponseEntity.ok("URL deletada com sucesso.");
    }
    
}
