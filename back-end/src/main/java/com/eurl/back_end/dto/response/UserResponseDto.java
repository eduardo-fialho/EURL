package com.eurl.back_end.dto.response;

import java.util.Set;
import java.util.UUID;

public record UserResponseDto(UUID id,
                            String name,
                            Set<UrlResponseDto> urls
) {
}