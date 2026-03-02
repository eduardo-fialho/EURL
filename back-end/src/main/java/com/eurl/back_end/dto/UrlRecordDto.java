package com.eurl.back_end.dto;

import java.util.UUID;

public record UrlRecordDto(UUID id,
                           String originalUrl,
                           String shortUrl,
                           Long numClicks
) {    
}
