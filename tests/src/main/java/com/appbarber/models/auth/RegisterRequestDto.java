package com.appbarber.models.auth;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
@JsonInclude(JsonInclude.Include.NON_NULL)

public class RegisterRequestDto {
    private Integer id;
    private String name;
    private String lastname;
    private String email;
    private String phone;
    private String password;
    private String password_confirmation;
}
