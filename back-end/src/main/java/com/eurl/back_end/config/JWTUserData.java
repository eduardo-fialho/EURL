package com.eurl.back_end.config;

import java.util.UUID;

public record JWTUserData(UUID userId,
                          String email
) {
}
