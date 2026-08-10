package com.appbarber.models.auth;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)

public class ResetPasswordRequestDto {
    private String password;
    @JsonProperty("password_confirmation")
    private String passwordConfirmation;
}
