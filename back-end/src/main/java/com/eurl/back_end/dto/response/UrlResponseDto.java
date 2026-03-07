package com.eurl.back_end.dto.response;

import java.util.UUID;

public record UrlResponseDto(UUID id,
                             String originalUrl,
                             String shortUrl,
                             Long numClicks
) {
} 
