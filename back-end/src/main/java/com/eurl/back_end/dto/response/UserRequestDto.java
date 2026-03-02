package com.eurl.back_end.dto.response;

import java.util.Set;
import java.util.UUID;

public record UserRequestDto(UUID id,
                            String name,
                            Set<UrlRequestDto> urls
) {
}