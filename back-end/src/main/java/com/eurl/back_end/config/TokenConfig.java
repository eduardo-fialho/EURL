package com.eurl.back_end.config;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.eurl.back_end.model.UserModel;

@Component
public class TokenConfig {
    
    private final String secret; //Definir em variável de ambiente
    private final Algorithm algorithm; //Tentar definir em variável de ambiente

    public TokenConfig() {
        this.secret = "secret";
        this.algorithm = Algorithm.HMAC256(secret);
    }

    public String generateToken(UserModel user) {
        return JWT.create()
                .withClaim("userId", user.getId().toString())
                .withSubject(user.getEmail())
                .withExpiresAt(Instant.now().plusSeconds(600))
                .withIssuedAt(Instant.now())
                .sign(algorithm);
    }

    public Optional<JWTUserData> validateToken(String token) {
        try {
            DecodedJWT decode = JWT.require(algorithm).build().verify(token);
            return Optional.of(new JWTUserData(decode.getClaim("userId").as(UUID.class), decode.getSubject()));
        } catch(JWTVerificationException e) {
            return Optional.empty();
        }
    }
}
