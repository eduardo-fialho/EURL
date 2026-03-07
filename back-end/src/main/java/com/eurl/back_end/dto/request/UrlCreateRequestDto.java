package com.eurl.back_end.dto.request;

import java.util.UUID;

public record UrlCreateRequestDto(UUID userId,
                                  String originalUrl) {
}
