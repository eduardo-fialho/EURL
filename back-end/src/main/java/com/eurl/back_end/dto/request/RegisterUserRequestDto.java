package com.eurl.back_end.dto.request;

public record RegisterUserRequestDto(String name,
                                     String email,
                                     String password
) { 
}