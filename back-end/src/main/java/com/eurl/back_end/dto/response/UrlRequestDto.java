package com.eurl.back_end.dto.response;

import java.util.UUID;

public record UrlRequestDto(String originalUrl,
                            String shortUrl,
                            UUID id,
                            Long numClicks
) {
} 
