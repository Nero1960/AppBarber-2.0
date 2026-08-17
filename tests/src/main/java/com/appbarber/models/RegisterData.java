package com.appbarber.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)

public class RegisterData {
    private String name;
    private String lastname;
    private String phone;
    private String email;
    private String password;
    private String confirmationPassword;
}
