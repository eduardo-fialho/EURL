package com.eurl.back_end.dto;

import java.util.Set;
import java.util.UUID;

public record UserRecordDto(UUID id,
                            String name,
                            String password,
                            Set<UrlRecordDto> urls
) {

}
