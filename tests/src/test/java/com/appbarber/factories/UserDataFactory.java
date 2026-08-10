package com.appbarber.factories;

import com.appbarber.models.RegisterData;
import com.appbarber.models.auth.RegisterRequestDto;
import com.appbarber.models.auth.ResetPasswordRequestDto;
import net.datafaker.Faker;

import java.util.UUID;

/**
 * Fuente única de datos de usuario compartida entre pruebas API y UI.
 * Reemplaza la generación manual duplicada (Faker en API, UUID en UI).
 */
public class UserDataFactory {

    private static final Faker faker = new Faker();

    private UserDataFactory() {
    }

    public static RegisterData randomUser() {
        String password = randomPassword();
        return RegisterData.builder()
                .name(faker.name().firstName())
                .lastname(faker.name().lastName())
                .phone(faker.number().digits(8))
                .email(randomEmail())
                .password(password)
                .confirmationPassword(password)
                .build();
    }

    public static RegisterRequestDto randomRegisterRequest() {
        String password = randomPassword();
        return RegisterRequestDto.builder()
                .name(faker.name().firstName())
                .lastname(faker.name().lastName())
                .phone(faker.number().digits(8))
                .email(randomEmail())
                .password(password)
                .password_confirmation(password)
                .build();
    }

    public static ResetPasswordRequestDto newPasswordAndConfirmation() {
        String password = faker.credentials().password(8, 10, true, true);
        return ResetPasswordRequestDto.builder()
                .password(password)
                .passwordConfirmation(password)
                .build();
    }

    public static RegisterData registeredUser() {
        return RegisterData.builder()
                .name("TestNG")
                .lastname("TestNG")
                .phone("78445425")
                .email("testng@correo.com")
                .password("12345678")
                .confirmationPassword("12345678")
                .build();
    }

    private static String randomPassword() {
        return "Pass" + faker.number().digits(4) + "!";
    }

    private static String randomEmail() {
        return "test_" + UUID.randomUUID().toString().substring(0, 8) + "@correo.com";
    }
}
